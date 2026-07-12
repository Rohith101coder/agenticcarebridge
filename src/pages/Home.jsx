// 1. Home.jsx (No structural changes needed, but ensuring layout parents are responsive)
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
    </>
  );
};

export default Home;
