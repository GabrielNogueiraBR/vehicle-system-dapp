'use client'
import React from 'react'
import { Button, ButtonProps, Icon } from '@chakra-ui/react'
import { TbEye } from 'react-icons/tb'

const ButtonEye = ({ ...rest }: ButtonProps) => {
  return (
    <Button
      colorScheme="none"
      bg="light-gray"
      p={0}
      m={0}
      w="8"
      h="8"
      minW={0}
      minH={0}
      aspectRatio={1}
      {...rest}
    >
      <Icon as={TbEye} fontSize="xl" color="white" />
    </Button>
  )
}

export default ButtonEye
