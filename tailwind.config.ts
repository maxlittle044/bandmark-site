import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#1C2B4A",
        paper: "#EDEFE9",
        amber: "#E3A530",
        amberdeep: "#C98A1E",
        green: "#2E7D5B",
        slate: "#5B6472",
        ink: "#1A1F2B",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
