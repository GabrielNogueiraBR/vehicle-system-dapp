'use client'

import React from 'react'
import { Center, Spinner, SpinnerProps } from '@chakra-ui/react'

interface Props extends SpinnerProps {}

const LoadingPage = ({ ...rest }: Props) => {
  return (
    <Center w="100%">
      <Spinner
        thickness="5px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        {...rest}
      />
    </Center>
  )
}

export default LoadingPage
