'use client'

import { useEffect, useState } from 'react'
import { useSigner } from '@usedapp/core'
import contract from '@/lib/contract'
import { VehicleAccident } from '@/types/contract'

const useVehicleAccidents = (tokenId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [accidents, setAccidents] = useState<VehicleAccident[]>([])

  const signer = useSigner()

  const load = async () => {
    if (!signer || !contract) return

    try {
      setIsLoading(true)

      const tx = contract.connect(signer).getVehicleAccidentRecordIdsByTokenId(tokenId)
      const value = await tx
      const ids = value.map((n) => Number(n))

      const data: VehicleAccident[] = []

      await Promise.all(
        ids.map(async (id) => {
          const tx = contract.connect(signer).getVehicleAccidentRecordById(id)
          const value = await tx

          const {
            vehicleOwner,
            insurer,
            tokenId,
            insuranceId,
            description,
            accidentDate,
            vehicleServicesIds,
            createdAt,
            updatedAt,
          } = value

          data.push({
            id,
            vehicleOwner,
            insurer,
            tokenId: Number(tokenId),
            insuranceId: Number(insuranceId),
            description,
            accidentDate: new Date(Number(accidentDate) * 1000),
            vehicleServicesIds: vehicleServicesIds.map((id) => Number(id)),
            createdAt: new Date(Number(createdAt) * 1000),
            updatedAt: new Date(Number(updatedAt) * 1000),
          })
        })
      )

      setAccidents(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [signer, contract])

  return { accidents, isLoading, load }
}

export default useVehicleAccidents
