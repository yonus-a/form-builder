import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      customElement: true,
    }),
  ],
  build: {
    lib: {
      entry: "src/FormBuilderElement.ts",
      formats: ["es"],
      fileName: "form-bilder-ce",
    },
  },
});
