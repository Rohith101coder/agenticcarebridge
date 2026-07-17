import { RiSparkling2Fill } from "react-icons/ri";
import { useVoice } from "../../ai/provider/VoiceProvider";

const VoiceButton = () => {
  const { voiceState, toggleAgentMode } = useVoice();

  const getColor = () => {
    if (!voiceState.agentMode) return "#6c757d"; // OFF

    if (voiceState.status === "processing") return "#0d6efd"; // Thinking

    if (voiceState.status === "listening") return "#198754"; // Listening

    return "#198754";
  };

  const getStatusText = () => {
    if (!voiceState.agentMode) return "";

    switch (voiceState.status) {
      case "listening":
        return "🎙 Listening...";

      case "processing":
        return "🧠 Thinking...";

      default:
        return "✨ Agent Ready";
    }
  };

  return (
    <>
      {voiceState.agentMode && (
        <div
          style={{
            position: "fixed",
            bottom: "175px",
            right: "25px",
            background: "rgba(20,20,20,.92)",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "14px",
            fontSize: "14px",
            fontWeight: 500,
            boxShadow: "0 8px 25px rgba(0,0,0,.25)",
            zIndex: 10000,
            animation: "fadeIn .25s ease",
          }}
        >
          {getStatusText()}
        </div>
      )}

      <button
        onDoubleClick={toggleAgentMode}
        title={
          voiceState.agentMode
            ? "Double Click to Stop Agent"
            : "Double Click to Start Agent"
        }
        style={{
          position: "fixed",
          bottom: "100px",
          right: "25px",
          width: "65px",
          height: "65px",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",

          background: getColor(),

          color: "white",

          fontSize: "28px",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          boxShadow: voiceState.agentMode
            ? "0 0 18px rgba(25,135,84,.6)"
            : "0 8px 25px rgba(0,0,0,.2)",

          transition: "all .3s ease",

          zIndex: 9999,
        }}
      >
        <RiSparkling2Fill />
      </button>
    </>
  );
};

export default VoiceButton;
