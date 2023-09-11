'use client'

import React from 'react'
import { Button, Icon, VStack, Text } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import LogoutRounded from '../Icons/LogoutRounded'

interface SidebarFooterProps {
  isExpanded?: boolean
  onExpand?: () => void
  onMinimize?: () => void
}

const SidebarFooter = ({ isExpanded = true, onExpand, onMinimize }: SidebarFooterProps) => {
  const { deactivate } = useEthers()

  return (
    <VStack spacing={6} px={6} align={isExpanded ? 'flex-start' : 'center'} transition="all 500ms">
      <Button
        variant="ghost"
        w="fit-content"
        justifyContent={isExpanded ? 'flex-start' : 'center'}
        paddingLeft={0}
        _hover={{ bg: 'transparent', color: 'red.500' }}
        _active={{ bg: 'transparent', color: 'red.700' }}
        onClick={isExpanded ? onMinimize : onExpand}
      >
        <Icon
          as={LogoutRounded}
          fontSize="35"
          sx={{ transform: isExpanded ? 'scaleX(-1)' : undefined }}
        />
        <Text ml="4" fontSize="xl" fontWeight="medium" display={isExpanded ? 'flex' : 'none'}>
          Minimizar
        </Text>
      </Button>
    </VStack>
  )
}

export default SidebarFooter
