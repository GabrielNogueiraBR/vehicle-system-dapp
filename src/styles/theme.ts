import { extendTheme } from '@chakra-ui/react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const theme = extendTheme({
  colors: {
    primary: '#8B65FE',
    secondary: '#448DEB',
    dark: '#3C3C3C',
    'light-green': '#CBFFFA',
    'dark-green': '#03DCC7',
    'light-gray': '#7D7D7D',
  },
  fonts: {
    heading: inter.style.fontFamily,
    body: inter.style.fontFamily,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.100',
        color: 'gray.800',
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
