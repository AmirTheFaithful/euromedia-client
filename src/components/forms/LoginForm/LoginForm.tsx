import type { JSX, ChangeEvent, FormEvent } from "react";

import { memo, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

import type { LoginData } from "./types";

import { LineInput } from "../common/LineInput/LineInput";
import { SubmitButton } from "../common/SubmitButton/SubmitButton";
import { useLogin, useFormValidation } from "./hooks";

import styles from "./loginForm.module.scss";

const initialDataState: LoginData = {
  email: "",
  password: "",
};

const LoginFormComponent = (): JSX.Element => {
  const [data, setData] = useState<LoginData>(initialDataState);
  const [submitting, setSubmitting] = useState(false);

  // Initialize using custom hooks.
  const { login } = useLogin();
  const valid = useFormValidation(data);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      // Disable submit button while operation is in progress.
      setSubmitting(true);
      // Perform login operation.
      await login(data);
      // Ignite user's eyes with friendly success notification.
      toast.success("Successfully logged in!");
      // Cleanup form fields.
      setData(initialDataState);
    } catch (error: any) {
      toast.error(`Login failed due to "${error.message}"`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <header aria-labelledby="form-heading">
        <h1 id="form-heading" className={styles.formHeading}>
          Login
        </h1>
      </header>

      <section
        className={styles.inputsSection}
        aria-labelledby="inputs-heading"
      >
        <h3 id="inputs-heading" className={styles.formSubHeading}>
          Please, enter your credentials
        </h3>

        <LineInput
          type="email"
          placeholder="Email"
          value={data.email}
          name="email"
          changeHandler={handleChange}
        />

        <LineInput
          type="password"
          placeholder="Password"
          value={data.password}
          name="password"
          changeHandler={handleChange}
        />
      </section>

      <SubmitButton label="Sign In" disabled={!valid || submitting} />

      <Link
        aria-label="Go to sign-up page"
        className={styles.loginLink}
        to="/signup"
      >
        Don't have an account? Sign up!
      </Link>
    </form>
  );
};

export const LoginForm = memo(LoginFormComponent);
