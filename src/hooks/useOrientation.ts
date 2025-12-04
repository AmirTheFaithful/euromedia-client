import { useState, useEffect } from "react";

export const useOrientation = () => {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait)");
    const handler = (event: MediaQueryListEvent): void =>
      setIsPortrait(event.matches);

    setIsPortrait(mq.matches);
    mq.addEventListener("change", handler);

    return () => mq.removeEventListener("change", handler);
  }, []);

  return isPortrait;
};
