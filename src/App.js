import { useEffect, useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./App.css";
import Wave from "./Wave";
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import {handler, proceesor, sendResponse} from './process'


function App() {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  const [response, setResponse] = useState("")

  // stop listening after 5 seconds of silence
  useEffect(() => {
    if (isListening) {
      const timeout = setTimeout(() => {
        stopHandle();
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isListening]);

  useEffect(()=>{
    if(transcript){
      proceesor(transcript)
    }
  },[transcript])


  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);
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
    if(res){
      setResponse(res);
    }
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };

  const handleClick = ()=>{
    if(isListening){
      stopHandle()
    }else{
      handleListing()
    }
  }
  return (
    <>
    <div className="header">
    <h4>SUMA</h4>
    <p>A Personal Voice Assistant</p>
    </div>
    <div className="microphone-wrapper">
      <div className="mircophone-container">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={handleClick}
        >
          {isListening ?   <Wave sx={{width:"50px"}} /> :  <SettingsVoiceIcon />}
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