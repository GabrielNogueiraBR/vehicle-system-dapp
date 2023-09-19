'use client'

import React from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

interface Props extends IconProps {}

const DocumentPlus = ({ ...rest }: Props) => {
  return (
    <Icon {...rest}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 32" fill="none">
        <path
          d="M8.33333 17.8333H17.8333H8.33333ZM13.0833 13.0833V22.5833V13.0833ZM21 30.5H5.16667C3.41776 30.5 2 29.0823 2 27.3333V5.16667C2 3.41776 3.41776 2 5.16667 2H14.0108C14.4307 2 14.8335 2.16682 15.1304 2.46374L23.7029 11.0363C23.9998 11.3332 24.1667 11.7359 24.1667 12.1558V27.3333C24.1667 29.0823 22.7489 30.5 21 30.5Z"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Icon>
  )
}

export default DocumentPlus
