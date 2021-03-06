import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./App.css";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import { handler, proceesor } from "./utils/process";
import Speech from "speak-tts";
import Wave from "./components/Wave";
// import { speak } from "./utils/Speak";

function App() {
  const [isListening, setIsListening] = React.useState(false);
  const microphoneRef = React.useRef(null);
  const [response, setResponse] = React.useState("");
  const [all_voices, set_voices] = React.useState([]);
  const [activeVoice, setActiveVoice] = React.useState("Google US English");
  const {
    transcript,
    resetTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  /**
   * @dev const speech = new Speech();
   * will throw an exception if not browser supported
   */
  const speech = new Speech();
  if (!speech.hasBrowserSupport()) alert("Speech Synthesis not Supported!");

  React.useEffect(() => {
    if (isListening) {
      const timeout = setTimeout(() => {
        // stop listening after 5 seconds of silence
        stopHandle();
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isListening]);

  React.useEffect(() => {
    transcript && proceesor(transcript);
  }, [transcript]);

  const speak = async(text) => {
    await speech.setVoice(activeVoice);
    await speech.speak({
      text: text,
      queue: false,
      listeners: {
        onstart: () => {
          console.log("started");
        },
      },
    });
  }

  React.useEffect(() => {
    response &&
      speak(response)
        .then(() => {
          resetTranscript();
          setResponse("");
        })
        .catch((error) => console.error(error));
  }, [response]);

  React.useEffect(() => {
    (async () => {
      try {
        await speech.init({
          volume: 1,
          lang: "en-US",
          rate: 1,
          pitch: 1,
          splitSentences: true,
          listeners: {
            onvoiceschanged: (voices) => {
              console.log("voices changed", voices);
              var _voices = [];
              for (let voiceIndex in voices)
                _voices.push(voices[voiceIndex].voiceURI);
              // console.log(voices);
              set_voices(_voices);
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // effect to set active voice


  const handleListing = () => {
    setIsListening(true);
    // stop speaking
    speech.cancel();
    setResponse("");
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: false,
    });
  };

  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
    handler().then((res) => {
      console.log(res);
      if (res) {
        // alert(res)
        setResponse(res);
      }
    }).catch((err) => {
      console.log("Error in response",err);
    });
   
  };

  const handleReset = () => {
    stopHandle();
    resetTranscript();
    setResponse("");
  };

  const handleClick = () => {
    if (isListening) {
      stopHandle();
    } else {
      handleListing();
    }
  };

  if (!isMicrophoneAvailable)
    return (
      <div className="mircophone-container">
        User denied the support for Speech Recognition.
      </div>
    );

  if (!browserSupportsSpeechRecognition)
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  else
    return (
      <>
        <div className="header">
          <h4>SUMA</h4>
          <p>A Personal Voice Assistant</p>
          {all_voices && (
            <>
              <select
                onChange={(e) => {
                  setActiveVoice(e.target.value);
                }}
              >
                {all_voices.map((v, k) => (
                  <option key={k} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
        <div className="microphone-wrapper">
          <div className="mircophone-container">
            <div
              className="microphone-icon-container"
              ref={microphoneRef}
              onClick={handleClick}
            >
              {isListening ? (
                <Wave sx={{ width: "50px" }} />
              ) : (
                <SettingsVoiceIcon />
              )}
            </div>
          </div>
          {transcript && (
            <div className="microphone-result-container">
              <div className="microphone-result-text">
                <p className="query">{transcript}</p>
                <p className="response">{response}</p>
              </div>
              <button
                className="microphone-reset btn"
                onClick={() => handleReset}
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </>
    );
}
export default App;
