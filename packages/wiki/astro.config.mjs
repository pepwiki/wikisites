import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://wikipept.com",
  output: "static",
  integrations: [solid()],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "solid-js": ["solid-js"],
          },
        },
      },
    },
  },
});
