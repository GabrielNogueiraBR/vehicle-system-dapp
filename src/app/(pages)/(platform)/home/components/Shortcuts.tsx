'use client'

import React, { useMemo } from 'react'
import { ButtonGroup, Flex } from '@chakra-ui/react'
import ShortcutButton from './ShortcutButton'
import { useAuth } from '@/contexts/AuthContext'
import { Role } from '@/types'
import { Link as ChakraLink } from '@chakra-ui/next-js'

type LinkInfo = {
  title: string
  href: string
  role: Role
}

const Shortcuts = () => {
  const { roles } = useAuth()

  const shortcutLinks: LinkInfo[] = useMemo(
    () => [
      { title: 'Meus Veículos', href: '/vehicles', role: 'user' },
      { title: 'Meus Contratos', href: '/user/contracts', role: 'user' },
      {
        title: 'Solicitações de Veículos',
        href: '/agent/requests',
        role: 'agent',
      },
      {
        title: 'Contratos de veículos',
        href: '/insurer/contracts',
        role: 'insurer',
      },
      {
        title: 'Solicitações de contratos',
        href: '/insurer/requests',
        role: 'insurer',
      },
    ],
    []
  )

  const userLinks = useMemo(
    () => shortcutLinks.filter((lnk) => roles.includes(lnk.role)),
    [roles, shortcutLinks]
  )

  return (
    <Flex>
      <ButtonGroup variant="outline" spacing="6">
        {userLinks.map((lnk) => (
          <ChakraLink key={lnk.href} href={lnk.href}>
            <ShortcutButton>{lnk.title}</ShortcutButton>
          </ChakraLink>
        ))}
      </ButtonGroup>
    </Flex>
  )
}

export default Shortcuts
