'use client'

import { useDisclosure } from '@chakra-ui/react'
import React, { createContext, useContext } from 'react'

interface SidebarContextData {
  isOpen: boolean
  onClose: ReturnType<typeof useDisclosure>['onClose']
  onOpen: ReturnType<typeof useDisclosure>['onOpen']
}

const SidebarContext = createContext({} as SidebarContextData)

interface SidebarProviderProps {
  children: React.ReactNode
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <SidebarContext.Provider value={{ isOpen, onClose, onOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext)
