import React, {
  useState,
  useEffect,
  useRef
} from 'react';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTWVYXZ123456789";

const useRandomizeText = (initialText, delay = 80, resetDelay = 800) => {
  const [intervalId, setIntervalId] = useState(null);
  const [mutex, setMutex] = useState(true);
  const originalTextRef = useRef('');

  const test = (letter) => {
      if (letter.localeCompare(" ") !== 0) {
          return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      } else {
          return " ";
      }
  };

  const randomizeText = (target) => {
      if (mutex) {
          const textLength = target.innerText.length;
          originalTextRef.current = target.innerText;
          setMutex(false);

          let currentIndex = 0;
          const id = setInterval(() => {
              const randomLetters = target.innerText
                  .split("")
                  .map((letter) => test(letter))
                  .join("");
              currentIndex += 0.5;

              target.innerText =
                  originalTextRef.current.substring(0, Math.floor(currentIndex)) +
                  randomLetters.substring(Math.floor(currentIndex));

              if (currentIndex >= textLength) {
                  clearInterval(id);
                  setTimeout(() => {
                      setMutex(true);
                  }, resetDelay);
              }
          }, delay);

          setIntervalId(id);
      }
  };

  useEffect(() => {
      return () => {
          clearInterval(intervalId);
      };
  }, [intervalId]);

  return {
      randomizeText
  };
};

export default useRandomizeText;