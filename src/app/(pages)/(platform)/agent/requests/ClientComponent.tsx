'use client'

import React, { useMemo, useRef } from 'react'
import { Button, Flex, Heading, Icon, useDisclosure } from '@chakra-ui/react'
import { Status, VehicleRequest } from '@/types/contract'
import CustomDataTable from '@/components/CustomDataTable'
import BadgeStatus from '@/components/BadgeStatus'
import { BiEdit } from 'react-icons/bi'
import { TbEye } from 'react-icons/tb'
import VehicleRequestApprovalModal from '@/components/Modal/VehicleRequestApproval'
import useAgentVehiclesRequests from '@/hooks/useAgentVehiclesRequests'

const ClientComponent = () => {
  const { vehiclesRequests, isLoading } = useAgentVehiclesRequests()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const vehicleRequestRef = useRef<VehicleRequest | undefined>(undefined)

  const submittedStatus = useMemo(() => [Status.APPROVED, Status.COMPLETED, Status.CANCEL], [])

  const handleClickVehicleRequest = (vehicleRequest: VehicleRequest) => {
    vehicleRequestRef.current = vehicleRequest
    onOpen()
  }

  return (
    <Flex flex="1" direction="column" justify="flex-start" alignItems="flex-start" gap="4">
      <Heading mt='8'>Solicitações de Veículos</Heading>
      <Flex
        w="100%"
        h="fit-content"
        direction="column"
        p="10"
        roundedBottom="2xl"
        border="2px solid"
        borderColor="light-purple"
        bg="white"
      >
        <CustomDataTable
          defaultSortFieldId="request_data"
          defaultSortAsc={false}
          columns={[
            {
              name: 'Renavam',
              selector: (row) => row.vehicleRegistrationCode,
              sortable: true,
              wrap: true,
            },
            {
              name: 'Marca',
              selector: (row) => row.vehicleData.carBrand,
              sortable: true,
              wrap: true,
              cell: (row) => row.vehicleData.carBrand || '-',
            },
            {
              name: 'Modelo',
              selector: (row) => row.vehicleData.carModel,
              sortable: true,
              wrap: true,
              cell: (row) => row.vehicleData.carModel || '-',
            },
            {
              name: 'Data de Fabricação',
              selector: (row) => row.vehicleData.manufacturingDate.getTime(),
              sortable: true,
              wrap: true,
              cell: (row) =>
                row.vehicleData.manufacturingDate.getTime() !== 0
                  ? new Intl.DateTimeFormat('pt-BR').format(row.vehicleData.manufacturingDate)
                  : '-',
            },
            {
              id: 'request_data',
              name: 'Data da solicitação',
              selector: (row) => row.createdAt.getTime(),
              sortable: true,
              wrap: true,
              cell: (row) => new Intl.DateTimeFormat('pt-BR').format(row.createdAt),
            },
            {
              name: 'Status',
              selector: (row) => row.status,
              sortable: true,
              wrap: true,
              cell: (row) => {
                const isSubmitted = submittedStatus.includes(row.status)
                return (
                  <BadgeStatus theme={isSubmitted ? 'purple' : 'green'}>
                    {isSubmitted ? 'Fechado' : 'Aberto'}
                  </BadgeStatus>
                )
              },
            },
            {
              selector: (row) => row.id,
              grow: 0.5,
              cell: (row) => {
                const isSubmitted = submittedStatus.includes(row.status)
                return (
                  <Button
                    colorScheme="none"
                    p={0}
                    m={0}
                    w="fit-content"
                    h="fit-content"
                    minW={0}
                    minH={0}
                    aspectRatio={1}
                    onClick={() => handleClickVehicleRequest(row)}
                  >
                    <Icon
                      as={isSubmitted ? TbEye : BiEdit}
                      bg={isSubmitted ? 'primary' : 'transparent'}
                      color={isSubmitted ? 'white' : 'dark-green'}
                      rounded="md"
                      fontSize="2xl"
                    />
                  </Button>
                )
              },
            },
          ]}
          data={vehiclesRequests}
          progressPending={isLoading}
        />
      </Flex>

      <VehicleRequestApprovalModal
        isOpen={isOpen}
        onClose={onClose}
        vehicleRequest={vehicleRequestRef.current}
      />
    </Flex>
  )
}

export default ClientComponent
