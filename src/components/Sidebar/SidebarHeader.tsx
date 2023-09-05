'use client'

import React from 'react'
import { Heading, VStack, Text, Avatar } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'

const SidebarHeader = () => {
  const { account } = useEthers()

  const regex = /^(.{7}).*(.{5})$/
  const fomartedAccount = account!.replace(regex, '$1...$2')

  return (
    <VStack spacing={6} align="flex-start">
      <Heading>Logo</Heading>
      <Avatar alignSelf="center" size="2xl" name="Logo" />
      <Text alignSelf="center">{fomartedAccount}</Text>
    </VStack>
  )
}

export default SidebarHeader
