import React, { useState, useEffect, useRef } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTWVYXZ123456789";

const RandomizeText = () => {
  const [intervalId, setIntervalId] = useState(null);
  const [mutex, setMutex] = useState(true);
  const originalTextRef = useRef("");

  const test = (letter) => {
    if (letter.localeCompare(" ") !== 0) {
      return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    } else {
      return " ";
    }
  };

  const randomizeText = (event) => {
    if (mutex) {
      const textLength = event.target.innerText.length;
      originalTextRef.current = event.target.innerText;
      setMutex(false);

      let currentIndex = 0;
      const id = setInterval(() => {
        const randomLetters = event.target.innerText
          .split("")
          .map((letter) => test(letter))
          .join("");
        currentIndex += 0.5;

        event.target.innerText =
          originalTextRef.current.substring(0, Math.floor(currentIndex)) +
          randomLetters.substring(Math.floor(currentIndex));

        if (currentIndex >= textLength) {
          clearInterval(id);
          setTimeout(() => {
            setMutex(true);
          }, 800);
        }
      }, 80);

      setIntervalId(id);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <p
      onMouseOver={(event) => randomizeText(event)}
      className="font-bold text-blue   md:text-[100px] text-[70px] "
    >
      EXPLORE.
    </p>
  );
};

export default RandomizeText;
