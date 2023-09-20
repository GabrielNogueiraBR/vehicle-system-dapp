'use client'

import React from 'react'
import { Center, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import LoadingPage from '@/components/LoadingPage'
import CreateButton from '@/components/CreateButton'
import NoVehicles from '@/components/Assets/NoVehicles'

import useVehicleNFTs from '@/hooks/useVehicleNFTs'
import VehicleContractRequestCreateModal from '@/components/Modal/VehicleContractRequestCreate'
import NoContracts from '@/components/Assets/NoContracts'

const ClientElement = () => {
  const {
    vehiclesNfts,
    isLoading: isLoadingVehiclesNFTs,
    load: loadVehiclesNFTs,
  } = useVehicleNFTs()

  const {
    isOpen: isVehicleInsuranceRequestModalOpen,
    onOpen: onOpenVehicleInsuranceRequestModal,
    onClose: onCloseVehicleInsuranceRequestModal,
  } = useDisclosure()

  const {
    isOpen: isVehicleRequestViewModalOpen,
    onOpen: onVehicleRequestViewModalOpen,
    onClose: onVehicleRequestViewModalClose,
  } = useDisclosure()

  const isLoading = false
  const hasContent = false

  return (
    <Flex flex="1" direction="column" justify="flex-start" alignItems="flex-start" gap="4" mt="25">
      <CreateButton
        alignSelf="flex-end"
        onClick={onOpenVehicleInsuranceRequestModal}
        isDisabled={isLoading}
      >
        Solicitar contrato
      </CreateButton>
      <Flex flexFlow="row wrap" gap="8" display={hasContent ? 'flex' : 'none'}>
        contratos
      </Flex>

      <LoadingPage display={isLoading ? 'flex' : 'none'} />

      <Center
        flex="1"
        flexDirection="column"
        w="100%"
        display={!isLoading && !hasContent ? 'flex' : 'none'}
        gap="4"
      >
        <NoContracts color="primary" w="md" />
        <Heading as="h3">Sem contratos cadastrados</Heading>
      </Center>

      <VehicleContractRequestCreateModal
        isOpen={isVehicleInsuranceRequestModalOpen}
        onClose={onCloseVehicleInsuranceRequestModal}
      />
    </Flex>
  )
}

export default ClientElement
