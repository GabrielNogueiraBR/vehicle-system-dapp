'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Flex, Heading, Tooltip, Text } from '@chakra-ui/react'
import { InsuranceStatus, VehicleContract, VehicleMetadata } from '@/types/contract'
import CustomDataTable from '@/components/CustomDataTable'
import ButtonEye from '@/components/Buttons/ButtonEye'
import Link from 'next/link'
import { useSigner } from '@usedapp/core'
import getVehicleNFTMetadataByTokenId from '@/utils/getVehicleNFTMetadataByTokenId'
import { ADDRESS_REGEX } from '@/constants/web3'
import useInsurerContracts from '@/hooks/useInsurerContracts'
import SearchInput from '@/components/SearchInput'
import useSearch from '@/components/SearchInput/hooks/useSearch'

type CustomData = VehicleContract & { metadata: VehicleMetadata }

const ClientComponent = () => {
  const [dataTable, setDataTable] = useState<CustomData[]>([])
  const [isFormating, setFormating] = useState<boolean>(true)

  const { contracts, isLoading: isLoadingContracts } = useInsurerContracts()

  const { isSearching, setSearch, filteredData } = useSearch(dataTable)

  const isLoading = isLoadingContracts || isFormating || isSearching

  const signer = useSigner()

  const formatTableData = async () => {
    try {
      setFormating(true)
      const data: CustomData[] = []

      await Promise.all(
        contracts.map(async (contract) => {
          const metadata = await getVehicleNFTMetadataByTokenId({
            tokenId: String(contract.tokenId),
            signer,
          })

          if (contract.status === InsuranceStatus.EXPIRED) return Promise.resolve()

          if (metadata) data.push({ ...contract, metadata })
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
  }, [contracts, signer])

  return (
    <Flex flex="1" direction="column" justify="flex-start" alignItems="flex-start" gap="4">
      <Heading mt="8">Contratos de veículos</Heading>
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
                    <ButtonEye bg="primary" />
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
              id: 'start_date',
              name: 'Início do contrato',
              selector: (row) => row.insuranceStartDate.getTime(),
              sortable: true,
              wrap: true,
              cell: (row) => new Intl.DateTimeFormat('pt-BR').format(row.insuranceStartDate),
            },
            {
              id: 'end_date',
              name: 'Expiração do contrato',
              selector: (row) => row.insuranceEndDate.getTime(),
              sortable: true,
              wrap: true,
              cell: (row) => new Intl.DateTimeFormat('pt-BR').format(row.insuranceEndDate),
            },
          ]}
          progressPending={isLoading}
        />
      </Flex>
    </Flex>
  )
}

export default ClientComponent
