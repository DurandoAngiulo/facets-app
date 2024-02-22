import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        header: ["gyst-variable", "sans-serif"],
        body: ["arboria", "sans-serif"],
        "body-medium": ["arboria Medium", "sans-serif"],
        "body-bold": ["arboria Bold", "sans-serif"]
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "berry-linear": "linear-gradient(to right, rgb(86, 91, 181), rgb(194, 87, 224))"
      },
      colors: {
        primary: "var(--brand)",
        body: "var(--body)",
        border: "var(--border)"
      }
    }
  },
  plugins: []
};
export default config;
