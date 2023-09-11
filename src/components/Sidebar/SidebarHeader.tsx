'use client'

import React from 'react'
import { Heading, VStack, Text, Avatar, Image } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'

interface SidebarHeaderProps {
  isExpanded?: boolean
}

const SidebarHeader = ({ isExpanded = true }: SidebarHeaderProps) => {
  const { account } = useEthers()

  const regex = /^(.{7}).*(.{5})$/
  const fomartedAccount = (account || '').replace(regex, '$1...$2')

  return (
    <VStack display="flex" w="100%" spacing={6} align="center">
      <Image
        src="/logo.png"
        alt="logo"
        w={isExpanded ? '12rem' : '5.125rem'}
        p="10%"
        transition="all 500ms"
      />
    </VStack>
  )
}

export default SidebarHeader
