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

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logout" element={<Home />} />
        <Route path="/donor" element={<DonorLanding />} />
        <Route path="/orphanage" element={<OrphanageLanding />} />
        <Route path="/donor/dashboard" element={<DonorDashboard />} />
        <Route path="/donor/profile" element={<DonorProfile />} />
        <Route path="/donor/create-profile" element={<CreateDonorProfile />} />
        <Route path="/orphanage/dashboard" element={<OrphanageDashboard />} />
        {/* <Route
          path="/orphanage/feature/:feature"
          element={<OrphanageFeaturePage />}
        /> */}
        <Route
          path="/orphanage/create-profile"
          element={<OrphanageCreateProfile />}
        />
        <Route path="/orphanage/verify-otp" element={<OrphanageVerifyOtp />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/needs" element={<Needs />} />
        <Route path="/need/:id" element={<NeedDetails />} />
        <Route path="/orphanages" element={<Orphanages />} />
        <Route path="/orphanage/:id" element={<OrphanageDetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyForgotEmail />} />
        <Route path="/orphanage/profile" element={<OrphanageProfilePage />} />
        <Route path="/orphanage/update-profile" element={<UpdateOrphanageProfile/>} />
        <Route path = "/orphanage/need-items" element = {<OrphanageNeedItemPage/>}/>
        <Route path = "/orphanage/donations" element = {<OrphanageDonationPage/>}/>
        <Route path = "/orphanage/slots" element = {<OrphanageSlotsPage/>}/>
        <Route path="/orphanage/childrens" element={<OrphanageChildrenPage/>}/>
        <Route path="/orphanage/messages" element={<OrphanageMessagePage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
