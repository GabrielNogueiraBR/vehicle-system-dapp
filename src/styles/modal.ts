import { ComponentStyleConfig } from '@chakra-ui/react'

export const ModalStyle: ComponentStyleConfig = {
  baseStyle: {
    overlay: {
      background: 'rgba(0, 0, 0, 0.66)',
      backdropFilter: 'blur(0px)',
    },
    dialogContainer: {},
    dialog: {
      rounded: 'xl',
      border: '4px solid',
      borderColor: 'secondary',
      background: 'light',
      px: '1.6875rem',
      py: '1.375rem',
    },
    header: {
      p: '0 0 1.5rem 0',
      m: 0,
      borderBottom: '2px',
      borderColor: '#898989',
      color: '#3D4048',
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: '150%',
    },
    body: {
      p: '1.5rem 0 0 0',
      m: 0,
      color: 'dark',
      fontSize: '1.125rem',
      fontWeight: 500,
    },
    closeButton: {},
    footer: {},
  },
  defaultProps: { size: '2xl', isCentered: true },
}
