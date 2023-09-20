'use client'

import { Status, VehicleInsuranceRequest } from '@/types/contract'
import readContract from '@/utils/readContract'
import { useEthers, useSigner } from '@usedapp/core'
import { useEffect, useState } from 'react'

const useInsurerContractRequests = () => {
  const { account } = useEthers()
  const signer = useSigner()

  const [contractRequests, setContractRequests] = useState<VehicleInsuranceRequest[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const loadInsuranceRequests = async () => {
    try {
      setIsLoading(true)
      if (!signer || !account) throw new Error('Invalid')

      const requestsIds = await readContract({
        signer,
        functionName: 'getVehicleInsuranceRequestIdsByInsurer',
        args: [],
      })
      if (!requestsIds) throw Error('Error on get contract requests')

      const newContractRequests: VehicleInsuranceRequest[] = []

      await Promise.all(
        requestsIds.map(async (requestId) => {
          try {
            const data = await readContract({
              signer,
              functionName: 'getVehicleInsuranceRequestById',
              args: [requestId],
            })
            if (!data) return Promise.resolve()

            // Only pending requests
            if (data.status !== Status.PENDING) return Promise.resolve()

            const { requester, insurer, tokenId, status, createdAt, updatedAt } = data

            const insuranceRequests: VehicleInsuranceRequest = {
              id: Number(requestId),
              requester,
              insurer,
              tokenId: Number(tokenId),
              status,
              createdAt: new Date(Number(createdAt) * 1000),
              updatedAt: new Date(Number(updatedAt) * 1000),
            }

            newContractRequests.push(insuranceRequests)

            return Promise.resolve()
          } catch (e) {
            console.error(e)
            return Promise.resolve()
          }
        })
      )

      setContractRequests(newContractRequests)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (account && signer) loadInsuranceRequests()
  }, [account, signer])

  return { contractRequests, isLoading, load: loadInsuranceRequests }
}

export default useInsurerContractRequests
