/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#e11d48",

          secondary: "#fee2e2",

          accent: "#9f1239",

          neutral: "#a5f3fc",

          "base-100": "#ffffff",

          info: "#818cf8",

          success: "#d9f99d",

          warning: "#facc15",

          error: "#881337",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
