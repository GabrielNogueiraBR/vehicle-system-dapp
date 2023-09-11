'use client'

import React from 'react'
import { VStack } from '@chakra-ui/react'
import { NavLink } from './NavLink'

import { RiNftFill, RiShakeHandsLine, RiHome2Line, RiUser3Line } from 'react-icons/ri'

interface SidebarContentProps {
  isExpanded?: boolean
  onExpand?: () => void
  onMinimize?: () => void
}

const SidebarContent = ({ isExpanded = true }: SidebarContentProps) => (
  <VStack
    spacing={isExpanded ? 6 : 10}
    align={isExpanded ? 'flex-start' : 'center'}
    transition="all 500ms"
  >
    <NavLink href="/home" icon={RiHome2Line}>
      {isExpanded ? 'Início' : undefined}
    </NavLink>
    <NavLink href="/vehicles" icon={RiNftFill}>
      {isExpanded ? 'Meus Veículos' : undefined}
    </NavLink>
    <NavLink href="/contracts" icon={RiShakeHandsLine}>
      {isExpanded ? 'Meus Contratos' : undefined}
    </NavLink>
    <NavLink href="/profile" icon={RiUser3Line}>
      {isExpanded ? 'Perfil' : undefined}
    </NavLink>
  </VStack>
)

export default SidebarContent
