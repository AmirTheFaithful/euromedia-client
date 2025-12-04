import type { FC, JSX, MouseEventHandler } from "react";
import clsx from "clsx";

import styles from "./button.module.scss";

interface Props {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  ariaLabel?: string;
}

export const Button: FC<Props> = ({
  label,
  onClick,
  disabled,
  ariaLabel,
}): JSX.Element => {
  // Default color values to be used if current user didn't setup "Coloristic Signature" feature (unimplemented yet).
  const defaultColors: [string, string] = ["#f547bf", "#4675cf"] as const;

  // Button container class names depending on 'disabled' flag.
  const containerClass: string = clsx(styles.buttonContainer, {
    [styles.buttonContainer_disabled]: disabled,
  });

  // Container's inline style value that also depends on 'disabled' flag.
  const containerStyle = !disabled
    ? {
        ["--color1" as any]: defaultColors[0],
        ["--color2" as any]: defaultColors[1],
      }
    : undefined;

  return (
    // The container is used in decorative purposes only to play a color-show.
    <div className={containerClass} style={containerStyle}>
      <button
        className={styles.primary}
        onClick={onClick}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel ?? undefined}
      >
        {label}
      </button>
    </div>
  );
};
