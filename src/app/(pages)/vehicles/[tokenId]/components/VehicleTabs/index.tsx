'use client'

import React, { useEffect } from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel, Flex } from '@chakra-ui/react'
import useVehicleServices from '@/hooks/useVehicleServices'
import useVehicleAccidents from '@/hooks/useVehicleAccidents'
import useVehicleContracts from '@/hooks/useVehicleContracts'

interface Props {
  tokenId: string
}

const VehicleTabs = ({ tokenId }: Props) => {
  const { services, isLoading: isLoadigServices } = useVehicleServices(tokenId)
  const { accidents, isLoading: isLoadingAccidents } = useVehicleAccidents(tokenId)
  const { contracts, isLoading: isLoadingContracts } = useVehicleContracts(tokenId)

  useEffect(() => {
    console.log({ services, isLoadigServices })
  }, [isLoadigServices, services])

  useEffect(() => {
    console.log({ accidents, isLoadingAccidents })
  }, [isLoadingAccidents, accidents])

  useEffect(() => {
    console.log({ contracts, isLoadingContracts })
  }, [isLoadingContracts, contracts])

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
