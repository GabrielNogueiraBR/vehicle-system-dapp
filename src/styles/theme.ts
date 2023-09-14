import { extendTheme } from '@chakra-ui/react'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const theme = extendTheme({
  colors: {
    primary: '#8B65FE',
    secondary: '#448DEB',
    dark: '#3C3C3C',
    'light-green': '#CBFFFA',
    'dark-green': '#03DCC7',
    'light-gray': '#7D7D7D',
    'light-purple': '#DAD0F9',
    light: '#FFFFFF',
    'dark-purple': '#8B65D7',
    background: '#EFF3FE',
  },
  fonts: {
    heading: montserrat.style.fontFamily,
    body: montserrat.style.fontFamily,
  },
  styles: {
    global: {
      body: {
        bg: 'background',
        color: 'dark',
      },
      button: {
        _hover: { transform: 'scale(1.08)' },
        _active: { transform: 'scale(1)' },
      },
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: 'white',
          fontSize: 'md',
          fontWeight: 700,
          color: 'primary',
          borderWidth: '3px',
          borderColor: 'primary',
          borderRadius: '0.75rem',
          justifySelf: 'flex-end',
          shadow: 'lg',
        },
      },
    },
  },
})
