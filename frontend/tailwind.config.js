import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  /** @type {import('daisyui').Config} */
  daisyui: {
    themes: [
      {
        light: {
          primary: "#000000",
          secondary: "#0c4a6e",
          accent: "#164e63",
          neutral: "#111827",
          "base-100": "#ffffff",
          info: "#2563eb",
          success: "#15803d",
          warning: "#a16207",
          error: "#991b1b",
        },
        dark: {
          primary: "#ffffff",
          secondary: "#0369a1",
          accent: "#164e63",
          neutral: "#111827",
          "base-100": "#111827",
          info: "#2563eb",
          success: "#15803d",
          warning: "#a16207",
          error: "#991b1b",
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};
