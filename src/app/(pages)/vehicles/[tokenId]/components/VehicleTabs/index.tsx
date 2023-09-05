'use client'
import React from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel, Flex } from '@chakra-ui/react'

const VehicleTabs = () => {
  return (
    <Flex rounded="xl" w="100%" bg="white" paddingTop={2} shadow="sm" overflow="hidden">
      <Tabs size="md" w="100%" variant="unstyles">
        <TabList bg="white">
          <Tab _selected={{ color: 'gray.800', fontWeight: 700 }}>Serviços</Tab>
          <Tab _selected={{ color: 'gray.800', fontWeight: 700 }}>Sinistros</Tab>
          <Tab _selected={{ color: 'gray.800', fontWeight: 700 }}>Contratos</Tab>
        </TabList>
        <TabPanels bg="gray.50">
          <TabPanel>
            <p>um!</p>
          </TabPanel>
          <TabPanel>
            <p>dois!</p>
          </TabPanel>
          <TabPanel>
            <p>três!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

export default VehicleTabs
