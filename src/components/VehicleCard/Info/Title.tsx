'use client'

import React from 'react'
import { Flex, FlexProps, Text } from '@chakra-ui/react'

interface Props extends FlexProps {}

const Title = ({ children, ...rest }: Props) => {
  return (
    <Flex w="80%" maxW="80%" color="dark" fontWeight={700} fontSize="2xl" {...rest}>
      <Text w="100%" maxWidth="100%" noOfLines={1}>
        {children}
      </Text>
    </Flex>
  )
}

export default Title
