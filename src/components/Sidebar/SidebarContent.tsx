'use client'

import React, { useMemo } from 'react'
import { Flex, VStack } from '@chakra-ui/react'
import { NavLink } from './NavLink'

import { RiShakeHandsLine } from 'react-icons/ri'
import { VscRequestChanges } from 'react-icons/vsc'
import VehicleOcta from '../Icons/VehicleOcta'
import HomeRounded from '../Icons/HomeRounded'
import { usePathname } from 'next/navigation'
import VehicleRequest from '../Assets/VehicleRequest'
import VehicleDocument from '../Icons/VehicleDocument'
import { useAuth } from '@/contexts/AuthContext'
import { Role } from '@/types'

type LinkInfo = {
  role: Role
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
  const { roles } = useAuth()
  const pathname = usePathname()

  const links: LinkInfo[] = useMemo(
    () => [
      { title: 'Início', icon: HomeRounded, href: '/home', role: 'user' },
      { title: 'Meus Veículos', icon: VehicleOcta, href: '/vehicles', role: 'user' },
      { title: 'Meus Contratos', icon: RiShakeHandsLine, href: '/user/contracts', role: 'user' },
      {
        title: 'Solicitações de Veículos',
        icon: VehicleRequest,
        href: '/agent/requests',
        role: 'agent',
      },
      {
        title: 'Contratos de veículos',
        icon: VehicleDocument,
        href: '/insurer/contracts',
        role: 'insurer',
      },
      {
        title: 'Solicitações de contratos',
        icon: VscRequestChanges,
        href: '/insurer/requests',
        role: 'insurer',
      },
    ],
    []
  )

  const userLinks = useMemo(() => links.filter((lnk) => roles.includes(lnk.role)), [roles, links])
  const indexActive = userLinks.findIndex((lnk) => pathname.startsWith(String(lnk.href)))

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
      {userLinks.map((lnk) => (
        <NavLink key={lnk.href} href={lnk.href} icon={lnk.icon} onClick={onNavClick}>
          {isExpanded ? lnk.title : undefined}
        </NavLink>
      ))}
    </VStack>
  )
}

export default SidebarContent
