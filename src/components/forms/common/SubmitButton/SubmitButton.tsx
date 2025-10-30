import type { JSX } from "react";
import clsx from "clsx";

import styles from "./submitButton.module.scss";

interface Props {
  label: string;
  invalid: boolean;
  submitting?: boolean;
}

export const SubmitButton = ({
  invalid,
  label,
  submitting,
}: Props): JSX.Element => {
  return (
    <input
      aria-label={label}
      type="submit"
      className={clsx(
        // Common class.
        styles.submitButton,

        // Set classes on negative cases.
        invalid && styles.invalid,
        submitting && styles.submission
      )}
      value={label}
      disabled={invalid || submitting}
    />
  );
};
