import type { FC, ReactNode } from "react";
import { useEffect } from "react";

interface Props {
  children: ReactNode;
}

export const GlobalErrorHandler: FC<Props> = ({ children }) => {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      console.error("Global error event:", event.message, event.error);
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled rejection:", event.reason);
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return <>{children}</>;
};
