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
    <React.Fragment>
      <Sidebar />
      <Flex flex="1" direction="column" py="6" px={{ base: 4, md: 10 }}>
        {children}
      </Flex>
    </React.Fragment>
  )
}

export default LayoutClientElement
