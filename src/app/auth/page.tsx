'use client'

import React from 'react'
import { Center, Flex, Heading } from '@chakra-ui/react'
import ConnectButton from '@/components/ConnectButton'
import { useEthers } from '@usedapp/core'
import { redirect } from 'next/navigation'

const AuthPage = () => {
  const { account, isLoading } = useEthers()

  if (account && !isLoading) redirect('/')

  return (
    <Center w="100%">
      <Flex
        direction="column"
        justify="center"
        align="center"
        boxShadow="2xl"
        rounded="md"
        bg="white"
        p="6"
        gap="4"
      >
        <Heading>Login</Heading>
        <ConnectButton colorScheme="green" />
      </Flex>
    </Center>
  )
}

export default AuthPage