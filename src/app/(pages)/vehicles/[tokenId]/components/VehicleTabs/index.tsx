'use client'

import React, { useEffect } from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel, Flex } from '@chakra-ui/react'
import useVehicleServices from '@/hooks/useVehicleServices'
import useVehicleAccidents from '@/hooks/useVehicleAccidents'
import useVehicleContracts from '@/hooks/useVehicleContracts'
import CustomDataTable from '@/components/CustomDataTable'

interface Props {
  tokenId: string
}

const VehicleTabs = ({ tokenId }: Props) => {
  const { services, isLoading: isLoadingServices } = useVehicleServices(tokenId)
  const { accidents, isLoading: isLoadingAccidents } = useVehicleAccidents(tokenId)
  const { contracts, isLoading: isLoadingContracts } = useVehicleContracts(tokenId)

  useEffect(() => {
    console.log({ services, isLoadigServices: isLoadingServices })
  }, [isLoadingServices, services])

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
            <CustomDataTable
              columns={[
                {
                  name: 'Dono do veículo',
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
          <TabPanel>
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
          <TabPanel>
            <CustomDataTable
              columns={[
                {
                  name: 'Dono do veículo',
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
