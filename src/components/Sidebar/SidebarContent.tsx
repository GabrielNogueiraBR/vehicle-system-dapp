'use client'

import React, { useMemo } from 'react'
import { Flex, VStack } from '@chakra-ui/react'
import { NavLink } from './NavLink'

import { RiShakeHandsLine } from 'react-icons/ri'
import VehicleOcta from '../Icons/VehicleOcta'
import HomeRounded from '../Icons/HomeRounded'
import { usePathname } from 'next/navigation'
import VehicleRequest from '../Assets/VehicleRequest'

type LinkInfo = {
  role: 'user' | 'agent' | 'insurer'
  title: string
  icon: React.ElementType
  href: string
}

interface SidebarContentProps {
  isExpanded?: boolean
  onExpand?: () => void
  onMinimize?: () => void
  onNavClick?: () => void
}

const SidebarContent = ({ isExpanded = true, onNavClick }: SidebarContentProps) => {
  const pathname = usePathname()

  const links: LinkInfo[] = useMemo(
    () => [
      { title: 'Início', icon: HomeRounded, href: '/home', role: 'user' },
      { title: 'Meus Veículos', icon: VehicleOcta, href: '/vehicles', role: 'user' },
      { title: 'Meus Contratos', icon: RiShakeHandsLine, href: '/contracts', role: 'user' },
      {
        title: 'Solicitações de Veículos',
        icon: VehicleRequest,
        href: '/contracts',
        role: 'agent',
      },
      {
        title: 'Contratos de veículos',
        icon: RiShakeHandsLine,
        href: '/contracts',
        role: 'insurer',
      },
      {
        title: 'Solicitações de contratos',
        icon: RiShakeHandsLine,
        href: '/contracts',
        role: 'insurer',
      },
    ],
    []
  )

  const indexActive = links.findIndex((lnk) => pathname.startsWith(String(lnk.href)))

  return (
    <VStack
      position="relative"
      spacing={10}
      px={6}
      align={isExpanded ? 'flex-start' : 'center'}
      transition="all 500ms"
    >
      <Flex
        position="absolute"
        w="4px"
        h="35px"
        bg="primary"
        right={0}
        top={0}
        transform={`translate(0,${indexActive * 35 + indexActive * 40}px)`}
        transition="all 250ms"
      />
      {links.map((lnk) => (
        <NavLink key={lnk.href} href={lnk.href} icon={lnk.icon} onClick={onNavClick}>
          {isExpanded ? lnk.title : undefined}
        </NavLink>
      ))}
    </VStack>
  )
}

export default SidebarContent
