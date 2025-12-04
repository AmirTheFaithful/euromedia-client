import { useState, useEffect } from "react";

export const useMediaQuery = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");

    const handler = (e: MediaQueryListEvent): void => setIsDesktop(e.matches);

    setIsDesktop(mq.matches);
    mq.addEventListener("change", handler);

    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
};
