'use client'

import React from 'react'
import { Button, Icon, VStack, Text } from '@chakra-ui/react'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { useEthers } from '@usedapp/core'

const SidebarFooter = () => {
  const { deactivate } = useEthers()

  return (
    <VStack spacing={6} align="flex-start">
      <Button
        variant="ghost"
        w="fit-content"
        justifyContent="flex-start"
        paddingLeft={0}
        _hover={{ bg: 'transparent', color: 'red.500' }}
        _active={{ bg: 'transparent', color: 'red.700' }}
        onClick={deactivate}
      >
        <Icon as={RiLogoutBoxRLine} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          Sair
        </Text>
      </Button>
    </VStack>
  )
}

export default SidebarFooter
