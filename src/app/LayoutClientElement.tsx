'use client'

import React from 'react'
import { Flex } from '@chakra-ui/react'

const LayoutClientElement = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w="100%" minH="100vh" maxH="100%" direction={{ base: 'column', md: 'row' }}>
      {children}
    </Flex>
  )
}

export default LayoutClientElement
