import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Change the base to match your GitHub Pages repo name.
// If deploying to rovoche.github.io/homepage → base: "/homepage/"
// If deploying to a custom domain (rovoche.com) → base: "/"
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/homepage/",
});
