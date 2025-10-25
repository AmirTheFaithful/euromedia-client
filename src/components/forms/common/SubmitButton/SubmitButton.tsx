import type { JSX } from "react";
import clsx from "clsx";

import styles from "./submitButton.module.scss";

interface Props {
  label: string;
  disabled: boolean;
  submitting?: boolean;
}

export const SubmitButton = ({
  disabled,
  label,
  submitting,
}: Props): JSX.Element => {
  return (
    <input
      aria-label={label}
      type="submit"
      className={clsx(styles.submitButton, submitting && styles.submission)}
      value={label}
      disabled={disabled}
    />
  );
};
