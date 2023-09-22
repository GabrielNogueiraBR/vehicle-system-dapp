'use client'

import React, { useMemo, useState } from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel, Flex, useDisclosure } from '@chakra-ui/react'
import useVehicleServices from '@/hooks/useVehicleServices'
import useVehicleAccidents from '@/hooks/useVehicleAccidents'
import useVehicleContracts from '@/hooks/useVehicleContracts'
import CustomDataTable from '@/components/CustomDataTable'
import CreateButton from '@/components/CreateButton'
import VehicleServiceCreateModal from '@/components/Modal/VehicleServiceCreate'
import BadgeStatus from '@/components/BadgeStatus'
import ButtonEye from '@/components/Buttons/ButtonEye'
import VehicleContractRequestCreateModal from '@/components/Modal/VehicleContractRequestCreate'
import { ADDRESS_REGEX } from '@/constants/web3'
import { InsuranceStatus, Status } from '@/types/contract'
import VehicleContractInfoModal from '@/components/Modal/VehicleContractInfo'
import ContractTab from './ContractTab'
import ServicesTab from './ServiceTab'

interface Props {
  tokenId: string
}

const VehicleTabs = ({ tokenId }: Props) => {
  const useServices = useVehicleServices(tokenId)
  const { services, isLoading: isLoadingServices, load: loadServices } = useServices

  const {
    accidents,
    isLoading: isLoadingAccidents,
    load: loadAccidents,
  } = useVehicleAccidents(tokenId)
  const useContract = useVehicleContracts(tokenId)
  const { contracts, isLoading: isLoadingContracts, load: loadContracts } = useContract

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
          <ServicesTab tokenId={tokenId} contracts={contracts} useServices={useServices} />
          <TabPanel display="flex" flexDirection="column" pt="8" p="6" gap="4" w="100%">
            <CreateButton alignSelf="flex-end" mr="4" hideTextOnSmallScreen>
              Cadastrar sinistro
            </CreateButton>
            <CustomDataTable
              defaultSortFieldId="date"
              defaultSortAsc={false}
              columns={[
                {
                  name: 'ID',
                  selector: (row) => row.id,
                  sortable: true,
                  wrap: true,
                  grow: 0.5,
                },
                {
                  name: 'Dono do veículo',
                  selector: (row) => row.vehicleOwner,
                  sortable: true,
                  wrap: true,
                  grow: 3,
                },
                {
                  name: 'Seguradora',
                  selector: (row) => row.insurer,
                  sortable: true,
                  wrap: true,
                  grow: 3,
                },
                {
                  name: 'Descrição',
                  selector: (row) => row.description,
                  sortable: true,
                  wrap: true,
                  grow: 1,
                },
                {
                  id: 'date',
                  name: 'Data do sinistro',
                  selector: (row) => row.accidentDate,
                  sortable: true,
                  wrap: true,
                  grow: 0.5,
                },
              ]}
              data={accidents}
              progressPending={isLoadingAccidents}
            />
          </TabPanel>
          <ContractTab tokenId={tokenId} useContract={useContract} />
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

export default VehicleTabs
