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
import {loadOrphanageDashboard} from "../apis/orphanageApis";

const OrphanageDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
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
      const mobile = window.innerWidth < 768;

      setIsMobile(mobile);

      if (mobile) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
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
        style={{
          height: "100vh",
        }}
      >
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }

  // if (profileError === "Orphanage profile not found") {
  //   return (
  //     <div
  //       className="d-flex justify-content-center align-items-center"
  //       style={{
  //         height: "100vh",
  //       }}
  //     >
  //       <div className="alert alert-warning">
  //         Please complete your orphanage profile to access dashboard features.
  //       </div>
  //     </div>
  //   );
  // }

  // if (profileError === "Your orphanage profile is not verified yet.") {
  //   return (
  //     <div
  //       className="d-flex justify-content-center align-items-center"
  //       style={{
  //         height: "100vh",
  //       }}
  //     >
  //       <div className="alert alert-info">
  //         Your profile verification is pending. Dashboard access will be
  //         available after approval.
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="d-flex position-relative">
        {/* Sidebar */}
        {showSidebar && (
          <div
            className={`${isMobile ? "position-fixed" : ""} bg-white`}
            style={{
              width: "250px",
              height: "100vh",
              top: 0,
              left: 0,
              zIndex: 1050,
            }}
          >
            <OrphanageSidebar />
          </div>
        )}

        {/* Mobile Overlay */}
        {isMobile && showSidebar && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{
              backgroundColor: "rgba(0,0,0,0.4)",
              zIndex: 1040,
            }}
            onClick={toggleSidebar}
          />
        )}

        {/* Main Content */}
        <div className="flex-grow-1 p-4 bg-light">
          <OrphanageHeader
            isMobile={isMobile}
            toggleSidebar={toggleSidebar}
            showSidebar={showSidebar}
            accountStatus = {profileError}
            overview={dashboardData?.overview}
          />

          <h2 className="fw-bold">
            Welcome back,
            {dashboardData?.overview?.orphanageName}!
          </h2>

          <p className="text-muted">Manage your needs and donations.</p>

          <OrphanageStats overview={dashboardData?.overview} />

          {/* Row 1 */}
          <div className="row g-4 mb-4">
            <div className="col-lg-4">
              <ActiveNeeds needs={dashboardData?.activeNeeds || []} />
            </div>

            <div className="col-lg-4">
              <UpcomingVisits visits={dashboardData?.upcomingVisits || []} />
            </div>

            <div className="col-lg-4">
              <RecentDonations donations={dashboardData?.recentDonations || []} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="row g-4">
            <div className="col-lg-8">
              <RecentActivity recentActivities={dashboardData?.recentActivities || []} />
            </div>

            <div className="col-lg-4">
              <Messages messages={dashboardData?.messages || []} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrphanageDashboard;