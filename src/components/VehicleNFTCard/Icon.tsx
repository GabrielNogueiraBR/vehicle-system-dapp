'use client'

import React from 'react'
import { Flex, Image } from '@chakra-ui/react'

interface Props {
  status?: 'nft' | 'request' | 'request-approved'
}

const Icon = ({ status = 'nft' }: Props) => {
  return (
    <Flex w="3xs">
      <Image src={`/vehicle-${status}.png`} alt={`vehicle ${status}`} />
    </Flex>
  )
}

export default Icon
