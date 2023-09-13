'use client'

import React from 'react'
import {
  useDisclosure,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  IconButton,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { IoMdMenu } from 'react-icons/io'
import SidebarHeader from './SidebarHeader'
import SidebarContent from './SidebarContent'
import SidebarFooter from './SidebarFooter'

const Sidebar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { isOpen: isExpanded, onOpen: onExpand, onClose: onMinimize } = useDisclosure()

  const isSmallScreen = useBreakpointValue({ base: true, sm: true, md: false })

  if (isSmallScreen)
    return (
      <>
        <IconButton
          variant="outline"
          colorScheme="gray"
          icon={<IoMdMenu />}
          aria-label="Open menu"
          w="fit-content"
          onClick={onOpen}
          m={4}
        />
        <Drawer isOpen={isOpen} onClose={onClose} placement="left">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>
              <SidebarHeader />
            </DrawerHeader>
            <DrawerBody px={0}>
              <SidebarContent onNavClick={onClose} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )

  return (
    <Flex maxW="18rem" minH="100vh" direction="column" gap="10" py={6} shadow="sm" bg="white">
      <SidebarHeader isExpanded={isExpanded} />
      <SidebarContent isExpanded={isExpanded} />
      <Spacer />
      <SidebarFooter isExpanded={isExpanded} onExpand={onExpand} onMinimize={onMinimize} />
    </Flex>
  )
}

export default Sidebar
