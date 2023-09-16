'use client'

import React from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'

interface Props extends FlexProps {}

const Title = ({ children, ...rest }: Props) => {
  return (
    <Flex color="dark" fontWeight={700} fontSize="2xl" {...rest}>
      {children}
    </Flex>
  )
}

export default Title
