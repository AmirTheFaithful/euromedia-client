import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load all .env variables with VITE_ prefix.
  const env = loadEnv(mode, process.cwd());

  // Map VITE_ constants to keys without the boring prefix.
  const processEnv = Object.keys(env)
    .filter((key) => key.startsWith("VITE_"))
    .reduce((accumulator, key) => {
      // Remove the VITE_ prefix and expose them.
      const newKey = key.replace(/^VITE_/, "");
      accumulator[`process.env.${newKey}`] = JSON.stringify(env[key]);
      return accumulator;
    }, {} as Record<string, string>);

  // Return the main Vite configuration stuff.
  return {
    plugins: [react(), svgr()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/abstracts/index.scss" as *;`,
        },
      },
    },
    define: processEnv,
  };
});
