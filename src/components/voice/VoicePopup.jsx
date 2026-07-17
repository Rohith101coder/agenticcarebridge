import { useVoice } from "../../ai/provider/VoiceProvider";

const VoicePopup = () => {
  const { voiceState } = useVoice();

  return (
    <div
      style={{
        position: "fixed",
        bottom: "180px",
        right: "20px",
        width: "340px",
        background: "#fff",
        borderRadius: "14px",
        padding: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        zIndex: 9999,
        border: "1px solid #ddd",
      }}
    >
      <h5 style={{ marginBottom: 15 }}>🎤 CareBridge AI</h5>

      <div style={{ marginBottom: 15 }}>
        <strong>Status</strong>

        <p>{voiceState.status}</p>
      </div>

      <div style={{ marginBottom: 15 }}>
        <strong>Transcript</strong>

        <p>{voiceState.transcript || "Waiting..."}</p>
      </div>

      <div style={{ marginBottom: 15 }}>
        <strong>AI Response</strong>

        <pre style={{ whiteSpace: "pre-wrap" }}>
          {voiceState.aiResponse
            ? JSON.stringify(voiceState.aiResponse, null, 2)
            : "Waiting..."}
        </pre>
      </div>

      <div>
        <strong>Current Action</strong>

        <p>{voiceState.currentAction || "Waiting..."}</p>
      </div>
    </div>
  );
};

export default VoicePopup;
