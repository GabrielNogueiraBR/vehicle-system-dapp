'use client'

import { InsuranceStatus, Status, VehicleContract, VehicleInsuranceRequest } from '@/types/contract'
import readContract from '@/utils/readContract'
import { useEthers, useSigner } from '@usedapp/core'
import { useEffect, useState } from 'react'

const useInsurerContracts = () => {
  const { account } = useEthers()
  const signer = useSigner()

  const [contracts, setContracts] = useState<VehicleContract[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const loadInsuranceContracts = async () => {
    try {
      setIsLoading(true)
      if (!signer || !account) throw new Error('Invalid')

      const contractIds = await readContract({
        signer,
        functionName: 'getVehicleInsuranceContractIdsByInsurer',
        args: [],
      })
      if (!contractIds) throw Error('Error on get contracts of insurer')

      const newContracts: VehicleContract[] = []

      await Promise.all(
        contractIds.map(async (contractId) => {
          try {
            const data = await readContract({
              signer,
              functionName: 'getVehicleInsuranceContractById',
              args: [contractId],
            })
            if (!data) return Promise.resolve()

            const {
              requester,
              insurer,
              tokenId,
              contractUrl,
              insuranceStartDate,
              insuranceEndDate,
              vehicleServicesIds,
              createdAt,
              updatedAt,
            } = data

            const nowTime = Date.now() / 1000
            const status =
              Number(insuranceStartDate) <= nowTime && nowTime <= Number(insuranceEndDate)
                ? InsuranceStatus.ACTIVE
                : InsuranceStatus.EXPIRED

            const contract: VehicleContract = {
              id: Number(contractId),
              requester,
              insurer,
              tokenId: Number(tokenId),
              contractUrl,
              insuranceStartDate: new Date(Number(insuranceStartDate) * 1000),
              insuranceEndDate: new Date(Number(insuranceEndDate) * 1000),
              status,
              vehicleServicesIds: vehicleServicesIds.map((id) => Number(id)),
              createdAt: Number(createdAt),
              updatedAt: Number(updatedAt),
            }

            newContracts.push(contract)

            return Promise.resolve()
          } catch (e) {
            console.error(e)
            return Promise.resolve()
          }
        })
      )

      setContracts(newContracts)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (account && signer) loadInsuranceContracts()
  }, [account, signer])

  return { contracts, isLoading, load: loadInsuranceContracts }
}

export default useInsurerContracts
