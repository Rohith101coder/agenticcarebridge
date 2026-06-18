import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import HowItWorks from "../components/HowItWorks";
import ActionCards from "../components/ActionCards";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <ActionCards />
      <Footer />

      {/* <button
        className="btn btn-success position-fixed"
        style={{
          left: "20px",
          bottom: "20px",
          zIndex: 999,
        }}
        onClick={() => navigate("/donor")}
      >
        Donor Portal
      </button>
      <button
        className="btn btn-success position-fixed"
        style={{
          left: "20px",
          bottom: "80px",
          zIndex: 999,
        }}
        onClick={() => navigate("/orphanage")}
      >
        Orphanage Portal
      </button> */}
    </>
  );
};

export default Home;
