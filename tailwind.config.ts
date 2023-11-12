import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      margin: ["responsive", "hover", "focus", "active"],
    },
  },

  plugins: [daisyui],
};

export default config;
