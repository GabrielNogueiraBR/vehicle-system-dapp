'use client'

import React from 'react'
import { Flex } from '@chakra-ui/react'

const LayoutClientElement = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex flex='1' w="100%" h="100%" direction={{ base: 'column', md: 'row' }} bg="gray.100">
      {children}
    </Flex>
  )
}

export default LayoutClientElement
