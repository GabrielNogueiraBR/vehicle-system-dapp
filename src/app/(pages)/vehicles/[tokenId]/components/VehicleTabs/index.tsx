'use client'

import React, { useEffect, useState } from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel, Flex, Spacer } from '@chakra-ui/react'
import useVehicleServices from '@/hooks/useVehicleServices'
import useVehicleAccidents from '@/hooks/useVehicleAccidents'
import useVehicleContracts from '@/hooks/useVehicleContracts'
import CustomDataTable from '@/components/CustomDataTable'
import CreateButton from '@/components/CreateButton'

interface Props {
  tokenId: string
}

const VehicleTabs = ({ tokenId }: Props) => {
  const [tabIndex, setTabIndex] = useState(0)

  const { services, isLoading: isLoadingServices } = useVehicleServices(tokenId)
  const { accidents, isLoading: isLoadingAccidents } = useVehicleAccidents(tokenId)
  const { contracts, isLoading: isLoadingContracts } = useVehicleContracts(tokenId)

  return (
    <Flex rounded="xl" w="100%" bg="white" paddingTop={2} shadow="sm" overflow="hidden">
      <Tabs size="md" w="100%" onChange={(index) => setTabIndex(index)} variant="unstyles">
        <TabList display="flex" flexDirection="row" w="100%" bg="white" py="2">
          <Tab _selected={{ color: 'gray.800', fontWeight: 700 }}>Serviços</Tab>
          <Tab _selected={{ color: 'gray.800', fontWeight: 700 }}>Sinistros</Tab>
          <Tab _selected={{ color: 'gray.800', fontWeight: 700 }}>Contratos</Tab>
          <Spacer />
          <CreateButton display={tabIndex === 0 ? 'flex' : 'none'}>Cadastrar serviço</CreateButton>
          <CreateButton display={tabIndex === 2 ? 'flex' : 'none'}>Solicitar contrato</CreateButton>
        </TabList>
        <TabPanels bg="gray.50">
          <TabPanel p="0">
            <CustomDataTable
              columns={[
                {
                  name: 'Requisitado por',
                  selector: (row) => row.requester,
                  sortable: true,
                },
                {
                  name: 'Título',
                  selector: (row) => row.title,
                  sortable: true,
                },
                {
                  name: 'Preço',
                  selector: (row) => row.price,
                  sortable: true,
                },
                {
                  name: 'Data',
                  selector: (row) => row.date,
                  sortable: true,
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
                  name: 'Dono do veículo',
                  selector: (row) => row.vehicleOwner,
                  sortable: true,
                },
                {
                  name: 'Seguradora',
                  selector: (row) => row.insurer,
                  sortable: true,
                },
                {
                  name: 'Descrição',
                  selector: (row) => row.description,
                  sortable: true,
                },
                {
                  name: 'Data do sinistro',
                  selector: (row) => row.accidentDate,
                  sortable: true,
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
                  name: 'Requisitado por',
                  selector: (row) => row.requester,
                  sortable: true,
                },
                {
                  name: 'Seguradora',
                  selector: (row) => row.insurer,
                  sortable: true,
                },
                {
                  name: 'Início em',
                  selector: (row) => row.insuranceStartDate,
                  sortable: true,
                },
                {
                  name: 'Final em',
                  selector: (row) => row.insuranceEndDate,
                  sortable: true,
                },
                {
                  name: 'Contrato (link)',
                  selector: (row) => row.contractUrl,
                  sortable: true,
                },
              ]}
              data={contracts}
              progressPending={isLoadingContracts}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

export default VehicleTabs
