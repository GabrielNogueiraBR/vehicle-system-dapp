'use client'

import React from 'react'
import ShieldCheck from '@/components/Icons/ShieldCheck'
import { IconProps } from '@chakra-ui/react'

interface Props extends IconProps {}

const InsuredBadge = ({ ...rest }: Props) => {
  return (
    <ShieldCheck
      position="absolute"
      top={0}
      right={0}
      color="primary"
      fontSize="1.75rem"
      marginTop="1.5"
      marginRight="1.5"
      {...rest}
    />
  )
}

export default InsuredBadge
