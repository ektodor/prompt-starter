import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.NODE_ENV === "production" ? "prompt-starter" : "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@images": path.resolve(__dirname, "src/assets/images"),
      "@frontend": path.resolve(__dirname, "src/views/frontend"),
      "@backend": path.resolve(__dirname, "src/views/backend"),
    },
  },
});
