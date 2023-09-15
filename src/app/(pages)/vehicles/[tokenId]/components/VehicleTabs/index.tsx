'use client'

import React, { useState } from 'react'
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  useDisclosure,
  Icon,
  Button,
} from '@chakra-ui/react'
import useVehicleServices from '@/hooks/useVehicleServices'
import useVehicleAccidents from '@/hooks/useVehicleAccidents'
import useVehicleContracts from '@/hooks/useVehicleContracts'
import CustomDataTable from '@/components/CustomDataTable'
import CreateButton from '@/components/CreateButton'
import VehicleServiceCreateModal from '@/components/Modal/VehicleServiceCreate'
import { TbEye } from 'react-icons/tb'
import BadgeStatus from '@/components/BadgeStatus'

interface Props {
  tokenId: string
}

const VehicleTabs = ({ tokenId }: Props) => {
  const {
    isOpen: isVehicleServiceModalOpen,
    onOpen: onOpenVehicleServiceModal,
    onClose: onCloseVehicleServiceModal,
  } = useDisclosure()

  const { services, isLoading: isLoadingServices, load: loadServices } = useVehicleServices(tokenId)
  const { accidents, isLoading: isLoadingAccidents } = useVehicleAccidents(tokenId)
  const { contracts, isLoading: isLoadingContracts } = useVehicleContracts(tokenId)

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
              columns={[
                {
                  name: '#',
                  center: true,
                  selector: (row) => row.id,
                  sortable: true,
                  wrap: true,
                  grow: 0.5,
                  cell: (row) => (
                    <Button
                      colorScheme="none"
                      bg="light-gray"
                      p={0}
                      m={0}
                      w="8"
                      h="8"
                      minW={0}
                      minH={0}
                      aspectRatio={1}
                    >
                      <Icon as={TbEye} fontSize="xl" color="white" />
                    </Button>
                  ),
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
                  format: (row) => `${parseFloat(row.price.toFixed(2))} ETH`,
                },
                {
                  name: 'Data',
                  selector: (row) => row.date,
                  sortable: true,
                  wrap: true,
                  grow: 1,
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
                  selector: (row) => row.id,
                  sortable: true,
                  wrap: true,
                  grow: 0.8,
                  cell: (row) => <BadgeStatus status={row.id % 2 === 0 ? 'payed' : 'insured'} />,
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
          <TabPanel display="flex" flexDirection="column" pt="8" p="6" gap="4" w="100%">
            <CreateButton alignSelf="flex-end" mr="4" hideTextOnSmallScreen>
              Solicitar contrato
            </CreateButton>
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
