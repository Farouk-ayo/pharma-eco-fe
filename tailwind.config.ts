import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#157D18",
        primaryDark: "#023022",
        secondary: "#FFB506",
        tertiary: "#157D1861",
        tertiary1: "#FFB50661",
        tertiary2: "#02302240",
        tertiary3: "#023022",
        textPrimary: "#333333",
        bgPrimary: "##F4F4F4",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "float-slower": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        rotateClockwise: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "float-delayed": "float-delayed 3.5s ease-in-out infinite",
        "float-slower": "float-slower 4s ease-in-out infinite",
        rotateSlow: "rotateClockwise 10s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
