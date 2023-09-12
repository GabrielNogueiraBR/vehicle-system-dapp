import { GetNftsForAddressResponse } from '@/app/api/vehicles/[address]/get'
import api from '@/services/api'
import { VehicleNFT } from '@/types'
import readContract from '@/utils/readContract'
import { useEthers, useSigner } from '@usedapp/core'
import { useEffect, useState } from 'react'

const useVehicleRequests = () => {
  const { account } = useEthers()
  const signer = useSigner()

  const [vehiclesNfts, setVehiclesNfts] = useState<VehicleNFT[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loadVehiclesByAddress = async (address: string) => {
    try {
      if (isLoading) return
      setIsLoading(true)

      const response = await api.get<GetNftsForAddressResponse>(`/vehicles/${address}`)
      const { nfts: ownedNFTs } = response.data

      const nfts: VehicleNFT[] = await Promise.all(
        ownedNFTs.map(async (ownedNFT) => {
          const response = await readContract({
            signer,
            functionName: 'getVehicleNFTMetadataByTokenId',
            args: [1],
          })

          const nft: VehicleNFT = {
            ...ownedNFT,
            vehicleRegistrationCode: response?.vehicleRegistrationCode || 'no',
            carBrand: response?.carBrand || 'no',
            carModel: response?.carModel || 'no',
            manufacturingDate: Number(response?.manufacturingDate || (0 as number)),
            vehicleOwnershipRecordIds:
              response?.vehicleOwnershipRecordIds.map((id) => Number(id)) || ([] as number[]),
          }

          return nft
        })
      )

      setVehiclesNfts(nfts)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (account && signer) loadVehiclesByAddress(account)
  }, [account, signer])

  return { vehiclesNfts, isLoading, load: loadVehiclesByAddress }
}

export default useVehicleRequests
