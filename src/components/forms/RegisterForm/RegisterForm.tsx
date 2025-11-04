import type { JSX, ChangeEvent, FormEvent } from "react";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("auth");

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
      toast.loading(t("notification-loading"), {
        id: "submission",
      });
      // Perform registration process.
      await register(data);
      // Ignite user's eyes with friendly success notification.
      toast.success(t("register.notification-success"));
      // Cleanup form fields.
      setData(initialDataState);
    } catch (error: any) {
      toast.error(`${t("register.notification-error")} "${error.message}"`);
    } finally {
      toast.dismiss("submission");
      // Cleanup form fields.
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <header aria-labelledby="form-heading">
        <h1 id="form-heading" className={styles.formHeading}>
          {t("register.heading")}
        </h1>
        <h3 id="inputs-heading" className={styles.formSubHeading}>
          {t("register.subheading")}
        </h3>
      </header>

      <section
        className={styles.inputsSection}
        aria-labelledby="inputs-heading"
      >
        <section className={styles.inputsGroup}>
          <LineInput
            type="text"
            placeholder={t("input.placeholder-firstname")}
            value={data.firstname}
            name="firstname"
            changeHandler={handleChange}
            autocomplete="given-name"
          />

          <LineInput
            type="text"
            placeholder={t("input.placeholder-lastname")}
            value={data.lastname}
            name="lastname"
            changeHandler={handleChange}
            autocomplete="family-name"
          />
        </section>

        <section className={styles.inputsGroup}>
          <LineInput
            type="email"
            placeholder={t("input.placeholder-email")}
            value={data.email}
            name="email"
            changeHandler={handleChange}
            autocomplete="email"
          />

          <LineInput
            type="password"
            placeholder={t("input.placeholder-password")}
            value={data.password}
            name="password"
            changeHandler={handleChange}
            autocomplete="new-password"
          />
        </section>
      </section>

      <SubmitButton
        label={t("register.button-label")}
        invalid={!valid}
        submitting={submitting}
      />

      <Link
        aria-label={t("register.login-link.aria-label")}
        className={styles.loginLink}
        to="/signin"
      >
        {t("register.login-link")}
      </Link>
    </form>
  );
};

export const RegisterForm = memo(RegisterFormComponent);
