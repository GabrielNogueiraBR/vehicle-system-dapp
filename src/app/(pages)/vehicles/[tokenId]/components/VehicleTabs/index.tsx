'use client'

import React, { useState } from 'react'
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Spacer,
  TabIndicator,
  useDisclosure,
} from '@chakra-ui/react'
import useVehicleServices from '@/hooks/useVehicleServices'
import useVehicleAccidents from '@/hooks/useVehicleAccidents'
import useVehicleContracts from '@/hooks/useVehicleContracts'
import CustomDataTable from '@/components/CustomDataTable'
import CreateButton from '@/components/CreateButton'
import VehicleServiceCreateModal from '@/components/Modal/VehicleServiceCreate'

interface Props {
  tokenId: string
}

const VehicleTabs = ({ tokenId }: Props) => {
  const [tabIndex, setTabIndex] = useState(0)
  const {
    isOpen: isVehicleServiceModalOpen,
    onOpen: onOpenVehicleServiceModal,
    onClose: onCloseVehicleServiceModal,
  } = useDisclosure()

  const { services, isLoading: isLoadingServices, load: loadServices } = useVehicleServices(tokenId)
  const { accidents, isLoading: isLoadingAccidents } = useVehicleAccidents(tokenId)
  const { contracts, isLoading: isLoadingContracts } = useVehicleContracts(tokenId)

  return (
    <Flex w="100%" maxW="100%" rounded="xl" bg="white" paddingTop={2} shadow="sm">
      <Tabs size="md" w="100%" onChange={(index) => setTabIndex(index)} variant="line">
        <TabList w="100%" display="flex" flexDirection="row" bg="white" py="2">
          <Tab
            _selected={{ color: 'primary' }}
            _active={{ bg: 'transparent' }}
            _hover={{ color: 'primary', transition: 'all 250ms' }}
            fontWeight={600}
          >
            Serviços
          </Tab>
          <Tab
            _selected={{ color: 'primary' }}
            _active={{ bg: 'transparent' }}
            _hover={{ color: 'primary', transition: 'all 250ms' }}
            fontWeight={600}
          >
            Sinistros
          </Tab>
          <Tab
            _selected={{ color: 'primary' }}
            _active={{ bg: 'transparent' }}
            _hover={{ color: 'primary', transition: 'all 250ms' }}
            fontWeight={600}
          >
            Contratos
          </Tab>
          <Spacer />
          <CreateButton
            display={tabIndex === 0 ? 'flex' : 'none'}
            onClick={onOpenVehicleServiceModal}
            hideTextOnSmallScreen
            mr="4"
          >
            Cadastrar serviço
          </CreateButton>
          <CreateButton display={tabIndex === 2 ? 'flex' : 'none'} hideTextOnSmallScreen mr="4">
            Solicitar contrato
          </CreateButton>
        </TabList>
        <TabIndicator w="100%" mt="-1.5px" height="2px" bg="primary" borderRadius="1px" />
        <TabPanels w="100%" bg="gray.50">
          <TabPanel p="0" w="100%">
            <CustomDataTable
              columns={[
                {
                  name: 'ID',
                  selector: (row) => row.id,
                  sortable: true,
                  wrap: true,
                  grow: 0.5,
                },
                {
                  name: 'Requisitado por',
                  selector: (row) => row.requester,
                  sortable: true,
                  wrap: true,
                  grow: 3,
                },
                {
                  name: 'Título',
                  selector: (row) => row.title,
                  sortable: true,
                  wrap: true,
                  grow: 2,
                },
                {
                  name: 'Preço',
                  selector: (row) => row.price,
                  sortable: true,
                  wrap: true,
                  grow: 0.5,
                },
                {
                  name: 'Data',
                  selector: (row) => row.date,
                  sortable: true,
                  wrap: true,
                  grow: 1,
                },
              ]}
              data={services}
              progressPending={isLoadingServices}
            />
          </TabPanel>
          <TabPanel p="0">
            <CustomDataTable
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
          <TabPanel p="0">
            <CustomDataTable
              columns={[
                {
                  name: 'ID',
                  selector: (row) => row.id,
                  sortable: true,
                  wrap: true,
                  grow: 0.5,
                },
                {
                  name: 'Requisitado por',
                  selector: (row) => row.requester,
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
                  name: 'Início em',
                  selector: (row) => row.insuranceStartDate,
                  sortable: true,
                  wrap: true,
                  grow: 1,
                },
                {
                  name: 'Final em',
                  selector: (row) => row.insuranceEndDate,
                  sortable: true,
                  wrap: true,
                  grow: 1,
                },
                {
                  name: 'Contrato (link)',
                  selector: (row) => row.contractUrl,
                  sortable: true,
                  wrap: true,
                  grow: 0.5,
                },
              ]}
              data={contracts}
              progressPending={isLoadingContracts}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <VehicleServiceCreateModal
        tokenId={tokenId}
        isOpen={isVehicleServiceModalOpen}
        onClose={onCloseVehicleServiceModal}
        onCreate={loadServices}
      />
    </Flex>
  )
}

export default VehicleTabs
