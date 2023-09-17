'use client'

import React, { useRef } from 'react'
import { Center, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react'
import LoadingPage from '@/components/LoadingPage'
import CreateButton from '@/components/CreateButton'
import VehicleRequestCreateModal from '@/components/Modal/VehicleRequestCreate'
import NoVehicles from '@/components/Assets/NoVehicles'
import VehicleCard from '@/components/VehicleCard'
import { InsuranceStatus, Status, VehicleRequest } from '@/types/contract'

import useVehicleNFTs from '@/hooks/useVehicleNFTs'
import useVehiclesRequests from '@/hooks/useVehicleRequests'
import VehicleRequestModal from '@/components/Modal/VehicleRequest'

const ClientElement = () => {
  const vehicleRequestRef = useRef<VehicleRequest | undefined>(undefined)

  const {
    vehiclesNfts,
    isLoading: isLoadingVehiclesNFTs,
    load: loadVehiclesNFTs,
  } = useVehicleNFTs()

  const {
    vehiclesRequests,
    isLoading: isLoadingVehiclesRequests,
    load: loadVehiclesRequests,
  } = useVehiclesRequests()

  const {
    isOpen: isVehicleRequestCreateModalOpen,
    onOpen: onVehicleRequestCreateModalOpen,
    onClose: onVehicleRequestCreateModalClose,
  } = useDisclosure()

  const {
    isOpen: isVehicleRequestViewModalOpen,
    onOpen: onVehicleRequestViewModalOpen,
    onClose: onVehicleRequestViewModalClose,
  } = useDisclosure()

  const handleVehicleRequestClick = (vehicleRequest: VehicleRequest) => {
    vehicleRequestRef.current = vehicleRequest
    onVehicleRequestViewModalOpen()
  }

  const isLoading = isLoadingVehiclesNFTs || isLoadingVehiclesRequests
  const hasContent = !!vehiclesNfts.length || !!vehiclesRequests.length

  const handleOnCreateVehicle = () => {
    loadVehiclesNFTs()
    loadVehiclesRequests()
  }

  return (
    <Flex flex="1" direction="column" justify="flex-start" alignItems="flex-start" gap="4" mt="25">
      <CreateButton
        alignSelf="flex-end"
        onClick={onVehicleRequestCreateModalOpen}
        isDisabled={isLoading}
      >
        Novo veículo
      </CreateButton>
      <Flex flexFlow="row wrap" gap="8" display={hasContent ? 'flex' : 'none'}>
        {vehiclesRequests.map((request) => {
          const theme = request.status === Status.PENDING ? 'request-pending' : 'request-approved'

          return (
            <VehicleCard.Root
              theme={theme}
              key={request.id}
              onClick={() => handleVehicleRequestClick(request)}
            >
              <VehicleCard.Icon theme={theme} />
              <VehicleCard.Info.Root>
                <VehicleCard.Info.Title>{request.vehicleRegistrationCode}</VehicleCard.Info.Title>
                <VehicleCard.Info.SubTitle>
                  <Text>
                    {request.status === Status.PENDING
                      ? 'Solicitação em aberto'
                      : 'Solicitação aprovada'}
                  </Text>
                </VehicleCard.Info.SubTitle>
              </VehicleCard.Info.Root>
            </VehicleCard.Root>
          )
        })}

        {vehiclesNfts.map((nft) => (
          <VehicleCard.Root tokenId={nft.tokenId} key={nft.tokenId}>
            <VehicleCard.Icon theme="NFT" />
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
        isOpen={isVehicleRequestCreateModalOpen}
        onClose={onVehicleRequestCreateModalClose}
        onCreate={() => loadVehiclesRequests()}
      />

      <VehicleRequestModal
        isOpen={isVehicleRequestViewModalOpen}
        onClose={onVehicleRequestViewModalClose}
        vehicleRequest={vehicleRequestRef.current}
        onCreateVehicle={handleOnCreateVehicle}
      />
    </Flex>
  )
}

export default ClientElement
