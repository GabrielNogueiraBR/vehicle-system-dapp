'use client'

import React from 'react'
import { Button, Text, ButtonProps, Icon } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'

interface Props extends ButtonProps {
  hideTextOnSmallScreen?: boolean
  children: React.ReactNode
}

const CreateButton = ({ hideTextOnSmallScreen = false, children, ...rest }: Props) => {
  return (
    <Button variant="primary" gap="2" {...rest}>
      <Icon as={BiPlus} fontSize="2xl" />
      <Text display={hideTextOnSmallScreen ? { base: 'none', md: 'flex' } : undefined}>
        {children}
      </Text>
    </Button>
  )
}

export default CreateButton
