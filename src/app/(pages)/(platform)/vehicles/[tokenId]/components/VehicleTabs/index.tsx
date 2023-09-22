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

interface Props {
  tokenId: string
}

const VehicleTabs = ({ tokenId }: Props) => {
  const {
    isOpen: isVehicleServiceModalOpen,
    onOpen: onOpenVehicleServiceModal,
    onClose: onCloseVehicleServiceModal,
  } = useDisclosure()

  const [vehicleServiceViewId, setVehicleServiceViewId] = useState<number | undefined>(undefined)

  const { services, isLoading: isLoadingServices, load: loadServices } = useVehicleServices(tokenId)
  const {
    accidents,
    isLoading: isLoadingAccidents,
    load: loadAccidents,
  } = useVehicleAccidents(tokenId)
  const useContract = useVehicleContracts(tokenId)
  const { contracts, isLoading: isLoadingContracts, load: loadContracts } = useContract

  const vehicleService = useMemo(
    () =>
      vehicleServiceViewId !== undefined
        ? services.find((s) => s.id === vehicleServiceViewId)
        : undefined,
    [services, vehicleServiceViewId]
  )

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
          <TabPanel display="flex" flexDirection="column" pt="8" p="6" gap="4" w="100%">
            <CreateButton
              alignSelf="flex-end"
              onClick={onOpenVehicleServiceModal}
              mr="4"
              hideTextOnSmallScreen
            >
              Cadastrar serviço
            </CreateButton>
            <CustomDataTable
              defaultSortFieldId="date"
              defaultSortAsc={false}
              columns={[
                {
                  name: '#',
                  center: true,
                  selector: (row) => row.id,
                  wrap: true,
                  grow: 0.5,
                  cell: (row) => (
                    <ButtonEye
                      onClick={() => {
                        setVehicleServiceViewId(row.id)
                        onOpenVehicleServiceModal()
                      }}
                    />
                  ),
                },
                {
                  name: 'Título',
                  selector: (row) => row.title,
                  sortable: true,
                  wrap: true,
                  grow: 1,
                },
                {
                  name: 'Preço',
                  selector: (row) => row.price,
                  sortable: true,
                  wrap: true,
                  grow: 0.5,
                  format: (row) => `${row.price.toFixed(18).replace(/\.?0+$/, '')} ETH`,
                },
                {
                  id: 'date',
                  name: 'Data',
                  selector: (row) => row.date,
                  sortable: true,
                  wrap: true,
                  grow: 0.8,
                  format: (row) =>
                    new Intl.DateTimeFormat('pt-BR', {
                      timeZone: 'UTC',
                      month: 'long',
                      year: 'numeric',
                      day: '2-digit',
                    }).format(new Date(row.date * 1000)),
                },
                {
                  name: 'Status',
                  center: true,
                  selector: (row) => row.id,
                  sortable: true,
                  wrap: true,
                  grow: 0.5,
                  cell: (row) => {
                    const isInsured = contracts.some((contract) =>
                      contract.vehicleServicesIds.some((id) => id === row.id)
                    )

                    return (
                      <BadgeStatus theme={isInsured ? 'purple' : 'green'}>
                        {isInsured ? 'Assegurado' : 'Pago'}
                      </BadgeStatus>
                    )
                  },
                },
              ]}
              data={services}
              progressPending={isLoadingServices}
            />
          </TabPanel>
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
      <VehicleServiceCreateModal
        tokenId={tokenId}
        vehicleService={vehicleService}
        isOpen={isVehicleServiceModalOpen}
        onClose={() => {
          onCloseVehicleServiceModal()
          setVehicleServiceViewId(undefined)
        }}
        onCreate={loadServices}
      />
    </Flex>
  )
}

export default VehicleTabs
