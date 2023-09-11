import { extendTheme } from '@chakra-ui/react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const theme = extendTheme({
  colors: {
    primary: '#8B65FE',
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
          justifySelf: 'flex-end',
          shadow: 'lg',
        },
      },
    },
  },
})
