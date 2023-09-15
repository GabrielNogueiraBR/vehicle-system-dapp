'use client'

import React from 'react'
import Sidebar from '@/components/Sidebar'
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
      <Sidebar />
      <Flex
        flex="1"
        direction="column"
        py="6"
        maxH={{ base: '100%', sm: '100%', md: '100vh' }}
        overflowY={{ base: 'hidden', md: 'auto' }}
        px={{ base: 4, md: 10 }}
      >
        {children}
      </Flex>
    </Flex>
  )
}

export default LayoutClientElement
