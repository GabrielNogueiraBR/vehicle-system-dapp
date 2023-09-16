'use client'

import { Button, Flex, Heading, Link } from '@chakra-ui/react'

export default function Home() {
  return (
    <Flex
      flex="1"
      w="100%"
      h="100%"
      direction="column"
      justify="center"
      align="center"
      gap="4"
      paddingTop="4"
    >
      <Heading>Entrar na plataforma</Heading>
      <Link href="/home">
        <Button colorScheme="green">Entrar</Button>
      </Link>
    </Flex>
  )
}
