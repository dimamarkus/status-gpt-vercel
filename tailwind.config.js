const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        serif: ["var(--font-tiemposHeadline)", ...fontFamily.serif],

        // tiempos: ["var(--font-tiempos)", ...fontFamily.serif],
        // graphik: ["var(--font-graphik)", ...fontFamily.sans],
        // tiemposHeadline: ["var(--font-tiemposHeadline)", ...fontFamily.serif],

        // avenir: ["var(--font-avenir)", ...fontFamily.sans],
        // exo: ["var(--font-exo)", ...fontFamily.sans],
        // inter: ["var(--font-inter)", ...fontFamily.sans],
        // lato: ["var(--font-lato)", ...fontFamily.sans],
        // raleway: ["var(--font-raleway)", ...fontFamily.sans],
        // montserrat: ["var(--font-montserrat)", ...fontFamily.sans],
      },
      // https://vercel.com/design/color
      colors: {
        gray: colors.zinc,
        "gray-1000": "rgb(17,17,19)",
        "gray-1100": "rgb(10,10,11)",
        vercel: {
          pink: "#FF0080",
          blue: "#0070F3",
          cyan: "#50E3C2",
          orange: "#F5A623",
          violet: "#7928CA",
        },
      },
      backgroundImage: ({ theme }) => ({
        "vc-border-gradient": `radial-gradient(at left top, ${theme(
          "colors.gray.500",
        )}, 50px, ${theme("colors.gray.800")} 50%)`,
      }),
      keyframes: ({ theme }) => ({
        rerender: {
          "0%": {
            ["border-color"]: theme("colors.vercel.pink"),
          },
          "40%": {
            ["border-color"]: theme("colors.vercel.pink"),
          },
        },
        highlight: {
          "0%": {
            background: theme("colors.vercel.pink"),
            color: theme("colors.white"),
          },
          "40%": {
            background: theme("colors.vercel.pink"),
            color: theme("colors.white"),
          },
        },
        loading: {
          "0%": {
            opacity: ".2",
          },
          "20%": {
            opacity: "1",
            transform: "translateX(1px)",
          },
          to: {
            opacity: ".2",
          },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        translateXReset: {
          "100%": {
            transform: "translateX(0)",
          },
        },
        fadeToTransparent: {
          "0%": {
            opacity: 1,
          },
          "40%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
      }),
    },
  },
  daisyui: {
    themes: [
      {
        dark: {
          // primary: "#3172F5", // OG
          primary: "#1E90FF",
          secondary: "#00716A",
          // accent: "#33B5E6",
          accent: "#C7B400",
          neutral: "#1C1F27",
          info: "#9AA5D1",
          success: "#3F892A",
          warning: "#C4851C",
          error: "#B63535",
          "base-100": "#1C1F27",
        },
        light: {
          primary: "#3172F5",
          secondary: "#00B7C2",
          background: "#F1F2F3",
          text: "#1C1F27",
          accent: "#FFEB3B",
          neutral: "#2C2F3D",
          info: "#9AA5D1",
          success: "#3F892A",
          warning: "#C4851C",
          error: "#B63535",
          "base-100": "#F1F2F3",
          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.25rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // set default text transform for buttons
          "--btn-focus-scale": "0.975", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms"), require("daisyui")],
};
