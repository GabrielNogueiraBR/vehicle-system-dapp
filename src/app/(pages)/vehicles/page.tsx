'use client'

import React from 'react'
import { Button, Center, Heading, Icon, Img } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'

const Page = () => {
  return (
    <Center flexDirection="column" gap="4" w="100%">
      <Img src="/no-vehicles.svg" w="sm" alt="no vehicles" loading="lazy" aspectRatio={1} />
      <Heading as="h3">Sem veículos cadastrados</Heading>
      <Button colorScheme="green" fontSize="lg" leftIcon={<Icon as={BiPlus} fontSize="2xl" />}>
        Novo veículo
      </Button>
    </Center>
  )
}

export default Page
