'use client'

import { Flex, Text } from '@chakra-ui/react'
import ConnectButton from '@/components/ConnectButton'

export default function Home() {
  return (
    <Flex gap="4">
      <Text>Olá mundo</Text>
      <ConnectButton />
    </Flex>
  )
}
