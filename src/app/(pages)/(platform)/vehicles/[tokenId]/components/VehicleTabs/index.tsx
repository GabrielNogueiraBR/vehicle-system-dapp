'use client'

import React from 'react'
import { Tabs, TabList, Tab, TabPanels, Flex } from '@chakra-ui/react'
import ContractTab from './ContractTab'
import ServicesTab from './ServiceTab'
import AccidentTab from './AccidentTab'
import { useVehicle } from '@/contexts/VehicleContext'

const VehicleTabs = () => {
  const { tokenId, useAccidents, useContract } = useVehicle()

  return (
    <Flex w="100%" maxW="100%" rounded="xl" bg="white" shadow="sm" overflow="hidden">
      <Tabs size="md" w="100%" variant="line">
        <TabList
          w="100%"
          display="flex"
          flexDirection="row"
          bg="white"
          border="2px solid"
          borderColor="primary"
          roundedTop="xl"
          sx={{
            button: {
              _selected: { color: 'white', bg: 'primary', borderColor: 'primary' },
              _active: { bg: 'transparent' },
              _hover: { color: 'white', bg: 'primary', transform: 'scale(1)' },
              py: 3,
              fontWeight: 600,
            },
          }}
        >
          <Tab>Serviços</Tab>
          <Tab>Sinistros</Tab>
          <Tab>Contratos</Tab>
        </TabList>
        <TabPanels
          w="100%"
          bg="white"
          roundedBottom="xl"
          border="2px solid"
          borderColor="light-purple"
          borderTop="0"
        >
          <ServicesTab />
          <AccidentTab />
          <ContractTab />
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

export default VehicleTabs
