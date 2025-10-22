import type { JSX } from "react";

import styles from "./submitButton.module.scss";

interface Props {
  label: string;
  disabled: boolean;
}

export const SubmitButton = ({ disabled, label }: Props): JSX.Element => {
  return (
    <input
      aria-label={label}
      type="submit"
      className={styles.submitButton}
      value={label}
      disabled={disabled}
    />
  );
};
