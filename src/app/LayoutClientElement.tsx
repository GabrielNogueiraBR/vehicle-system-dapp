'use client'

import React from 'react'
import { Flex } from '@chakra-ui/react'

const LayoutClientElement = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w="100%" h="auto" minH='100vh' maxW='100vw' direction={{ base: 'column', md: 'row' }} overflowY='auto' bg="gray.100">
      {children}
    </Flex>
  )
}

export default LayoutClientElement
