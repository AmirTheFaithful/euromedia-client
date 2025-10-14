import type { JSX, ChangeEvent, FormEvent } from "react";
import { memo, useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import { toast } from "sonner";

import { LineInput } from "./sub/LineInput/line-input";
import { SubmitButton } from "./sub/SubmitButton/submit-button";
import { emailRegex } from "@/utils/validators";
import { URLMap } from "@/utils/urls";

import styles from "./registrationForm.module.scss";

interface RegisterData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const initialDataState: RegisterData = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};

const RegisterFormComponent = (): JSX.Element => {
  const [data, setData] = useState<RegisterData>(initialDataState);

  const [valid, setValid] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (
      data.firstname.length > 2 &&
      data.firstname.length < 50 &&
      emailRegex.test(data.email) &&
      data.password.length >= 8
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [data]);

  const sendCredentials = async () => {
    try {
      const response = await axios.post(URLMap.get("register"), data);

      console.log(response.data);
      // Render a notification with a timer and resend-button.
      toast.success(
        "We have been sent verification link! Please check your inbox."
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const serverMessage: string = error.response.data.message;

        // Render failure notification with backend's message.
        toast.error(`Registration failed due to "${serverMessage}"`);
      } else {
        // Render an abstract fail notification.
        toast.error("Network error. Please try again.");
      }
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await sendCredentials();
    } finally {
      // Cleanup form fields.
      setData(initialDataState);
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

      <SubmitButton label="Sign Up" disabled={!valid} />

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
