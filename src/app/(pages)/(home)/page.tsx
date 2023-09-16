'use client'

import { Center, Flex } from '@chakra-ui/react'
import ConnectButton from '@/components/ConnectButton'

export default function Home() {
  return (
    <Flex
      flex="1"
      w="100%"
      h="100%"
      direction="column"
      justify="flex-start"
      align="center"
      gap="4"
      paddingTop="4"
    >
      <Center flex="1">
        <ConnectButton />
      </Center>
    </Flex>
  )
}
