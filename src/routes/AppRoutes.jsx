import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import DonorLanding from "../pages/DonorLanding";
import OrphanageLanding from "../pages/OrphanageLanding";
import DonorDashboard from "../pages/DonorDashboard";
import OrphanageDashboard from "../pages/OrphanageDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import DonorProfile from "../pages/DonorProfile";
import Register from "../pages/Register";
import VerifyEmail from "../pages/VerifyEmail";
import Needs from "../pages/Needs";
import Orphanages from "../pages/Orphanages";
import NeedDetails from "../pages/NeedDetails";
import OrphanageDetailPage from "../pages/OrphanageDetailPage";
import OrphanageFeaturePage from "../pages/OrphanageFeaturePage";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import VerifyForgotEmail from "../pages/VerifyForgotEmail";
import CreateDonorProfile from "../pages/CreateDonorProfile";
import OrphanageCreateProfile from "../pages/OrphanageCreateProfile";
import OrphanageVerifyOtp from "../pages/OrphanageVerifyOtp";
import OrphanageProfilePage from "../pages/OrphanageProfilePage";
import UpdateOrphanageProfile from "../pages/UpdateOrphanageProfile";
import OrphanageNeedItemPage from "../pages/OrphanageNeedItemPage";
import OrphanageDonationPage from "../pages/OrphanageDonationPage";
import OrphanageSlotsPage from "../pages/OrphanageSlotsPage";
import OrphanageChildrenPage from "../pages/OrphanageChildrenPage";
import OrphanageMessagePage from "../pages/OrphanageMessagePage";
import AboutUsPage from "../pages/AboutUs";
import HowItWorks from "../components/HowItWorks";
import HowItWorksPage from "../pages/HowItWorksPage";
import ContactPage from "../pages/ContactPage";
import ExploreNeeds from "../pages/ExploreNeeds";
import SingleNeedPage from "../pages/SingleNeedPage";
import UpdateDonorProfile from "../pages/UpdateDonorProfile";
import DonorDonationsPage from "../pages/DonorDonationsPage";
import DonorSlotPage from "../pages/DonorSlotPage";
import MyVisitsPage from "../pages/MyVisitsPage";
import DonorNotifications from "../pages/DonorNotifications";
import DonorMessages from "../pages/DonorMessages";
import GlobalSlotsPage from "../pages/GlobalSlotsPage";
import TestVoice from "../pages/TestVoice";

const AppRoutes = () => {
  return (
   
      <Routes>
        {/*donor routes */}
        <Route path="/donor/dashboard" element={<DonorDashboard />} />
        <Route path="/donor/create-profile" element={<CreateDonorProfile />} />
        <Route path="/donor/profile" element={<DonorProfile />} />
        <Route path="/donor/visits" element={<MyVisitsPage />} />
        <Route path="/donor/notifications" element={<DonorNotifications />} />
        <Route path="/donor" element={<DonorLanding />} />
        <Route path="/donor/messages" element={<DonorMessages />} />
        <Route path="/donor/bookings" element={<DonorSlotPage />} />
        <Route path="/donor/donations" element={<DonorDonationsPage />} />
        <Route path="/donor/update-profile" element={<UpdateDonorProfile />} />
        <Route path="/donor/explore-needs" element={<ExploreNeeds />} />

        {/*orp routes */}
        <Route path="/orphanage" element={<OrphanageLanding />} />
        <Route path="/orphanage/verify-otp" element={<OrphanageVerifyOtp />} />
        <Route path="/orphanages" element={<Orphanages />} />
        <Route path="/orphanage/:id" element={<OrphanageDetailPage />} />
        <Route path="/orphanage/dashboard" element={<OrphanageDashboard />} />
        <Route path="/orphanage/profile" element={<OrphanageProfilePage />} />
        <Route path="/orphanage/slots" element={<OrphanageSlotsPage />} />
        <Route path="/orphanage/messages" element={<OrphanageMessagePage />} />
        <Route
          path="/orphanage/childrens"
          element={<OrphanageChildrenPage />}
        />
        <Route
          path="/orphanage/donations"
          element={<OrphanageDonationPage />}
        />
        <Route
          path="/orphanage/need-items"
          element={<OrphanageNeedItemPage />}
        />
        <Route
          path="/orphanage/update-profile"
          element={<UpdateOrphanageProfile />}
        />
        <Route
          path="/orphanage/create-profile"
          element={<OrphanageCreateProfile />}
        />

        {/*other routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/needs" element={<Needs />} />
        <Route path="/need/:id" element={<NeedDetails />} />
        <Route path="/howitworks" element={<HowItWorksPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/needs/:id" element={<SingleNeedPage />} />
        <Route path="/allslots" element={<GlobalSlotsPage />} />

        {/*auth routes */}
        <Route path="/logout" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyForgotEmail />} />

        {/*ai related routes */}
        <Route path="/test-voice" element={<TestVoice />} />
      </Routes>
   
  );
};

export default AppRoutes;
