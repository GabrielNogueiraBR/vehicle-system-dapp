'use client'

import React from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

interface Props extends IconProps {}

const DocumentDownload = ({ ...rest }: Props) => {
  return (
    <Icon {...rest}>
      <svg viewBox="0 0 27 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.5859 12.9934V22.7434V12.9934ZM13.5859 22.7434L8.71094 17.8684L13.5859 22.7434ZM13.5859 22.7434L18.4609 17.8684L13.5859 22.7434ZM21.7109 30.8684H5.46094C3.66601 30.8684 2.21094 29.4134 2.21094 27.6184V4.86842C2.21094 3.0735 3.66601 1.61842 5.46094 1.61842H14.5379C14.9688 1.61842 15.3822 1.78963 15.6869 2.09437L24.485 10.8925C24.7897 11.1972 24.9609 11.6105 24.9609 12.0415V27.6184C24.9609 29.4134 23.5059 30.8684 21.7109 30.8684Z"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Icon>
  )
}

export default DocumentDownload
