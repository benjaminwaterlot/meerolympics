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
    transform: {
      // defaults to this value
      none: 'none'
    },
    transformOrigin: {
      // defaults to these values
      t: 'top',
      tr: 'top right',
      r: 'right',
      br: 'bottom right',
      b: 'bottom',
      bl: 'bottom left',
      l: 'left',
      tl: 'top left'
    },
    translate: {
      // defaults to {}
      '1/2': '50%',
      full: '100%',
      'right-up': ['100%', '-100%'],
      '3d': ['40px', '-60px', '-130px']
    },
    scale: {
      // defaults to {}
      '90': '0.9',
      '100': '1',
      '110': '1.1',
      '-100': '-1',
      'stretched-x': ['2', '0.5'],
      'stretched-y': ['0.5', '2'],
      '3d': ['0.5', '1', '2']
    },
    rotate: {
      // defaults to {}
      '90': '90deg',
      '180': '180deg',
      '270': '270deg',
      '3d': ['0', '1', '0.5', '45deg']
    },
    skew: {
      // defaults to {}
      '-5': '-5deg',
      '5': '5deg'
    },
    perspective: {
      // defaults to {}
      none: 'none',
      '250': '250px',
      '500': '500px',
      '750': '750px',
      '1000': '1000px'
    },
    perspectiveOrigin: {
      // defaults to these values
      t: 'top',
      tr: 'top right',
      r: 'right',
      br: 'bottom right',
      b: 'bottom',
      bl: 'bottom left',
      l: 'left',
      tl: 'top left'
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
    transform: ['responsive'],
    transformOrigin: ['responsive'],
    translate: ['responsive'],
    scale: ['responsive'],
    rotate: ['responsive'],
    skew: ['responsive'],
    perspective: ['responsive'],
    perspectiveOrigin: ['responsive'],
    transformStyle: ['responsive'],
    backfaceVisibility: ['responsive'],
    transformBox: ['responsive'],

    // all the following default to ['responsive']
    transitionProperty: ['responsive'],
    transitionDuration: ['responsive'],
    transitionTimingFunction: ['responsive'],
    transitionDelay: ['responsive'],
    willChange: ['responsive']
  },
  plugins: [
    require('tailwindcss-transitions')(),
    require('tailwindcss-transforms')({
      '3d': false // defaults to false
    })
  ]
}
