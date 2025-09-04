import { useEffect, useState } from "react";
import styles from "./TypeWriterText.module.css";
import clsx from "clsx";

const TypeWriterText = ({
  words = [],
  speed = 100,
  deleteSpeed = 50,
  delay = 2000,
  thinkingPause = 1500,
  style = "",
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const currentWord = words[currentWordIndex];
    if (isThinking) {
      const timer = setTimeout(() => {
        setIsThinking(false);
        setIsDeleting(true);
      }, thinkingPause);
      return () => clearTimeout(timer);
    }

    if (isWaiting) {
      const timer = setTimeout(() => {
        setIsWaiting(false);
        setIsThinking(true);
      }, delay);
      return () => clearTimeout(timer);
    }

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        return;
      }

      const timer = setTimeout(() => {
        setCurrentText(currentText.slice(0, -1));
      }, deleteSpeed);
      return () => clearTimeout(timer);
    }

    if (currentText === currentWord) {
      setIsWaiting(true);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentText(currentWord.slice(0, currentText.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [
    currentText,
    currentWordIndex,
    isDeleting,
    isWaiting,
    isThinking,
    words,
    speed,
    deleteSpeed,
    delay,
    thinkingPause,
  ]);
  console.log(`${styles["typewriter"]} ${styles[style]})`);
  return (
    <span className={styles["typewriter"]} >
      {currentText}
    </span>
  );
};

export default TypeWriterText;
