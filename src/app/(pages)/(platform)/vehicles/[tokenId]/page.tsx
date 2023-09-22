'use client'

import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import VehicleTabs from './components/VehicleTabs'
import VehicleInfo from './components/VehicleInfo'

interface Params {
  params: {
    tokenId: string
  }
}
const Page = ({ params: { tokenId } }: Params) => {
  return (
    <Flex flex="1" w='100%' direction="column" justify="flex-start" align="center" gap="10" marginTop="8">
      <VehicleInfo />
      <VehicleTabs />
    </Flex>
  )
}

export default Page
