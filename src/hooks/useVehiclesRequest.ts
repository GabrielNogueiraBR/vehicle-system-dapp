import { GetNftsForAddressResponse } from '@/app/api/vehicles/[address]/get'
import api from '@/services/api'
import { OwnedNft } from 'alchemy-sdk'
import { useEffect, useState } from 'react'

const useVehicleRequests = (address: string) => {
  const [vehiclesNfts, setVehiclesNfts] = useState<OwnedNft[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loadVehiclesByAddress = async (address: string) => {
    try {
      if (isLoading) return
      setIsLoading(true)

      const response = await api.get<GetNftsForAddressResponse>(`/vehicles/${address}`)
      const { nfts } = response.data
      setVehiclesNfts(nfts)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadVehiclesByAddress(address)
  }, [address])

  return { vehiclesNfts, isLoading }
}

export default useVehicleRequests
