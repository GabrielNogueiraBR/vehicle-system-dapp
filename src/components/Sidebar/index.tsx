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

  const isSmallScreen = useBreakpointValue({ sm: true, md: false })

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
            <DrawerBody>
              <SidebarContent />
            </DrawerBody>
            <DrawerFooter>
              <SidebarFooter />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )

  return (
    <Flex
      minW="fit-content"
      maxW="20%"
      minH="100%"
      direction="column"
      gap="6"
      p="6"
      shadow="sm"
      bg="white"
    >
      <SidebarHeader />
      <SidebarContent />
      <Spacer />
      <SidebarFooter />
    </Flex>
  )
}

export default Sidebar
