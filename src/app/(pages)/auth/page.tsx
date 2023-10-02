'use client'

import React from 'react'
import { Center, Flex, Heading, Text } from '@chakra-ui/react'
import ConnectButton from '@/components/ConnectButton'
import { useEthers } from '@usedapp/core'
import { redirect, useSearchParams } from 'next/navigation'

const AuthPage = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('callbackUrl') || '/home'
  const callbackUrl = decodeURIComponent(search)

  const { account, isLoading } = useEthers()

  if (account && !isLoading) redirect(callbackUrl)

  return (
    <Center flex="1" w="100%" h="100%">
      <Flex
        direction="column"
        justify="center"
        align="center"
        boxShadow="2xl"
        rounded="2xl"
        bg="white"
        p="6"
        gap="4"
        maxW="sm"
      >
        <Heading>Login</Heading>
        <Text fontSize="lg" textAlign="center">
          Faça login para continuar utilizando nossa plataforma de seguros na Blockchain.
        </Text>
        <ConnectButton colorScheme="purple" />
      </Flex>
    </Center>
  )
}

export default AuthPage
