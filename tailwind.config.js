module.exports = {
  important: true,
  theme: {
    extend: {
      colors: {
        green: {
          '100': '#ebf8f6',
          '200': '#ebf8f6',
          '300': '#bfe8e4',
          '400': '#80d1ca',
          '500': '#00a295',
          '600': '#00847a',
          '700': '#00847a',
          '800': '#00847a',
          '900': '#00847a'
        }
      }
    },
    fontFamily: {
      display: ['Avenir', 'sans-serif'],
      body: ['Avenir', 'sans-serif']
    },
    // Transition plugin
    transitionProperty: {
      // defaults to these values
      none: 'none',
      all: 'all',
      color: 'color',
      bg: 'background-color',
      border: 'border-color',
      colors: ['color', 'background-color', 'border-color'],
      opacity: 'opacity',
      transform: 'transform'
    },
    transitionDuration: {
      // defaults to these values
      default: '250ms',
      '0': '0ms',
      '100': '100ms',
      '250': '250ms',
      '500': '500ms',
      '750': '750ms',
      '1000': '1000ms'
    },
    transitionTimingFunction: {
      // defaults to these values
      default: 'ease',
      linear: 'linear',
      ease: 'ease',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out',
      'ease-in-out': 'ease-in-out'
    },
    transitionDelay: {
      // defaults to these values
      default: '0ms',
      '0': '0ms',
      '100': '100ms',
      '250': '250ms',
      '500': '500ms',
      '750': '750ms',
      '1000': '1000ms'
    },
    willChange: {
      // defaults to these values
      auto: 'auto',
      scroll: 'scroll-position',
      contents: 'contents',
      opacity: 'opacity',
      transform: 'transform'
    }
  },
  variants: {
    // all the following default to ['responsive']
    transitionProperty: ['responsive'],
    transitionDuration: ['responsive'],
    transitionTimingFunction: ['responsive'],
    transitionDelay: ['responsive'],
    willChange: ['responsive']
  },
  plugins: [require('tailwindcss-transitions')()]
}
