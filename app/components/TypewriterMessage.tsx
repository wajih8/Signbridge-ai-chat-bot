"use client";

import { useState, useEffect } from "react";

interface TypewriterMessageProps {
  text: string;
  play: boolean; // only play typewriter when true
}

export default function TypewriterMessage({ text, play }: TypewriterMessageProps) {
  const [displayedText, setDisplayedText] = useState(play ? "" : text);

  useEffect(() => {
    if (!play) return; // skip typewriter for old messages
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 20); // speed in ms per character

    return () => clearInterval(interval);
  }, [text, play]);

  return <span>{displayedText}</span>;
}
