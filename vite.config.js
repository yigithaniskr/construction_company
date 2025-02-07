import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    hmr: {
      host: "localhost",
    },
  },
  plugins: [],
  base: "./",  // Bunu ekledik/
  build: {
    outDir: "dist", // Vercel’in doğru klasörü alması için
    assetsDir: "assets", // Vite’in dosyaları düzgün kaydetmesini sağlamak için
  },
});
