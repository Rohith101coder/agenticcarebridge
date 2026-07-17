class VoiceRecognition {
  constructor() {
    this.recognition = null;
    this.isListening = false;

    this.onStart = null;
    this.onResult = null;
    this.onEnd = null;
    this.onError = null;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    this.recognition = new SpeechRecognition();

    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = "en-IN";

    this.recognition.onstart = () => {
      this.isListening = true;

      this.onStart?.();
    };

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();

      this.onResult?.(transcript);
    };

    this.recognition.onerror = (event) => {
      console.warn("SpeechRecognition Error:", event.error);

      this.isListening = false;

      this.onError?.(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;

      this.onEnd?.();
    };
  }

  isSupported() {
    return !!this.recognition;
  }

  isCurrentlyListening() {
    return this.isListening;
  }

  startListening() {
    if (!this.recognition) return;

    if (this.isListening) return;

    try {
      this.recognition.start();
    } catch (err) {
      console.warn("Recognition start ignored:", err);
    }
  }

  stopListening() {
    if (!this.recognition) return;

    if (!this.isListening) return;

    try {
      this.recognition.stop();
    } catch (err) {
      console.warn("Recognition stop ignored:", err);
    }
  }

  destroy() {
    if (!this.recognition) return;

    try {
      this.stopListening();
    } catch {}

    this.recognition.onstart = null;
    this.recognition.onresult = null;
    this.recognition.onerror = null;
    this.recognition.onend = null;
  }

  setCallbacks({ onStart, onResult, onEnd, onError }) {
    this.onStart = onStart;
    this.onResult = onResult;
    this.onEnd = onEnd;
    this.onError = onError;
  }
}

export default VoiceRecognition;
