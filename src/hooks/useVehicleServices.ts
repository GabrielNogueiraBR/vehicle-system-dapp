import { useEffect, useState } from 'react'
import { VehicleService } from '@/types/contract'
import { useSigner } from '@usedapp/core'
import contract from '@/lib/contract'
import { ethers } from 'ethers'
import getVehicleServiceRecordById from '@/utils/getVehicleServiceRecordById'

const useVehicleServices = (tokenId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [services, setServices] = useState<VehicleService[]>([])

  const signer = useSigner()

  const load = async () => {
    if (!signer || !contract) return

    try {
      setIsLoading(true)

      const tx = contract.connect(signer).getVehicleServiceRecordIdsByTokenId(tokenId)
      const value = await tx
      const servicesIds = value.map((n) => Number(n))

      const servicesList: VehicleService[] = []

      await Promise.all(
        servicesIds.map(async (id) => {
          const vehicleService = await getVehicleServiceRecordById({ id, signer })
          if (vehicleService) servicesList.push(vehicleService)
        })
      )

      setServices(servicesList)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [signer, contract])

  return { services, isLoading, load }
}

export default useVehicleServices
