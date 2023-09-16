'use client'

import React from 'react'
import { useEthers } from '@usedapp/core'
import { redirect } from 'next/navigation'
import { Flex } from '@chakra-ui/react'

const LayoutClientElement = ({ children }: { children: React.ReactNode }) => {
  const { account, isLoading } = useEthers()
  if (!account && !isLoading) redirect('/auth')

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
