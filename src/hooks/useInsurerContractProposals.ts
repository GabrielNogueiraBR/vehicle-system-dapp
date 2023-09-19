'use client'

import { VehicleInsuranceProposal, VehicleInsuranceRequest } from '@/types/contract'
import readContract from '@/utils/readContract'
import { useEthers, useSigner } from '@usedapp/core'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

const useInsurerContractProposals = () => {
  const { account } = useEthers()
  const signer = useSigner()

  const [contractProposals, setContractProposals] = useState<VehicleInsuranceProposal[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const loadInsuranceProposals = async () => {
    try {
      setIsLoading(true)
      if (!signer || !account) throw new Error('Invalid')

      const proposalsIds = await readContract({
        signer,
        functionName: 'getVehicleInsuranceProposalIdsByInsurer',
        args: [],
      })
      if (!proposalsIds) throw Error('Error on get contract requests')

      const newContractProposals: VehicleInsuranceProposal[] = []

      await Promise.all(
        proposalsIds.map(async (proposalId) => {
          try {
            const data = await readContract({
              signer,
              functionName: 'getVehicleInsuranceProposalById',
              args: [proposalId],
            })
            if (!data) return Promise.resolve()

            const {
              requester,
              insurer,
              tokenId,
              insuranceStartDate,
              insuranceEndDate,
              price,
              contractUrl,
              status,
              createdAt,
              updatedAt,
            } = data

            const insuranceProposal: VehicleInsuranceProposal = {
              id: Number(proposalId),
              requester,
              insurer,
              tokenId: Number(tokenId),
              insuranceStartDate: new Date(Number(insuranceStartDate) * 1000),
              insuranceEndDate: new Date(Number(insuranceEndDate) * 1000),
              price: Number(ethers.utils.formatEther(price)),
              contractUrl,
              status,
              createdAt: new Date(Number(createdAt) * 1000),
              updatedAt: new Date(Number(updatedAt) * 1000),
            }

            newContractProposals.push(insuranceProposal)

            return Promise.resolve()
          } catch (e) {
            console.error(e)
            return Promise.resolve()
          }
        })
      )

      setContractProposals(newContractProposals)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (account && signer) loadInsuranceProposals()
  }, [account, signer])

  return { contractProposals, isLoading, load: loadInsuranceProposals }
}

export default useInsurerContractProposals
