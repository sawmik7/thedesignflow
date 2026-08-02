import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": "/src" },
    tsconfigPaths: true,
  },
  build: {
    // Target modern browsers for smaller, faster bundles
    target: "esnext",

    // Split CSS per chunk for parallel loading
    cssCodeSplit: true,

    // esbuild minification (default but explicit)
    minify: "oxc",

    // Skip compressed size report to speed up build
    reportCompressedSize: false,

    // Raise chunk warning threshold
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        manualChunks(id) {
          // Three.js ecosystem — largest chunk, isolated
          if (id.includes("node_modules/three") || id.includes("node_modules/@react-three")) {
            return "vendor-three";
          }
          // Animation libraries
          if (id.includes("node_modules/framer-motion") || id.includes("node_modules/motion")) {
            return "vendor-motion";
          }
          if (id.includes("node_modules/gsap")) {
            return "vendor-gsap";
          }
          // Lottie — only needed on Hero, isolated chunk
          if (id.includes("node_modules/lottie-web") || id.includes("node_modules/@lottiefiles")) {
            return "vendor-lottie";
          }
          // Smooth scroll
          if (id.includes("node_modules/lenis")) {
            return "vendor-lenis";
          }
          // Carousel
          if (id.includes("node_modules/embla-carousel")) {
            return "vendor-embla";
          }
          // Core React runtime
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react-router-dom")
          ) {
            return "vendor-react";
          }
        },
      },
    },
  },
});
