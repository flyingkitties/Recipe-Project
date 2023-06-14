const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      outlineWidth: {
        0.1: '0.1px',
      },
      rotate: {
        360: '360deg',
      },
      display: ['group-hover'],
      backgroundImage: {
        flower:
          "url('https://live.staticflickr.com/65535/52753526488_abcdb9060f_k.jpg')",
        orange:
          "url('https://live.staticflickr.com/65535/52764822208_5a7e6ff762_o.jpg')",
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
