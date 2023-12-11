import { fromPairs, map, range, toInteger, toString } from "lodash-es"
import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

// Kodekalender 2023 design colors
const colors = {
  black: "#333333",
  "pure-black": "#000000",
  gray: "#9A9A9B",
  white: "#F8F9FA",
  purple :   { "900": "#111230", "800": "#1B1946", "700": "#2C2A56", "600": "#494778", "500": "#585684", "400": "#8A87AF", "300": "#8D8DB0", "200": "#9895B0", "100": "#A99EB6" },
  red:       { "900": "#361F1D", "800": "#49302E", "600": "#751C15", "700": "#BE1B0D", "500": "#933122", "400": "#9C5449", "300": "#C1948D", "200": "#DABFBB", "100": "#F3EAE8" },
  yellow:    { "900": "#833C0D", "800": "#B3591E", "700": "#EB782C", "600": "#DA8936", "500": "#D99936", "400": "#EBBB70", "300": "#FFE6BD", "200": "#FAE7C8", "100": "#FDF8EF" },
  green:     { "900": "#132912", "800": "#28402B", "700": "#35563D", "600": "#526D50", "500": "#7D917C", "400": "#A8B6A8", "300": "#CBCFCB", "200": "#E9EDE9", "100": "#F4F4F4" },
  pink :     { "900": "#DB4642", "800": "#E07063", "700": "#DB7C86", "600": "#E4ACB0", "500": "#EDC7C7", "400": "#D8C3C2", "300": "#E6CDCE", "200": "#EBDAD9", "100": "#F4ECEB" },
  orange :   { "900": "#C09773", "800": "#CB926B", "700": "#CE906C", "600": "#C79170", "500": "#E9BDA3", "400": "#F3C373", "300": "#F7D7A3", "200": "#FAE7C8", "100": "#FDF8EF" },
  turqoise : { "900": "#357268", "800": "#3C867C", "700": "#358F79", "600": "#52AE94", "500": "#63B792", "400": "#A2DAD0", "300": "#D4DDDD", "200": "#DFE8E8", "100": "#EBF1F1" },
}

// Overwrite spacings to default to /8rem instead of /4rem, to match standard
// sizes from Figma design
const spacing = fromPairs(map([
  // every 0.125rem up to 8rem
  ...range(0, 8, 0.125),
  // every 0.25rem up to 16rem
  ...range(8, 16, 0.25),
  // every 0.5rem up to 32rem
  ...range(16, 32, 0.5),
  // every 1rem up to 64rem
  ...range(32, 64, 1)
], (rem) => [toString(toInteger(rem * 8)), `${rem}rem`]))

// Add variant for light mode
const lightModeVariant = plugin(({ addVariant }) => {
  addVariant("light", `:is(.light &)`)
})

export default {
  content: [
    "./src/**/*.{ts,tsx,svg}"
  ],
  darkMode: "class",
  theme: {
    // Total overwrites
    spacing,
    fontSize: {
      // Our own text sizes
      "xs": ["0.75rem", "1rem"], // 12px
      "sm": ["0.875rem", "1.35rem"],    // 14px
      "base": ["1.125rem", "1.575rem"], // 18px
      "lg": ["1.75rem", "2.1875rem"], // 28px
      "xl": ["2.625rem", "1"], // 42px
      "2xl": ["3.375rem", "1"], // 54px
      "3xl": ["4.375rem", "1"], // 70px
    },
    colors: {
      ...colors,
      "current": "currentColor",
      "inherit": "inherit",
      "transparent": "transparent"
    },

    // Theme extension
    extend: {
      screens: {
        "julehus-width": "890px"
      },
      width: {
        "avatar": "4.5rem"
      },
      maxWidth: {
        ...spacing
      },
      margin: {
        "avatar": "4.5rem",
      },
      space: {
        "door-elements": "4rem"
      },
      gap: {
        "door-elements": "4rem"
      },
      typography: {
        DEFAULT: {
          css: {
            fontSize: '1.125rem',
            '--tw-prose-body': colors.white,
            '--tw-prose-headings': colors.white,
            '--tw-prose-code': colors.white,
            '--tw-prose-bold': colors.white,
            // '--tw-prose-lead': theme('colors.pink[700]'),
            '--tw-prose-links': colors.white,
            // '--tw-prose-bold': theme('colors.pink[900]'),
            // '--tw-prose-counters': theme('colors.pink[600]'),
            // '--tw-prose-bullets': theme('colors.pink[400]'),
            // '--tw-prose-hr': theme('colors.pink[300]'),
            '--tw-prose-quotes': colors.white,
            // '--tw-prose-quote-borders': theme('colors.pink[300]'),
            // '--tw-prose-captions': theme('colors.pink[700]'),
            // '--tw-prose-code': theme('colors.pink[900]'),
            // '--tw-prose-pre-code': theme('colors.pink[100]'),
            // '--tw-prose-pre-bg': theme('colors.pink[900]'),
            // '--tw-prose-th-borders': theme('colors.pink[300]'),
            // '--tw-prose-td-borders': theme('colors.pink[200]'),
          }
        }
      },
      keyframes: {
        'bell-click': {
          "0%": { transform: "rotate(30deg)" },
          "20%": { transform: "rotate(-20deg)" },
          "40%": { transform: "rotate(10deg)" },
          "60%": { transform: "rotate(-7deg)" },
          "80%": { transform: "rotate(3deg)" },
          "100%": { transform: "rotate(0deg)" }
        }
      },
      animation: {
        'bell-click': "bell-click 0.7s ease-in-out"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-children"),
    require("@whiterussianstudio/tailwind-easing"),
    require("@tailwindcss/forms")({ strategy: "class" }),
    lightModeVariant
  ]
} satisfies Config

