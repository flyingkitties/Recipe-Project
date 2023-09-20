/* eslint-disable spaced-comment */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const withMT = require('@material-tailwind/react/utils/withMT');

const colors = require('material-ui-colors');

module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: { ...colors, myOrange: '#FF8F00' },
      outlineWidth: {
        0.1: '0.1px',
      },
      rotate: {
        360: '360deg',
      },
      display: ['group-hover'],
      backgroundImage: {
        orange: "url('/images/bgAVIF.avif')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
});

//https://live.staticflickr.com/65535/52764822208_5a7e6ff762_o.jpg
