'use client'

import React, {  } from 'react'
import { Tabs, TabList, Tab, TabPanels, Flex } from '@chakra-ui/react'
import useVehicleServices from '@/hooks/useVehicleServices'
import useVehicleAccidents from '@/hooks/useVehicleAccidents'
import useVehicleContracts from '@/hooks/useVehicleContracts'
import ContractTab from './ContractTab'
import ServicesTab from './ServiceTab'
import AccidentTab from './AccidentTab'

interface Props {
  tokenId: string
}

const VehicleTabs = ({ tokenId }: Props) => {
  const useServices = useVehicleServices(tokenId)
  const useAccidents = useVehicleAccidents(tokenId)
  const useContract = useVehicleContracts(tokenId)

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
        >
          <Tab
            _selected={{ color: 'white', bg: 'primary' }}
            _active={{ bg: 'transparent' }}
            _hover={{ color: 'white', bg: 'primary', transform: 'scale(1)' }}
            py={3}
            fontWeight={600}
          >
            Serviços
          </Tab>
          <Tab
            _selected={{ color: 'white', bg: 'primary' }}
            _active={{ bg: 'transparent' }}
            _hover={{ color: 'white', bg: 'primary', transform: 'scale(1)' }}
            fontWeight={600}
          >
            Sinistros
          </Tab>
          <Tab
            _selected={{ color: 'white', bg: 'primary' }}
            _active={{ bg: 'transparent' }}
            _hover={{ color: 'white', bg: 'primary', transform: 'scale(1)' }}
            fontWeight={600}
          >
            Contratos
          </Tab>
        </TabList>
        <TabPanels
          w="100%"
          bg="white"
          roundedBottom="xl"
          border="2px solid"
          borderColor="light-purple"
          borderTop="0"
        >
          <ServicesTab
            tokenId={tokenId}
            contracts={useContract.contracts}
            useServices={useServices}
          />
          <AccidentTab tokenId={tokenId} useAccidents={useAccidents} />
          <ContractTab tokenId={tokenId} useContract={useContract} />
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

export default VehicleTabs
