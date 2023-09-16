'use client'

import React from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'

interface Props extends FlexProps {}

const SubTitle = ({ children, ...rest }: Props) => {
  return (
    <Flex color="dark" gap="9" fontWeight={500} fontSize="lg" {...rest}>
      {children}
    </Flex>
  )
}

export default SubTitle
