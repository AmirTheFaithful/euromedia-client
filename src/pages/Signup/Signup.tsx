import type { JSX } from "react";
import { Toaster } from "sonner";

import styles from "./signup.module.scss";

import { RegisterForm } from "../../components/forms/RegisterForm";
import { BackgroundSlider } from "../../components/BackgroundSlider/slider";

export default function SignupPage(): JSX.Element {
  return (
    <main className={styles.signupPage}>
      <Toaster />
      <BackgroundSlider />

      <div className={styles.darken}>
        <RegisterForm />
      </div>
    </main>
  );
}
