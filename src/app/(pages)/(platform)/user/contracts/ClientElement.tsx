'use client'

import React, { useEffect, useState } from 'react'
import { Center, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import LoadingPage from '@/components/LoadingPage'
import CreateButton from '@/components/CreateButton'

import useVehicleNFTs from '@/hooks/useVehicleNFTs'
import VehicleContractRequestCreateModal from '@/components/Modal/VehicleContractRequestCreate'
import NoContracts from '@/components/Assets/NoContracts'
import {
  VehicleContract,
  VehicleInsuranceProposal,
  VehicleInsuranceRequest,
} from '@/types/contract'
import readContract from '@/utils/readContract'
import { useSigner } from '@usedapp/core'
import getInsuranceRequestsByTokenId from '@/utils/getInsuranceRequestsByTokenId'
import getContractsByTokenId from '@/utils/getContractsByTokenId'
import getInsuranceProposalsByTokenId from '@/utils/getInsuranceProposalsByTokenId'
import ContractCard from '@/components/ContractCard'

const ClientElement = () => {
  const [insuranceRequests, setInsuranceRequests] = useState<VehicleInsuranceRequest[]>([])
  const [insuranceProposals, setInsuranceProposals] = useState<VehicleInsuranceProposal[]>([])
  const [vehicleContracts, setVehicleContracts] = useState<VehicleContract[]>([])

  const [isLoadingData, setIsLoadingData] = useState<boolean>(true)

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

  const signer = useSigner()

  const loadInsuranceData = async () => {
    try {
      if (isLoadingVehiclesNFTs || !signer) return
      setIsLoadingData(true)

      const requests: VehicleInsuranceRequest[] = []
      const proposals: VehicleInsuranceProposal[] = []
      const contracts: VehicleContract[] = []

      await Promise.all(
        vehiclesNfts.map(async ({ tokenId }) => {
          const vehicleRequests = await getInsuranceRequestsByTokenId({ tokenId, signer })
          const vehicleProposals = await getInsuranceProposalsByTokenId({ tokenId, signer })
          const vehicleContracs = await getContractsByTokenId({ tokenId, signer })

          requests.push(...vehicleRequests)
          proposals.push(...vehicleProposals)
          contracts.push(...vehicleContracs)
        })
      )

      setInsuranceRequests(requests)
      setInsuranceProposals(proposals)
      setVehicleContracts(contracts)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoadingData(false)
    }
  }

  const isLoading = isLoadingVehiclesNFTs || isLoadingData
  const hasContent =
    !!insuranceRequests.length || !!insuranceProposals.length || !!vehicleContracts.length

  useEffect(() => {
    loadInsuranceData()
  }, [vehiclesNfts])

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
        {insuranceRequests.map((request) => (
          <ContractCard
            key={request.id}
            tokenId={request.tokenId}
            insurer={request.insurer}
            requestCreatedAt={request.createdAt}
            status="request"
          />
        ))}
        {insuranceProposals.map((proposal) => (
          <ContractCard
            key={proposal.id}
            tokenId={proposal.tokenId}
            insurer={proposal.insurer}
            requestCreatedAt={proposal.createdAt}
            status="proposal"
          />
        ))}
        {vehicleContracts.map((contract) => (
          <ContractCard
            key={contract.id}
            tokenId={contract.tokenId}
            insurer={contract.insurer}
            insuranceStartDate={contract.insuranceStartDate}
            insuranceEndDate={contract.insuranceEndDate}
            status="contract"
          />
        ))}
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
