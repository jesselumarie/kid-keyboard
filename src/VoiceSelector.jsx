import React, { useState, useEffect } from "react";

export const VoiceSelector = ({ onChange }) => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const populateVoices = () => {
      setVoices(
        window.speechSynthesis.getVoices().filter((v) => v.lang === "en-US")
      );
    };

    populateVoices();
    window.speechSynthesis.addEventListener("voiceschanged", populateVoices);

    return () => {
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        populateVoices
      );
    };
  }, []);

  useEffect(() => {
    onChange(voices[0] || null);
  }, [voices.length, onChange]);

  const handleVoiceChange = (event) => {
    const voice = voices.find((v) => v.name === event.target.value);
    setSelectedVoice(voice);
    onChange(voice);
  };

  return (
    <select onChange={handleVoiceChange}>
      {voices.map((voice, index) => (
        <option key={index} value={voice.name}>
          {voice.name}
        </option>
      ))}
    </select>
  );
};
