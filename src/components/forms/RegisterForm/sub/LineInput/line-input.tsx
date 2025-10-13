import type { JSX, ChangeEventHandler } from "react";
import { useEffect, useState } from "react";

import styles from "./line-input.module.scss";
import "./validation.scss";

interface Props {
  type: "text" | "email" | "password";
  value: string;
  changeHandler: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  name: string;
}

export const LineInput = ({
  type,
  value,
  changeHandler,
  placeholder,
  name,
}: Props): JSX.Element => {
  const [validation, setValidation] = useState<"initial" | "valid" | "invalid">(
    "initial"
  );

  const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  useEffect(() => {
    switch (type) {
      case "text":
        if (value.length > 2 && value.length < 50) {
          setValidation("valid");
        } else if (value === "") {
          setValidation("initial");
        } else {
          setValidation("invalid");
        }
        break;
      case "email":
        if (emailRegex.test(value)) {
          setValidation("valid");
        } else if (value === "") {
          setValidation("initial");
        } else {
          setValidation("invalid");
        }
        break;
      case "password":
        if (value.length >= 8) {
          setValidation("valid");
        } else if (value === "") {
          setValidation("initial");
        } else {
          setValidation("invalid");
        }
        break;
    }
  }, [value, type]);

  return (
    <div className={`${styles.container} container-${validation}`}>
      <label htmlFor={name} style={{ display: "none" }}>
        {placeholder}
      </label>
      <input
        className={styles.lineInput}
        aria-invalid={validation === "invalid"}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={changeHandler}
        required
      />

      <div
        className={`${styles.validationCircle} circle-${validation}`}
        aria-hidden="true"
      ></div>
    </div>
  );
};
