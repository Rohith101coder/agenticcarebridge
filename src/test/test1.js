import VoiceRecognition from "./ai/speech/SpeechRecognition";

const voice = new VoiceRecognition();

voice.setCallbacks({
  onStart() {
    console.log("Listening...");
  },

  onResult(text) {
    console.log(text);
  },

  onEnd() {
    console.log("Finished");
  },

  onError(err) {
    console.log(err);
  },
});

voice.startListening();
