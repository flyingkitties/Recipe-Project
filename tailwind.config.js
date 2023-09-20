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
        orange:
          "url('https://i.postimg.cc/SsnjK213/53201018528-cacd95222a-o.webp')",
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
