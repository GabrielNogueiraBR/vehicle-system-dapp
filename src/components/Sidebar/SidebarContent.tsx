'use client'

import React from 'react'
import { VStack } from '@chakra-ui/react'
import { NavLink } from './NavLink'

import { RiShakeHandsLine } from 'react-icons/ri'
import VehicleOcta from '../Icons/VehicleOcta'
import HomeRounded from '../Icons/HomeRounded'
import ProfileRounded from '../Icons/ProfileRounded'

interface SidebarContentProps {
  isExpanded?: boolean
  onExpand?: () => void
  onMinimize?: () => void
}

const SidebarContent = ({ isExpanded = true }: SidebarContentProps) => (
  <VStack
    spacing={isExpanded ? 8 : 10}
    align={isExpanded ? 'flex-start' : 'center'}
    transition="all 500ms"
  >
    <NavLink href="/home" icon={HomeRounded}>
      {isExpanded ? 'Início' : undefined}
    </NavLink>
    <NavLink href="/vehicles" icon={VehicleOcta}>
      {isExpanded ? 'Meus Veículos' : undefined}
    </NavLink>
    <NavLink href="/contracts" icon={RiShakeHandsLine}>
      {isExpanded ? 'Meus Contratos' : undefined}
    </NavLink>
    <NavLink href="/profile" icon={ProfileRounded}>
      {isExpanded ? 'Perfil' : undefined}
    </NavLink>
  </VStack>
)

export default SidebarContent
