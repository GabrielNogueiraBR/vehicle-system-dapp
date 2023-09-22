'use client'

import React from 'react'
import Sidebar from '@/components/Sidebar'
import { Flex } from '@chakra-ui/react'
import { AuthProvider } from '@/contexts/AuthContext'

const LayoutClientElement = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}

export default LayoutClientElement
