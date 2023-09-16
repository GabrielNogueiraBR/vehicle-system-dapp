'use client'

import React from 'react'
import { Flex, FlexProps, LinkBox, LinkOverlay } from '@chakra-ui/react'
import NextLink from 'next/link'
import FramerMotionBox from '../FramerMotionBox'

interface Props extends FlexProps {
  tokenId: string
}

const Root = ({ tokenId, children, ...rest }: Props) => {
  return (
    <FramerMotionBox
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1. }}
      // @ts-ignore no problem in operation, although type error appears.
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
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
    </FramerMotionBox>
  )
}

export default Root
