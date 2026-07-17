import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatBot from "./components/chatbot/CareBot"
import VoiceButton from "./components/voice/VoiceButton";
import { VoiceProvider } from "./ai/provider/VoiceProvider";
import VoicePopup from "./components/voice/VoicePopup";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <>
    <BrowserRouter>
     <VoiceProvider>
        <AppRoutes />
        <ChatBot />
        <VoiceButton />
        {/* <VoicePopup /> */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </VoiceProvider>
    
    </BrowserRouter>
     
    </>
  );
};

export default App;