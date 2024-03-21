import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
  // test: {
  //   globals: true,
  //   environment: "jsdom",
  //   setupFiles: "./test/setup.ts",
  //   css: true,
  //   // you might want to disable it, if you don't have tests that rely on CSS
  //   // since parsing CSS is slow
  // },
});
