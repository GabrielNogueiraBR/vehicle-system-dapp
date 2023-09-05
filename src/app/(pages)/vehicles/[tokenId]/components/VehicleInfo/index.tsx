'use client'

import React from 'react'
import { Flex, Box } from '@chakra-ui/react'

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
      p="6"
    >
      <Box
        flex={{ base: 'none', md: 1 }}
        w={{ base: '50%', md: '100%' }}
        bg="blue"
        rounded="xl"
        aspectRatio={1}
        alignSelf="center"
      />
      <Flex flex="4" direction="row" gap="2">
        teste
      </Flex>
    </Flex>
  )
}

export default VehicleInfo
