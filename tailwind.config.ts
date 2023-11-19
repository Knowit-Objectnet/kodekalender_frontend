import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"
import plugin from "tailwindcss/plugin"

const colors = {
  black: "#333333",
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

// Add variant for light mode
const lightModeVariant = plugin(({ addVariant }) => {
  addVariant("light", `:is(.light &)`)
})

export default {
  content: [
    "./src/**/*.{ts,tsx,svg}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...colors,
        "current": "currentColor"
      },
      maxWidth: {
        "kodekalender": "80rem"
      },
      width: {
        "kodekalender": "80rem",
        "avatar": "4.5rem"
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
      keyframes: {
        stars: {
          // The background images are exactly 1000px tall, must use exact
          // transform to avoid tearing when the animation repeats. Setting 100%
          // will transform based on the size of the containing element which is
          // scaled to 200% screen height to always show the background image.
          to: { transform: "translateY(-1000px)" }
        }
      },
      animation: {
        "stars-background": "60s linear 0s infinite normal both running stars",
        "stars-midground": "40s linear 0s infinite normal both running stars",
        "stars-foreground": "20s linear 0s infinite normal both running stars"
      },
      backgroundImage: (theme) => ({
        "stars-background": "url('/assets/svg/background.svg')",
        "stars-midground": "url('/assets/svg/midground.svg')",
        "stars-foreground": "url('/assets/svg/foreground.svg')"
      })
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-children"),
    require("@whiterussianstudio/tailwind-easing"),
    require("@tailwindcss/forms")({ strategy: "class" }),
    lightModeVariant
  ]
} satisfies Config

