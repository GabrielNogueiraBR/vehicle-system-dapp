'use client'

import React from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'

interface Props extends ButtonProps {}

const ShortcutButton = ({ children, ...rest }: Props) => {
  return (
    <Button
      colorScheme="purple"
      w="2xs"
      py="8"
      _hover={{ bg: 'purple.100' }}
      borderStyle="dashed"
      {...rest}
    >
      {children}
    </Button>
  )
}

export default ShortcutButton
