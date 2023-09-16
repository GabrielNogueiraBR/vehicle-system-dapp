'use client'

import React from 'react'
import { Flex, Img } from '@chakra-ui/react'

interface Props {
  status?: 'nft' | 'request' | 'request-approved'
}

const Icon = ({ status = 'nft' }: Props) => {
  return (
    <Flex w="3xs" h="15.0625rem" justify="center">
      <Img w="auto" h="auto" src={`/vehicle-${status}.png`} alt={`vehicle ${status}`} loading='lazy' />
    </Flex>
  )
}

export default Icon
