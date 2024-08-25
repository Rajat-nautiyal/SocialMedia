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
            darkGrey:'#292A2D'
          }, 
          screens: {
            'mob': { 'max': '480px' },
            'max-sm': { 'max': '640px' },
            'max-md': { 'max': '768px' },
            'max-tl': { 'min': '769px','max':'1000px' },
          },      
          fontFamily: {
            roboto: ['Roboto', 'sans-serif'],
            poppins:'Poppins',
            montserrat:'Montserrat',
            inter:'Inter'
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
