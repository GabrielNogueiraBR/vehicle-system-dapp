'use client'

import Sidebar from '@/components/Sidebar'
import { Flex } from '@chakra-ui/react'

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex w="100%" minH="100%" maxH="100%" direction={{ base: 'column', md: 'row' }}>
      <Sidebar />
      {children}
    </Flex>
  )
}
