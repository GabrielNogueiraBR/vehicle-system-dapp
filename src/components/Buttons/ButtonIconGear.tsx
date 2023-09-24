'use client'
import React from 'react'
import { Button, ButtonProps, Icon } from '@chakra-ui/react'
import GearAdd from '../Icons/GearAdd'

const ButtonIconGear = ({ ...rest }: ButtonProps) => {
  return (
    <Button
      colorScheme="none"
      bg="transparent"
      p={0}
      m={0}
      w="8"
      h="8"
      minW={0}
      minH={0}
      aspectRatio={1}
      {...rest}
    >
      <Icon as={GearAdd} fontSize="2xl" color="secondary" />
    </Button>
  )
}

export default ButtonIconGear
