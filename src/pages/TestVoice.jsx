import React from "react";
import VoiceRecognition from "../ai/speech/SpeechRecognition";

const voice = new VoiceRecognition();

const TestVoice = () => {
  const start = () => {
    voice.setCallbacks({
      onStart() {
        console.log("🎤 Listening...");
      },

      onResult(text) {
        console.log("✅ Transcript:", text);
      },

      onEnd() {
        console.log("🛑 Listening stopped");
      },

      onError(error) {
        console.log("❌ Error:", error);
      },
    });

    voice.startListening();
  };

  return (
    <div style={{ padding: 40 }}>
      <button onClick={start}>Start Voice</button>
    </div>
  );
};

export default TestVoice;
