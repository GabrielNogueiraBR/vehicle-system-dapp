import { useEffect, useState } from 'react'
import { useSigner } from '@usedapp/core'
import contract from '@/lib/contract'
import { VehicleContract } from '@/types/contract'

const useVehicleContracts = (tokenId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [contracts, setContracts] = useState<VehicleContract[]>([])

  const signer = useSigner()

  const load = async () => {
    if (!signer || !contract) return

    try {
      setIsLoading(true)

      const tx = contract.connect(signer).getVehicleInsuranceContractIdsByTokenId(tokenId)
      const value = await tx
      const ids = value.map((n) => Number(n))

      const data: VehicleContract[] = []

      await Promise.all(
        ids.map(async (id) => {
          const tx = contract.connect(signer).getVehicleInsuranceContractById(id)
          const value = await tx

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
          } = value

          data.push({
            id,
            requester,
            insurer,
            tokenId: Number(tokenId),
            contractUrl,
            insuranceStartDate: Number(insuranceStartDate),
            insuranceEndDate: Number(insuranceEndDate),
            vehicleServicesIds: vehicleServicesIds.map((id) => Number(id)),
            createdAt: Number(createdAt),
            updatedAt: Number(updatedAt),
          })
        })
      )

      setContracts(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [signer, contract])

  return { contracts, isLoading, load }
}

export default useVehicleContracts
