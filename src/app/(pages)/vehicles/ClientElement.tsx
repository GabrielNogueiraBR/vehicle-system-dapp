'use client'

import React from 'react'
import { Center, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react'
import LoadingPage from '@/components/LoadingPage'
import CreateButton from '@/components/CreateButton'
import VehicleRequestCreateModal from '@/components/Modal/VehicleRequestCreate'
import NoVehicles from '@/components/Assets/NoVehicles'
import VehicleCard from '@/components/VehicleCard'
import { InsuranceStatus } from '@/types/contract'

import useVehicleNFTs from '@/hooks/useVehicleNFTs'
import useVehiclesRequests from '@/hooks/useVehicleRequests'

const ClientElement = () => {
  const { vehiclesNfts, isLoading: isLoadingVehiclesNFTs } = useVehicleNFTs()
  const { vehiclesRequests, isLoading: isLoadingVehiclesRequests } = useVehiclesRequests()

  const {
    isOpen: isVehicleRequestModalOpen,
    onOpen: onVehicleRequestModalOpen,
    onClose: onVehicleRequestModalClose,
  } = useDisclosure()

  const isLoading = isLoadingVehiclesNFTs || isLoadingVehiclesRequests

  const hasContent = !!vehiclesNfts.length || !!vehiclesRequests.length

  return (
    <Flex flex="1" direction="column" justify="flex-start" alignItems="flex-start" gap="4" mt="25">
      <CreateButton alignSelf="flex-end" onClick={onVehicleRequestModalOpen} isDisabled={isLoading}>
        Novo veículo
      </CreateButton>
      <Flex flexFlow="row wrap" gap="8" display={hasContent ? 'flex' : 'none'}>
        {vehiclesNfts.map((nft) => (
          <VehicleCard.Root tokenId={nft.tokenId} key={nft.tokenId}>
            <VehicleCard.Icon status="nft" />
            <VehicleCard.Info.Root>
              <VehicleCard.Info.Title>
                Token #{nft.tokenId.toString().padStart(3, '0')}
              </VehicleCard.Info.Title>
              <VehicleCard.Info.InsuredBadge
                display={
                  nft.contracts.some((contract) => contract.status === InsuranceStatus.ACTIVE)
                    ? 'flex'
                    : 'none'
                }
              />
              <VehicleCard.Info.SubTitle>
                <Text>{nft.vehicleMetadata?.carModel}</Text>
                <Text>{nft.vehicleMetadata?.carBrand}</Text>
              </VehicleCard.Info.SubTitle>
            </VehicleCard.Info.Root>
          </VehicleCard.Root>
        ))}
      </Flex>

      <LoadingPage display={isLoading ? 'flex' : 'none'} />

      <Center
        flexDirection="column"
        w="100%"
        display={!isLoading && !hasContent ? 'flex' : 'none'}
        mt="16"
        gap="4"
      >
        <NoVehicles color="primary" w="md" />
        <Heading as="h3">Sem veículos cadastrados</Heading>
      </Center>
      <VehicleRequestCreateModal
        isOpen={isVehicleRequestModalOpen}
        onClose={onVehicleRequestModalClose}
      />
    </Flex>
  )
}

export default ClientElement
