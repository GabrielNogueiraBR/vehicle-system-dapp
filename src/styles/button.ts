import { ComponentStyleConfig } from '@chakra-ui/react'

export const ButtonStyle: ComponentStyleConfig = {
  baseStyle: {},
  defaultProps: {},
  variants: {
    outline: {
      fontSize: '1.125rem',
      fontWeight: 600,
      border: '2px solid',
      px: '2.5rem',
    },
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
    cancel: {
      bg: 'light-gray',
      color: 'white',
      fontSize: '1.125rem',
      fontWeight: 600,
      px: '2.5rem',
    },
  },
}
