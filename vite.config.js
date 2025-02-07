import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    hmr: {
      host: "localhost",
    },
  },
  plugins: [],
  base: "./", // Burayı güncelle
  build: {
    outDir: "dist",
  },
});
