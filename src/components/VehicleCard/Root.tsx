'use client'

import React from 'react'
import { Flex, FlexProps, LinkBox, LinkOverlay } from '@chakra-ui/react'
import NextLink from 'next/link'
import FramerMotionBox from '../FramerMotionBox'

export type VehicleCardTheme = 'NFT' | 'request-pending' | 'request-approved'

interface Props extends FlexProps {
  tokenId?: string
  theme?: VehicleCardTheme
}

const Root = ({ tokenId, theme = 'NFT', children, ...rest }: Props) => {
  return (
    <FramerMotionBox
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
      // @ts-ignore no problem in operation, although type error appears.
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      <Flex
        as={tokenId ? LinkBox : undefined}
        rounded="xl"
        w="full"
        bgGradient="linear(to-r, #8B65FE, #4DFCE0)"
        bg={theme === 'NFT' ? undefined : theme === 'request-pending' ? '#8B66D7' : '#379FEA'}
        p="7px"
        shadow="xl"
        cursor="pointer"
        userSelect={'none'}
        {...rest}
      >
        <Flex rounded="xl" bg="white" direction="column" justify="center" align="center" p="6">
          {tokenId ? (
            <LinkOverlay as={NextLink} href={`/vehicles/${tokenId}`}>
              {children}
            </LinkOverlay>
          ) : (
            children
          )}
        </Flex>
      </Flex>
    </FramerMotionBox>
  )
}

export default Root
