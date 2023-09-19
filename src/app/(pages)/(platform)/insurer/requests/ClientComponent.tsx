'use client'

import React, { useMemo, useRef } from 'react'
import { Button, Flex, Heading, Icon, Tooltip, useDisclosure } from '@chakra-ui/react'
import { Status, VehicleInsuranceRequest } from '@/types/contract'
import CustomDataTable from '@/components/CustomDataTable'
import BadgeStatus from '@/components/BadgeStatus'
import useAgentVehiclesRequests from '@/hooks/useAgentVehiclesRequests'
import DocumentPlus from '@/components/Icons/DocumentPlus'
import DocumentDownload from '@/components/Icons/DocumentDownload'
import ButtonEye from '@/components/Buttons/ButtonEye'
import VehicleInsuranceApproval from '@/components/Modal/VehicleInsuranceApproval'
import useInsurerContractRequests from '@/hooks/useInsurerContractRequests'
import Link from 'next/link'

const ClientComponent = () => {
  //TODO: ADICIONAR FILTRO SIMPLES: STRINGFY E VERIFICAR SE SEARCH INCLUDE NESSA STRING
  const contractRequestRef = useRef<VehicleInsuranceRequest | undefined>(undefined)

  const { contractRequests, isLoading, load } = useInsurerContractRequests()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const submittedStatus = useMemo(() => [Status.APPROVED, Status.COMPLETED, Status.CANCEL], [])

  const handleClickContractRequest = (vehicleRequest: VehicleInsuranceRequest) => {
    contractRequestRef.current = vehicleRequest
    onOpen()
  }

  const handleApproveContractRequest = () => {
    load()
  }

  return (
    <Flex flex="1" direction="column" justify="flex-start" alignItems="flex-start" gap="4">
      <Heading mt="8">Solicitações de contrato</Heading>
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
              name: '#',
              selector: (row) => row.tokenId,
              center: true,
              wrap: true,
              cell: (row) => (
                <Tooltip label="Visualizar veículo" hasArrow>
                  <Link href={`/vehicles/${row.tokenId}`}>
                    <ButtonEye />
                  </Link>
                </Tooltip>
              ),
            },
            {
              name: 'Proprietário',
              selector: (row) => row.tokenId,
              sortable: true,
              wrap: true,
              cell: (row) => row.tokenId,
            },
            {
              name: 'TokenId',
              selector: (row) => row.tokenId,
              sortable: true,
              wrap: true,
              cell: (row) => row.tokenId,
            },
            {
              name: 'Marca',
              selector: (row) => row.tokenId,
              sortable: true,
              wrap: true,
              cell: (row) => row.tokenId,
            },
            {
              name: 'Modelo',
              selector: (row) => row.tokenId,
              sortable: true,
              wrap: true,
              cell: (row) => row.tokenId,
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
                    {isSubmitted ? 'Aprovado' : 'Pendente'}
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
                    onClick={() => handleClickContractRequest(row)}
                  >
                    <Icon
                      as={isSubmitted ? DocumentDownload : DocumentPlus}
                      bg="transparent"
                      color={isSubmitted ? 'primary' : 'secondary'}
                      rounded="md"
                      fontSize="2xl"
                    />
                  </Button>
                )
              },
            },
          ]}
          data={contractRequests}
          progressPending={isLoading}
        />
      </Flex>

      <VehicleInsuranceApproval
        isOpen={isOpen}
        onClose={onClose}
        vehicleInsuranceRequest={contractRequestRef.current}
        onApprove={handleApproveContractRequest}
      />
    </Flex>
  )
}

export default ClientComponent
