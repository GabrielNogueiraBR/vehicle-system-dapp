'use client'

import React from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

interface Props extends IconProps {}

const HistoryIcon = ({ ...rest }: Props) => {
  return (
    <Icon {...rest}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 51" fill="none">
        <path
          d="M34.85 7.0125C26.5625 2.3375 16.3625 3.825 9.77502 10.2V6.375C9.77502 5.1 8.92502 4.25 7.65002 4.25C6.37502 4.25 5.52502 5.1 5.52502 6.375V15.9375C5.52502 17.2125 6.37502 18.0625 7.65002 18.0625H17.2125C18.4875 18.0625 19.3375 17.2125 19.3375 15.9375C19.3375 14.6625 18.4875 13.8125 17.2125 13.8125H12.1125C15.0875 10.4125 19.55 8.5 24.4375 8.5C33.7875 8.5 41.4375 16.15 41.4375 25.5C41.4375 34.85 33.7875 42.5 24.4375 42.5C23.1625 42.5 22.3125 43.35 22.3125 44.625C22.3125 45.9 23.1625 46.75 24.4375 46.75C32.0875 46.75 39.1 42.7125 42.925 36.125C48.6625 25.925 45.05 12.9625 34.85 7.0125ZM24.225 17C22.95 17 22.1 17.85 22.1 19.125V25.5C22.1 26.775 22.95 27.625 24.225 27.625H28.475C29.75 27.625 30.6 26.775 30.6 25.5C30.6 24.225 29.75 23.375 28.475 23.375H26.35V19.125C26.35 17.85 25.5 17 24.225 17Z"
          fill="currentColor"
        />
      </svg>
    </Icon>
  )
}

export default HistoryIcon