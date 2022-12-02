/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  daisyui: {
    themes: [
      {
        dark: {
          "primary": "#F2F2F2",
          "secondary": "#B0B0B0",
          "accent": "#383838",
          "neutral": "#151515",
          "base-100": "#222222",
          "info": "#0072F5",
          "success": "#21CA51",
          "warning": "#FF6052",
          "error": "#E75B4F",
        },
        light: {
          "primary": "#151515",
          "secondary": "#515151",
          "accent": "#D1D1D1",
          "neutral": "#FFFFFF",
          "base-100": "#EEEEEE",
          "info": "#0072F5",
          "success": "#21CA51",
          "warning": "#FF6052",
          "error": "#D62617",
        }
      }
    ]
  },
  theme: {
    extend: {
      fontFamily: {
        inter: ['InterRegular'],
        interBold: ['InterSemiBold'],
      },
      letterSpacing: {
        tightest: '-0.0125em'
      }
    },
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/line-clamp')
  ],
}
