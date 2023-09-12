'use client'

import React from 'react'
import { Flex, FlexProps, LinkBox, LinkOverlay } from '@chakra-ui/react'
import NextLink from 'next/link'

interface Props extends FlexProps {
  tokenId: string
}

const Root = ({ tokenId, children, ...rest }: Props) => {
  return (
    <LinkBox
      as={Flex}
      rounded="xl"
      w="full"
      bgGradient="linear(to-r, #8B65FE, #4DFCE0)"
      p="7px"
      shadow="xl"
      {...rest}
    >
      <Flex rounded="xl" bg="white" direction="column" justify="center" align="center" p="6">
        <LinkOverlay as={NextLink} href={`/vehicles/${tokenId}`}>
          {children}
        </LinkOverlay>
      </Flex>
    </LinkBox>
  )
}

export default Root
