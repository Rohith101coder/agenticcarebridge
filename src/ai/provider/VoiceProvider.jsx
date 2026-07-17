import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import VoiceRecognition from "../speech/SpeechRecognition";
import Planner from "../planner/Planner";
import PlanRouter from "../router/PlanRouter";
import WorkflowMemory from "../memory/WorkflowMemory";
import ResponseManager from "../response/ResponseManager";
import SkillManager from "../skills/SkillManager";

const VoiceContext = createContext(null);

export const VoiceProvider = ({ children }) => {
  const recognitionRef = useRef(null);
  const restartTimer = useRef(null);

  const navigate = useNavigate();

  const [voiceState, setVoiceState] = useState({
    agentMode: false,
    listening: false,
    transcript: "",
    aiResponse: null,
    currentAction: null,
    status: "idle", // idle | listening | processing
    error: null,
  });

  const restartListening = () => {
    clearTimeout(restartTimer.current);

    restartTimer.current = setTimeout(() => {
      setVoiceState((prev) => {
        if (!prev.agentMode) return prev;

        if (recognitionRef.current?.isCurrentlyListening()) {
          return prev;
        }

        recognitionRef.current?.startListening();

        return prev;
      });
    }, 1000);
  };

  const stopRestartTimer = () => {
    clearTimeout(restartTimer.current);
  };

  useEffect(() => {
    const recognition = new VoiceRecognition();

    recognitionRef.current = recognition;

    if (!recognition.isSupported()) {
      setVoiceState((prev) => ({
        ...prev,
        error: "Speech Recognition is not supported in this browser.",
      }));

      return;
    }

    ResponseManager.register((message) => {
      setVoiceState((prev) => ({
        ...prev,
        aiResponse: message,
      }));
    });

    recognition.setCallbacks({
      onStart: () => {
        stopRestartTimer();

        setVoiceState((prev) => ({
          ...prev,
          listening: true,
          status: "listening",
          error: null,
        }));
      },

      onResult: async (text) => {
        try {
          setVoiceState((prev) => ({
            ...prev,
            listening: false,
            transcript: text,
            status: "processing",
            currentAction: null,
            error: null,
          }));

          if (WorkflowMemory.isActive()) {
            await SkillManager.resume(text);

            setVoiceState((prev) => ({
              ...prev,
              status: prev.agentMode ? "listening" : "idle",
            }));

            restartListening();

            return;
          }

          const plan = await Planner.plan(text);

          console.log("PLAN", plan);

          await PlanRouter.execute(plan, navigate);

          setVoiceState((prev) => ({
            ...prev,
            aiResponse: plan,
            currentAction: plan.action,
          }));
          setVoiceState((prev) => ({
            ...prev,
            status: prev.agentMode ? "listening" : "idle",
          }));

          restartListening();
        } catch (error) {
          console.error(error);

          setVoiceState((prev) => ({
            ...prev,
            listening: false,
            status: "idle",
            error: error.message,
          }));

          restartListening();
        }
      },

      onEnd: () => {
        setVoiceState((prev) => ({
          ...prev,
          listening: false,
        }));

        setTimeout(() => {
          setVoiceState((prev) => {
            if (
              prev.agentMode &&
              prev.status !== "processing" &&
              !recognition.isCurrentlyListening()
            ) {
              recognition.startListening();
            }

            return prev;
          });
        }, 1200);
      },

      onError: (error) => {
        console.warn("Speech Error:", error);

        setVoiceState((prev) => ({
          ...prev,
          listening: false,
          error,
        }));

        if (error !== "not-allowed" && error !== "service-not-allowed") {
          restartListening();
        } else {
          setVoiceState((prev) => ({
            ...prev,
            agentMode: false,
            status: "idle",
          }));
        }
      },
    });

    return () => {
      stopRestartTimer();
      recognition.destroy();
    };
  }, [navigate]);

  const toggleAgentMode = () => {
    setVoiceState((prev) => {
      const enabled = !prev.agentMode;

      if (enabled) {
        stopRestartTimer();
        recognitionRef.current?.startListening();
      } else {
        stopRestartTimer();
        recognitionRef.current?.stopListening();
      }

      return {
        ...prev,
        agentMode: enabled,
        listening: enabled,
        transcript: enabled ? prev.transcript : "",
        status: enabled ? "listening" : "idle",
      };
    });
  };

  return (
    <VoiceContext.Provider
      value={{
        voiceState,
        toggleAgentMode,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => {
  const context = useContext(VoiceContext);

  if (!context) {
    throw new Error("useVoice must be used inside VoiceProvider");
  }

  return context;
};