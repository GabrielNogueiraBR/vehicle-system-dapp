'use client'

import React from 'react'
import { Heading, VStack, Text, Avatar, Image } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'

interface SidebarHeaderProps {
  isExpanded?: boolean
}

const SidebarHeader = ({ isExpanded = true }: SidebarHeaderProps) => {
  return (
    <VStack display="flex" w="100%" spacing={6} p="6" align="flex-start">
      <Image
        src="/logo.png"
        alt="logo"
        w={isExpanded ? '12rem' : '5.125rem'}
        transition="all 500ms"
      />
    </VStack>
  )
}

export default SidebarHeader
