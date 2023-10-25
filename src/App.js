import React, { useEffect, useState } from "react";
import { VoiceSelector } from "./VoiceSelector";
import "./App.css";

const VOWELS = ["A", "E", "I", "O", "U"];

const letterMap = {
  A: {
    letter: "A",
    sound: "ah",
    emoji: "🍎",
    word: "apple",
  },
  B: {
    letter: "B",
    sound: "buh",
    emoji: "🏏",
    word: "bat",
  },
  C: {
    letter: "C",
    sound: "cuh",
    emoji: "🐱",
    word: "cat",
  },
  D: {
    letter: "D",
    sound: "duh",
    emoji: "🐶",
    word: "dog",
  },
  E: {
    letter: "E",
    sound: "eh",
    emoji: "🚶‍♂️",
    word: "Ed",
  },
  F: {
    letter: "F",
    sound: "fff",
    emoji: "🤾‍♀️",
    word: "fun",
  },
  G: {
    letter: "G",
    sound: "guh",
    emoji: "♟️",
    word: "game",
  },
  H: {
    letter: "H",
    sound: "ha",
    emoji: "🎩",
    word: "hat",
  },
  I: {
    letter: "I",
    sound: "it",
    emoji: "🐒",
    word: "itchy",
  },
  J: {
    letter: "J",
    sound: "juh",
    emoji: "🏺",
    word: "jug",
  },
  K: {
    letter: "K",
    sound: "kuh",
    emoji: "🪁",
    word: "kite",
  },
  L: {
    letter: "L",
    sound: "luh",
    emoji: "🪔",
    word: "lamp",
  },
  LL: {
    letter: "L",
    sound: "luh",
    emoji: "🦙",
    word: "llahma",
  },
  M: {
    letter: "M",
    sound: "mm",
    emoji: "👨‍🦰",
    word: "man",
  },
  N: {
    letter: "N",
    sound: "nuh",
    emoji: "🥜",
    word: "nut",
  },
  O: {
    letter: "O",
    sound: "ah",
    emoji: "🐙",
    word: "octopus",
  },
  P: {
    letter: "P",
    sound: "puh",
    emoji: "🍳",
    word: "pan",
  },
  Q: {
    letter: "Q",
    sound: "quh",
    emoji: "👸",
    word: "queen",
  },
  R: {
    letter: "R",
    sound: "err",
    emoji: "🐀",
    word: "rat",
  },
  S: {
    letter: "S",
    sound: "sss",
    emoji: "🐍",
    word: "snake",
  },
  T: {
    letter: "T",
    sound: "tuh",
    emoji: "🔝",
    word: "tahpp",
  },
  U: {
    letter: "U",
    sound: "uh",
    emoji: "⬆️",
    word: "up",
  },
  V: {
    letter: "V",
    sound: "vuh",
    emoji: "🚐",
    word: "van",
  },
  W: {
    letter: "W",
    sound: "wuh",
    emoji: "💨  ",
    word: "wind",
  },
  X: {
    letter: "X",
    sound: "fuh",
    emoji: "",
    word: "fox",
  },
  Y: {
    letter: "Y",
    sound: "yuh",
    emoji: "🟨",
    word: "yellow",
  },
  Z: {
    letter: "Z",
    sound: "zuh",
    emoji: "🦓",
    word: "zebra",
  },
};

function handleKeyDown(letterInfo, setPressedKeys, voice) {
  try {
    let recordingFile = require("./recordings/" + letterInfo.letter + ".mp3");
    const audio = new Audio(recordingFile);
    audio.onended = () => {
      setPressedKeys("");
    };
    audio.play();
    return;
  } catch (e) {}

  const phrase = `${letterInfo.letter}, ${letterInfo?.word}, ${letterInfo?.sound}`;
  const utterance = new SpeechSynthesisUtterance(phrase);
  // speak using the voice
  utterance.voice = voice;

  utterance.rate = 1;
  utterance.onend = () => {
    setPressedKeys("");
  };
  window.speechSynthesis.speak(utterance);
}

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

function getColor() {
  return colors[Date.now() % colors.length];
}

function App() {
  const [pressedKeys, setPressedKeys] = useState("");
  const [keyTimer, setKeyTimer] = useState(null);
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    const onKeypress = (evt) => {
      if (pressedKeys.length > 2) {
        return;
      }

      const letter = String.fromCharCode(
        evt.keyCode || evt.charCode
      ).toUpperCase();

      const letterInfo = letterMap[pressedKeys + letter];

      if (!letterInfo) {
        return;
      }

      setPressedKeys(pressedKeys + letter);

      if (keyTimer) {
        clearTimeout(keyTimer);
      }

      const timer = setTimeout(() => {
        handleKeyDown(letterInfo, setPressedKeys, voice);
        setTimeout(() => {
          setKeyTimer(null);
        }, 2500);
      }, 500);

      setKeyTimer(timer);
    };

    window.addEventListener("keydown", onKeypress);
    return () => {
      window.removeEventListener("keydown", onKeypress);
    };
  }, [voice, pressedKeys, setPressedKeys, keyTimer]);

  let image = "";
  if (pressedKeys) {
    image = require("./letters/" + pressedKeys + ".jpg");
  }

  return (
    <div className="App">
      {false && <VoiceSelector onChange={setVoice} />}
      {!pressedKeys && (
        <div
          style={{
            fontSize: 64,
            textShadow: `10px 10px 15px ${getColor()}`,
          }}
        >
          Type a letter!
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {pressedKeys && (
          <>
            <div
              style={{
                fontSize: 600,
                textShadow: `10px 10px 15px ${
                  VOWELS.includes(pressedKeys) ? "red" : "blue"
                }`,
              }}
            >
              {pressedKeys}
            </div>
            {letterMap[pressedKeys] && (
              <div>
                <img src={image} alt={pressedKeys} />
              </div>
            )}

            {letterMap[pressedKeys] && (
              <div
                style={{
                  fontSize: 64,
                }}
              >
                {letterMap[pressedKeys.toUpperCase()].emoji}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
