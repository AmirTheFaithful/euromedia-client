import type { JSX } from "react";
import { Toaster } from "sonner";

import styles from "./signin.module.scss";

import { LoginForm } from "@/components/forms/LoginForm";
import { BackgroundSlider } from "@/components/BackgroundSlider/slider";

export default function SigninPage(): JSX.Element {
  return (
    <main className={styles.signupPage}>
      <Toaster />
      <BackgroundSlider />

      <div className={styles.darken}>
        <LoginForm />
      </div>
    </main>
  );
}
