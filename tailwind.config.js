const colors = require("tailwindcss/colors");

module.exports = {
  prefix: "",
  mode: "jit",
  important: false,
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontSize: {
      xs: "0.625rem",
      sm: "0.75rem",
      md: "0.8125rem",
      base: "0.875rem",
      lg: "1rem",
      xl: "1.125rem",
      "2xl": "1.25rem",
      "3xl": "1.5rem",
      "4xl": "2rem",
      "5xl": "2.25rem",
      "6xl": "2.5rem",
      "7xl": "3rem",
      "8xl": "4rem",
      "9xl": "6rem",
      "10xl": "8rem",
    },
    screens: {
      xxss: "360px",
      xss: "540px",
      sm: "600px",
      mdx: "720px",
      md: "960px",
      lgx: "1080px",
      lg: "1280px",
      xl: "1440px",
    },
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        maxHeight0To10: {
          "0%": {
            maxHeight: "0",
          },
          "100%": {
            maxHeight: "40px",
          },
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-down": {
          from: {
            opacity: "1",
            transform: "translateY(0px)",
          },
          to: {
            opacity: "0",
            transform: "translateY(10px)",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-up": {
          from: {
            opacity: "1",
            transform: "translateY(0px)",
          },
          to: {
            opacity: "0",
            transform: "translateY(10px)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        maxHeight0To10: "maxHeight0To10 0.7s ease-in-out",
        "fade-in-down": "fade-in-down 0.3s ease-out",
        "fade-out-down": "fade-out-down 0.3s ease-out",
        "fade-in-up": "fade-in-up 0.3s ease-out",
        "fade-out-up": "fade-out-up 0.3s ease-out",
      },
      boxShadow: {
        custom: "0px 0px 50px 0px rgb(82 63 105 / 15%)",
        nr0: "0px 8px 24px rgb(149 157 165 / 0.2)",
        nr6: "0px 2px 8px 0px rgb(99 99 99 / 0.2)",
      },
      colors: {
        primary: colors.violet,
        negative: colors.red,
        primaryColor: "#0057CE",
        bluePrimary: "#0057CE",
        darkPrimary: "#02505D",
        yellowPrimary: "##ffba33",
        yellowHoverPrimary: "#ffdc5f",
        lightBluePrimary: "#DAE2FF",
        cargoPrimary: "#6c49e8",
        darkBluePrimary: "#0055D4",
        navDarkBlue: "#146EF5",
        redDark: "#B82100",
        redLight: "#FDDBD4",
        orangeLight: "#FFFBF2",
        orangeDark: "#FFBA33",
        chart1: "#47C2EC",
        chart2: "#067399",
        chart3: "#78D8CF",
        chart4: "#03374B",
        greenPrimary: "#2d9f46",
        greenHoverPrimary: "#dbf5e1",
        night: {
          50: "#e4e4eb",
          100: "#bbbace",
          200: "#8f8ead",
          300: "#66658c",
          400: "#4b4777",
          500: "#302a62",
          600: "#2b245b",
          700: "#241c51",
          800: "#1c1445",
          900: "#130030",
        },
      },
    },

    fontFamily: {
      poppins: ["Poppins", "system-ui", "sans-serif"],
      nunito: ["Nunito Sans", "sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  variants: {
    extend: {},
    scrollbar: ["dark", "rounded"],
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar"),
    require("flowbite/plugin"),
  ],
};
