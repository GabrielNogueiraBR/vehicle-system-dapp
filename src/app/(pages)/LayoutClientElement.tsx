'use client'

import React from 'react'
import { Flex } from '@chakra-ui/react'

const LayoutClientElement = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      flex="1"
      maxW="100vw"
      maxH={{ base: '100%', sm: '100%', md: '100vh' }}
      overflowY={{ base: 'auto', md: 'hidden' }}
      direction={{ base: 'column', md: 'row' }}
    >
      {children}
    </Flex>
  )
}

export default LayoutClientElement
