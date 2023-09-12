'use client'

import React, { useMemo } from 'react'
import { Flex, VStack } from '@chakra-ui/react'
import { NavLink } from './NavLink'

import { RiShakeHandsLine } from 'react-icons/ri'
import VehicleOcta from '../Icons/VehicleOcta'
import HomeRounded from '../Icons/HomeRounded'
import ProfileRounded from '../Icons/ProfileRounded'
import { usePathname } from 'next/navigation'

interface SidebarContentProps {
  isExpanded?: boolean
  onExpand?: () => void
  onMinimize?: () => void
  onNavClick?: () => void
}

const SidebarContent = ({ isExpanded = true, onNavClick }: SidebarContentProps) => {
  const pathname = usePathname()

  const links: { title: string; icon: React.ElementType; href: string }[] = useMemo(
    () => [
      { title: 'Início', icon: HomeRounded, href: '/home' },
      { title: 'Meus Veículos', icon: VehicleOcta, href: '/vehicles' },
      { title: 'Meus Contratos', icon: RiShakeHandsLine, href: '/contracts' },
      { title: 'Perfil', icon: ProfileRounded, href: '/profile' },
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
