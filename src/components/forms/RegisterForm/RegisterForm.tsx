import type { JSX, ChangeEvent, FormEvent } from "react";
import { memo, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

import type { RegisterData } from "./types";
import { LineInput } from "../common/LineInput";
import { SubmitButton } from "../common/SubmitButton";
import { useRegister, useRegisterValidation } from "./hooks";

import styles from "./registrationForm.module.scss";

const initialDataState: RegisterData = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};

const RegisterFormComponent = (): JSX.Element => {
  const [data, setData] = useState<RegisterData>(initialDataState);
  const [submitting, setSubmitting] = useState(false);

  const valid = useRegisterValidation(data);
  const { register } = useRegister();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      // Disable submit button while operation is in progress.
      setSubmitting(true);
      // Perform registration process.
      await register(data);
      // Ignite user's eyes with friendly success notification.
      toast.success(
        "We have been sent verification link! Please check your inbox."
      );
      // Cleanup form fields.
      setData(initialDataState);
    } catch (error: any) {
      toast.error(`Registration failed due to "${error.message}"`);
    } finally {
      // Cleanup form fields.
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <header aria-labelledby="form-heading">
        <h1 id="form-heading" className={styles.formHeading}>
          Register
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
          type="text"
          placeholder="Firstname"
          value={data.firstname}
          name="firstname"
          changeHandler={handleChange}
        />

        <LineInput
          type="text"
          placeholder="Lastname"
          value={data.lastname}
          name="lastname"
          changeHandler={handleChange}
        />

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

      <SubmitButton label="Sign Up" disabled={!valid || submitting} />

      <Link
        aria-label="Go to sign-in page"
        className={styles.loginLink}
        to="/signin"
      >
        Have an account? Log in!
      </Link>
    </form>
  );
};

export const RegisterForm = memo(RegisterFormComponent);
