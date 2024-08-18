export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
          colors: {
            primary: {
              darkOne: '#121C2B ',
              darkTwo: '#121212 ',
              dark: '#35374B',
              Default:'#0866ff',
            },
            secondary: {
              darkOne: '#31363F',
              darkTwo: '#1c1c1c',
              darkThree: '#121C2B',
              dark: '#222831',
            },
            customGray: '#a0aec0',
            customRed: '#f56565',
            customYellow: '#ecc94b',
            darkGrey:'#292A2D'
          }, 
          keyframes: {
            slide: {
              '0%': { transform: 'translateX(0%)' },
              '100%': { transform: 'translateX(100%)' },
            },
          },
          animation: {
            slide: 'slide 5s linear 1',
          },
    
    },
  },
  plugins: [],
}
