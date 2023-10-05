'use client'

import React from 'react'
import { Center, Heading } from '@chakra-ui/react'
import Welcome from '@/components/Assets/Welcome'
import Shortcuts from './components/Shortcuts'

const ClientComponent = () => {
  return (
    <Center
        flex="1"
        flexDirection="column"
        w="100%"
        gap="8"
      >
        <Welcome color="primary" w="2xl"/>
        <Heading as="h3" size='3xl'>Bem vindo!</Heading>
        <Shortcuts />
      </Center>
  )
}

export default ClientComponent
