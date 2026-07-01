import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// For GitHub Pages project sites the app is served from /<repo>/, not the root.
// Set to "/" when deploying to a custom domain, a user/org page, or Netlify/Vercel.
const base = process.env.GITHUB_ACTIONS ? "/meal-planning/" : "/";

export default defineConfig({
  base,
  plugins: [react()],
});
