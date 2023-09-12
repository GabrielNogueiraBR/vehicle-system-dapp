'use client'

import React from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'

interface Props extends FlexProps {}

const Root = ({ children, ...rest }: Props) => {
  return (
    <Flex
      position="relative"
      p="1"
      gap="0.5"
      w="full"
      direction="column"
      shadow="xl"
      rounded="xl"
      border="1px solid"
      borderColor="dark-green"
      background="rgba(217, 217, 217, 0.26)"
      backdropFilter="blur(13px)"
      marginTop="-30px"
      {...rest}
    >
      {children}
    </Flex>
  )
}

export default Root
