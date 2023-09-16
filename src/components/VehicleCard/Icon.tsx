'use client'

import React, { useMemo } from 'react'
import { Flex, Img } from '@chakra-ui/react'
import { VehicleCardTheme } from './Root'

interface Props {
  theme?: VehicleCardTheme
}

const Icon = ({ theme = 'NFT' }: Props) => {
  const src = useMemo(() => {
    if (theme === 'request-pending') return '/vehicle-request.png'
    if (theme === 'request-approved') return '/vehicle-request-approved.png'
    return '/vehicle-nft.png'
  }, [theme])

  return (
    <Flex w="3xs" h="15.0625rem" justify="center">
      <Img
        w="auto"
        h="auto"
        objectFit="contain"
        src={src}
        alt={`vehicle ${theme}`}
        loading="lazy"
      />
    </Flex>
  )
}

export default Icon
