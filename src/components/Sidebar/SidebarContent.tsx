'use client'

import React from 'react'
import { VStack } from '@chakra-ui/react'
import { NavLink } from './NavLink'

import { RiNftFill, RiShakeHandsLine } from 'react-icons/ri'

interface SidebarContentProps {
  isExpanded?: boolean
}

const SidebarContent = ({ isExpanded = true }: SidebarContentProps) => (
  <VStack spacing={6} align='flex-start'>
    <NavLink href="/vehicles" icon={RiNftFill}>
      Meus Veículos
    </NavLink>
    <NavLink href="/contracts" icon={RiShakeHandsLine}>
      Meus Contratos
    </NavLink>
  </VStack>
)

export default SidebarContent
