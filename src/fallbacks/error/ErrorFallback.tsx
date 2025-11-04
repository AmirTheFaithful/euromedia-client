import type { JSX, FC } from "react";
import { useTranslation } from "react-i18next";

import styles from "./errorFallback.module.scss";

interface Props {
  error?: Error;
  onRetry?: () => void;
}

export const ErrorFallback: FC<Props> = ({ error, onRetry }): JSX.Element => {
  const { t } = useTranslation("common");

  return (
    <div className={styles.fallback}>
      <h1>{`${t("fallbacks.error.title")} 💭`}</h1>
      {error && <pre className={styles.error}>{error.message}</pre>}

      <button onClick={onRetry} className={styles.retry}>
        {t("fallbacks.error.retry")}
      </button>
    </div>
  );
};
