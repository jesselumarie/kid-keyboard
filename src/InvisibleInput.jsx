import React, { useRef } from "react";

const inputStyles = {
  opacity: 0,
  position: "absolute",
  left: "-9999px",
  height: 0,
  width: 0,
};

export function InvisibleInput() {
  const inputRef = useRef(null);

  const handleTrigger = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input type="text" id="hidden-input" style={inputStyles} ref={inputRef} />
      <button onClick={handleTrigger}>Trigger Keyboard</button>
    </>
  );
}
