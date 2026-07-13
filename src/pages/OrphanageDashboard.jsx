import React, { useState, useEffect } from "react";
import OrphanageSidebar from "../components/OrphanageSidebar";
import OrphanageHeader from "../components/OrphanageHeader";
import OrphanageStats from "../components/OrphanageStats";
import ActiveNeeds from "../components/ActiveNeeds";
import UpcomingVisits from "../components/UpcomingVisits";
import RecentDonations from "../components/RecentDonations";
import RecentActivity from "../components/RecentActivity";
import Messages from "../components/Messages";
import Footer from "../components/Footer";
import { loadOrphanageDashboard } from "../apis/orphanageApis";

const OrphanageDashboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [showSidebar, setShowSidebar] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await loadOrphanageDashboard();
      setDashboardData(response);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message;

      setProfileError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setShowSidebar(!showSidebar);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }

  return (
    <div
      className="d-flex min-h-screen bg-light position-relative"
      style={{ overflowX: "hidden", width: "100%", maxWidth: "100%" }}
    >
      {/* Permanent Sidebar on Desktop / Conditional Overlay on Mobile */}
      {(!isMobile || showSidebar) && (
        <div
          className="position-fixed top-0 start-0 z-3 bg-white shadow-sm"
          style={{ height: "100vh", width: "250px" }}
        >
          <OrphanageSidebar />
        </div>
      )}

      {/* Backdrop for mobile overlay when sidebar is toggled open */}
      {isMobile && showSidebar && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 z-2"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Main Content: Adaptive margin-left based on screen dimensions */}
      <div
        className="pb-5 w-100"
        style={{
          marginLeft: isMobile ? "0px" : "250px",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        <div className="container px-3 px-md-4 pt-3">
          <OrphanageHeader
            isMobile={isMobile}
            toggleSidebar={toggleSidebar}
            showSidebar={showSidebar}
            accountStatus={profileError}
            overview={dashboardData?.overview}
          />

          <div className="mb-4">
            <h2 className="fw-bold fs-3 mb-1">
              Welcome back,{" "}
              {dashboardData?.overview?.orphanageName || "Orphanage"}!
            </h2>
            <p className="text-muted small">Manage your needs and donations.</p>
          </div>

          <OrphanageStats overview={dashboardData?.overview} />

          {/* Row 1 */}
          <div className="row g-3 g-lg-4 mb-4">
            <div className="col-12 col-lg-4">
              <ActiveNeeds needs={dashboardData?.activeNeeds || []} />
            </div>

            <div className="col-12 col-lg-4">
              <UpcomingVisits visits={dashboardData?.upcomingVisits || []} />
            </div>

            <div className="col-12 col-lg-4">
              <RecentDonations
                donations={dashboardData?.recentDonations || []}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="row g-3 g-lg-4">
            <div className="col-12 col-lg-8">
              <RecentActivity
                recentActivities={dashboardData?.recentActivities || []}
              />
            </div>

            <div className="col-12 col-lg-4">
              <Messages messages={dashboardData?.messages || []} />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default OrphanageDashboard;
