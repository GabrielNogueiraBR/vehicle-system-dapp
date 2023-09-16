'use client'

import React from 'react'
import { Center, Spinner, SpinnerProps } from '@chakra-ui/react'

interface Props extends SpinnerProps {}

const LoadingPage = ({ ...rest }: Props) => {
  return (
    <Center w="100%" h="100%" display={rest.display}>
      <Spinner
        thickness="5px"
        speed="0.65s"
        emptyColor="gray.200"
        color="primary"
        size="xl"
        {...rest}
      />
    </Center>
  )
}

export default LoadingPage
