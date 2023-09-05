'use client'

import React from 'react'
import { Center, Flex } from '@chakra-ui/react'
import ConnectButton from '@/components/ConnectButton'
import { useEthers } from '@usedapp/core'
import { redirect } from 'next/navigation'

const AuthPage = () => {
  const { account, isLoading } = useEthers()

  if (account && !isLoading) redirect('/')

  return (
    <Center w="100%">
      <Flex p="4" shadow="2xl" borderRadius={6}>
        <ConnectButton colorScheme="green" />
      </Flex>
    </Center>
  )
}

export default AuthPage
