import { useEffect, useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./App.css";
import Wave from "./Wave";
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { handler, proceesor, sendResponse } from './process';
import Speech from 'speak-tts'


function App() {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  const [response, setResponse] = useState("")
  const [all_voices, set_voices] = useState([])
  const [activeVoice, setActiveVoice] = useState("")

  const speech = new Speech() // will throw an exception if not browser supported
  if (speech.hasBrowserSupport()) { // returns a boolean
    console.log("speech synthesis supported")
  }
  else {
    alert("speech synthesis not supported")
  }
  const speak = async () => {
    await speech.speak({
      text: response,
      queue: false,
      listeners: {
        onstart: () => {
          console.log("started")
        }
      }
    }).then(() => {
      console.log("success")
    }).catch(e => {
      console.error("error", e)
    }).finally(() => {
      console.log("finally")
    })
  }


  // stop listening after 5 seconds of silence
  useEffect(() => {
    if (isListening) {
      const timeout = setTimeout(() => {
        stopHandle();
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isListening]);

  useEffect(() => {
    if (transcript) {
      proceesor(transcript)
    }
  }, [transcript])

  useEffect(() => {
    if (response) {
      speak().then(() => {
        resetTranscript()
      })
    }
  }, [response])



  useEffect(() => {
    (async () => {
      try {
        await speech.init({
          'volume': 1,
          'lang': 'en-US',
          'rate': 1,
          'pitch': 1,
          'voice': activeVoice,
          'splitSentences': true,
          'listeners': {
            'onvoiceschanged': (voices) => {
              console.log("voices changed", voices)
              var _voices = []
              for(let voiceIndex in voices)
                _voices.push(voices[voiceIndex].voiceURI)
              // console.log(voices);
              set_voices(_voices)
            }
          }
        })
      } catch (error) {
        console.error(error)
      }
    })()
  }, [activeVoice])


  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);
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
    handler();
    const res = sendResponse();
    if (res) {
      // alert(res)
      setResponse(res);
    }
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
    setResponse("")
  };

  const handleClick = () => {
    if (isListening) {
      stopHandle()
    } else {
      handleListing()
    }
  }
  return (
    <>
      {/* {console.log(all_voices)} */}
      <div className="header">
        <h4>SUMA</h4>
        <p>A Personal Voice Assistant</p>
        {all_voices && <>
          <select onChange={e=>setActiveVoice(e.target.value)}>
            {all_voices.map((v,k)=><option key={k} value={v}>{v}</option>)}
          </select>
        </>}
      </div>
      <div className="microphone-wrapper">
        <div className="mircophone-container">
          <div
            className="microphone-icon-container"
            ref={microphoneRef}
            onClick={handleClick}
          >
            {isListening ? <Wave sx={{ width: "50px" }} /> : <SettingsVoiceIcon />}
          </div>
        </div>
        {transcript && (
          <div className="microphone-result-container">
            <div className="microphone-result-text">

              <p className="query">{transcript}</p>
              <p className="response">{response}</p>

            </div>
            <button className="microphone-reset btn" onClick={() => handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </>
  );
}
export default App;