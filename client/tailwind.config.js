module.exports = {
  // In your tailwind.config.js file, configure the purge option with the paths to all of your components so Tailwind can tree-shake unused styles in production builds:
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  theme: {
    fontSize: {
     'xs': '.75rem',
     'sm': '.875rem',
     'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
     '3xl': '1.875rem',
     '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
     '7xl': '5rem',
     '7.1xl': '5.1rem'
    }
  }
}
