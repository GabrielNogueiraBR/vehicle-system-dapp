'use client'

import React from 'react'
import { Heading, VStack, Text, Avatar } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'

const SidebarHeader = () => {
  const { account } = useEthers()

  const regex = /^(.{7}).*(.{5})$/
  const fomartedAccount = (account || '').replace(regex, '$1...$2')

  return (
    <VStack spacing={6} align="center">
      <Heading>Site</Heading>
      <Avatar size="2xl" name="Logo" />
      <Text>{fomartedAccount}</Text>
    </VStack>
  )
}

export default SidebarHeader
