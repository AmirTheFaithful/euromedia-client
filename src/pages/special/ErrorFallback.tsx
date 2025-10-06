import type { FC } from "react";
import styles from "./errorFallback.module.scss";

interface Props {
  error?: Error;
  onRetry?: () => void;
}

export const ErrorFallback: FC<Props> = ({ error, onRetry }) => {
  return (
    <div className={styles.fallback}>
      <h1>Something went wrong 💭</h1>
      {error && <pre className={styles.error}>{error.message}</pre>}

      <button onClick={onRetry} className={styles.retry}>
        Retry again
      </button>
    </div>
  );
};
