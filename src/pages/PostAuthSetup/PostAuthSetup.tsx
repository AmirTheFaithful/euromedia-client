import type { JSX } from "react";

import { useState } from "react";
import { motion } from "motion/react";

import { Setup2FA } from "@/scenes/Setup2FA";
import { SetupTheme } from "@/scenes/SetupTheme";

import styles from "./postAuthSetup.module.scss";

const PostAuthSetup = (): JSX.Element => {
  const [stage, setStage] = useState<1 | 2>(1);

  return (
    <main className={styles.page}>
      <motion.div
        id="wrapper"
        animate={{ y: stage === 2 ? "-100vh" : "0vh" }}
        transition={{ duration: 1 }}
      >
        <Setup2FA handleStage={(): void => setStage(2)} />
        {stage === 2 && <SetupTheme />}
      </motion.div>
    </main>
  );
};

export default PostAuthSetup;
