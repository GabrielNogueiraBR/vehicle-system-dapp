'use client'

import React from 'react'
import { Box, Flex } from '@chakra-ui/react'

interface Params {
  params: {
    tokenId: string
  }
}
const Page = ({ params: { tokenId } }: Params) => {
  return (
    <Flex flex="1" direction="column" justify="flex-start" align="center" gap="10" marginTop="8">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="flex-start"
        align="flex-start"
        gap="4"
        rounded="xl"
        bg="white"
        shadow="sm"
        w="100%"
        p="6"
      >
        <Box
          flex={{ base: 'none', md: 1 }}
          w={{ base: '50%', md: '100%' }}
          bg="blue"
          rounded="xl"
          aspectRatio={1}
          alignSelf="center"
        ></Box>
        <Flex flex="4" direction="row" gap="2">
          teste
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Page
