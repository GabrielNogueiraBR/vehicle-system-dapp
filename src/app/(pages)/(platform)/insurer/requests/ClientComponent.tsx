'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Flex, Heading, Icon, Tooltip, useDisclosure, Text } from '@chakra-ui/react'
import {
  Status,
  VehicleInsuranceProposal,
  VehicleInsuranceRequest,
  VehicleMetadata,
} from '@/types/contract'
import CustomDataTable from '@/components/CustomDataTable'
import BadgeStatus from '@/components/BadgeStatus'
import DocumentPlus from '@/components/Icons/DocumentPlus'
import DocumentDownload from '@/components/Icons/DocumentDownload'
import ButtonEye from '@/components/Buttons/ButtonEye'
import VehicleInsuranceApproval from '@/components/Modal/VehicleInsuranceApproval'
import useInsurerContractRequests from '@/hooks/useInsurerContractRequests'
import Link from 'next/link'
import useInsurerContractProposals from '@/hooks/useInsurerContractProposals'
import { useSigner } from '@usedapp/core'
import getVehicleNFTMetadataByTokenId from '@/utils/getVehicleNFTMetadataByTokenId'
import { ADDRESS_REGEX } from '@/constants/web3'
import SearchInput from '@/components/SearchInput'
import useSearch from '@/components/SearchInput/hooks/useSearch'

type CustomData = VehicleInsuranceRequest &
  Partial<VehicleInsuranceProposal> & { metadata: VehicleMetadata }

const ClientComponent = () => {
  const [dataTable, setDataTable] = useState<CustomData[]>([])
  const [isFormating, setFormating] = useState<boolean>(true)

  const { filteredData, setSearch, isSearching } = useSearch(dataTable)

  //TODO: MODIFICAR O MODAL DE VISUALIZAÇÃO -> SEGUIR FIGMA (DIFERENTE DO DE CRIAÇÃO)
  const requestDataRef = useRef<CustomData | undefined>(undefined)

  const {
    contractRequests,
    isLoading: isLoadingContractRequests,
    load: loadContractRequests,
  } = useInsurerContractRequests()
  const {
    contractProposals,
    isLoading: isLoadingContractProposals,
    load: loadContractProposals,
  } = useInsurerContractProposals()

  const isLoading =
    isLoadingContractRequests || isLoadingContractProposals || isFormating || isSearching

  const signer = useSigner()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClickContractRequest = (data: CustomData) => {
    requestDataRef.current = data
    onOpen()
  }

  const handleApproveContractRequest = () => {
    loadContractRequests()
    loadContractProposals()
  }

  const formatTableData = async () => {
    try {
      setFormating(true)
      const union = [...contractRequests, ...contractProposals]
      const data: CustomData[] = []

      await Promise.all(
        union.map(async (value) => {
          const metadata = await getVehicleNFTMetadataByTokenId({
            tokenId: String(value.tokenId),
            signer,
          })

          if (metadata) data.push({ ...value, metadata })
        })
      )

      setDataTable(data)
    } catch (e) {
      console.error(e)
    } finally {
      setFormating(false)
    }
  }

  useEffect(() => {
    formatTableData()
  }, [contractRequests, contractProposals, signer])

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
        gap="6"
      >
        <SearchInput onChange={setSearch} />
        <CustomDataTable
          defaultSortFieldId="request_data"
          defaultSortAsc={false}
          data={filteredData}
          columns={[
            {
              name: '#',
              selector: (row) => row.tokenId,
              center: true,
              wrap: true,
              width: '5.5rem',
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
              selector: (row) => row.requester,
              sortable: true,
              wrap: true,
              cell: (row) => (
                <Text noOfLines={1}>{row.requester.replace(ADDRESS_REGEX, '$1...$2')}</Text>
              ),
            },
            {
              name: 'TokenId',
              selector: (row) => row.tokenId,
              sortable: true,
              wrap: true,
              cell: (row) => `#${row.tokenId.toString().padStart(3, '0')}`,
            },
            {
              name: 'Marca',
              selector: (row) => row.metadata.carBrand,
              sortable: true,
              wrap: true,
              cell: (row) => row.metadata.carBrand || '-',
            },
            {
              name: 'Modelo',
              selector: (row) => row.metadata.carModel,
              sortable: true,
              wrap: true,
              cell: (row) => row.metadata.carModel || '-',
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
                const isSubmitted = row?.insuranceStartDate !== undefined
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
                const isSubmitted = row?.insuranceStartDate !== undefined
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
          progressPending={isLoading}
        />
      </Flex>

      <VehicleInsuranceApproval
        isOpen={isOpen}
        onClose={onClose}
        requestData={requestDataRef.current}
        onApprove={handleApproveContractRequest}
      />
    </Flex>
  )
}

export default ClientComponent
