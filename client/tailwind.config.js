module.exports = {
  // In your tailwind.config.js file, configure the purge option with the paths to all of your components so Tailwind can tree-shake unused styles in production builds:
  purge: [],
  darkMode: false, // or 'media' or 'class'
  // theme: {
  //   extend: {},
  // },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // ...
  ],
  theme: {
    fontSize: {
     'xss': '.625rem',
     'xs': '.75rem',
     'sm': '.875rem',
     'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '1.5xl': '1.375rem',
      '2xl': '1.5rem',
     '3xl': '1.875rem',
     '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
     '7xl': '5rem',
     '7.1xl': '5.1rem'
    },
    extend: {
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      transitionProperty: {
        'height': 'height'
      },
      screens: {
        'mdlg': '900px',
        'xs': '475px',
        'xsmm': {'min': '475px', 'max': '639px', },
      },
      translate: {
        '101': '25.5rem',
        '102': '26rem',
        '103': '27.8rem',
        '104': '28.75rem',
        '105': '29rem',
        '106': '30rem',
      },
      height: {
        '0.25': '0.0625rem',
        '50': '12.5rem',
        '4.5': '1.125rem'
      },
      width: {
        '4.5': '1.125rem'
      },
      transitionTimingFunction: {
       '4sfade': 'cubic-bezier(1.00, 1.00, 1.00, 0.00)',
      },
      keyframes: {
        fadelong: {
          '0%, 100%': { opacity: 0 },
          '10%, 90%': { opacity: 1 },
        },
        roll: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '50%': { transform: 'translateX(20rem) rotate(385deg)' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animations: {
        fadelong: 'fadelong 4s ease-in-out 1',
        roll: 'roll 3s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      colors: {
        tinderblue: {
          DEFAULT: '#59b9f8'
        },
        twitterblue: {
          DEFAULT: '#243447'
        },
        twitterlogoblue: {
          DEFAULT: '#1DA1F2'
        },
        'gray-150': {
          DEFAULT: '#ECEEF1'
        },
        notestoolbar: {
          DEFAULT: '#1c1c1e'
        }
      }
    }
  }
}
