'use client'

import React from 'react'
import { Flex, Box, Img } from '@chakra-ui/react'

const VehicleInfo = () => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="flex-start"
      align="flex-start"
      gap="4"
      rounded="xl"
      bg="white"
      shadow="sm"
      w="100%"
      border="2px solid"
      borderColor="secondary"
    >
      <Box
        flex={{ base: 'none', md: 1 }}
        h="18.5625rem"
        rounded="xl"
        aspectRatio={1}
        py="10"
        px="14"
        alignSelf="center"
      >
        <Img w="auto" h="100%" src="/vehicle-nft.png" alt="vehicle nft" />
      </Box>
      <Flex flex="4" direction="row" gap="2">
        teste
      </Flex>
    </Flex>
  )
}

export default VehicleInfo
