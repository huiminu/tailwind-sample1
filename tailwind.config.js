const defaultTheme = require('tailwindcss/defaultTheme')
// const imgPathSrc = '../../assets/images';
module.exports = {
  content: [
    "./src/**/*.{html,ejs,scss}",
    // "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    screens: {
      'xs': '440px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          100:"#152B54BF",
          200:"#0F194EBF",
          300:"#252561",
          400:"#252562",
          500:"#0A0B55D9",
          600:"#152B54",
          700:"#05114D",
        },
        secondary: {
          100:"#9CEDF8",
          200:"#33E7FF",
          300:"#52E0FF",
          400:"#0FEDF8",
          500:"#0FEDF8BF",
          600:"#0FEDF6",
          700:"#19D6DE",
          800:"#008AA8",
          900:"#19ADE3",
        }
      },
    },
  },
  variants: {
    extend: {
      borderStyle: ["responsive", "hover"],
      fontSize: ["responsive", "group-hover"], //加入 group-hover
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    // require("tw-elements/dist/plugin"),
    require("@tailwindcss/typography"),
  ],
};
