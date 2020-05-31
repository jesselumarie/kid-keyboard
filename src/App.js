import React, { useEffect, useState } from "react";
import { throttle } from "lodash";
import "./App.css";

function setSpeech() {
  return new Promise(function(resolve, reject) {
    let synth = window.speechSynthesis;
    let id;

    id = setInterval(() => {
      if (synth.getVoices().length !== 0) {
        resolve(synth.getVoices());
        clearInterval(id);
      }
    }, 10);
  });
}

function handleKeyDown(evt, setLetter) {
  const letter = String.fromCharCode(evt.keyCode || evt.charCode);
  setLetter(letter);
  let utterance = new SpeechSynthesisUtterance(letter);
  return setSpeech().then(voices => {
    utterance.voice = getVoice(voices);
    window.speechSynthesis.speak(utterance);
    return evt;
  });
}

function getVoice(voices) {
  let filteredVoices = voices.filter((v) => v.lang==='en-US')
  return filteredVoices[Date.now() % filteredVoices.length];
}

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

function getColor() {
  return colors[Date.now() % colors.length];
}

function App() {
  const [currentLetter, setLetter] = useState(null);

  useEffect(() => {
    window.addEventListener(
      "keydown",
      throttle(evt => handleKeyDown(evt, setLetter), 500)
    );
  }, []);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div>Type a letter!</div>
        {currentLetter && (
          <div
            style={{
              fontSize: 600,
              textShadow: `10px 10px 15px ${getColor()}`
            }}
          >
            {currentLetter}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
