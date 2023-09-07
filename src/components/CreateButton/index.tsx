'use client'

import React from 'react'
import { Button, Text, ButtonProps, Icon } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'

interface Props extends ButtonProps {
  hideTextOnSmallScreen?: boolean
  children: React.ReactNode
}

const CreateButton = ({ hideTextOnSmallScreen = true, children, ...rest }: Props) => {
  return (
    <Button colorScheme="green" fontSize="md" justifySelf="flex-end" mx="4" gap="2" {...rest}>
      <Icon as={BiPlus} fontSize="xl" />
      <Text display={hideTextOnSmallScreen ? { base: 'none', md: 'flex' } : undefined}>
        {children}
      </Text>
    </Button>
  )
}

export default CreateButton
