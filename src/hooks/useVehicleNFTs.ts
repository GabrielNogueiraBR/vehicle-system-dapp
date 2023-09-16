'use client'

import { GetNftsForAddressResponse } from '@/app/api/vehicles/[address]/get'
import api from '@/services/api'
import { VehicleNFT } from '@/types'
import getContractsByTokenId from '@/utils/getContractsByTokenId'
import getVehicleNFTMetadataByTokenId from '@/utils/getVehicleNFTMetadataByTokenId'
import { useEthers, useSigner } from '@usedapp/core'
import { useEffect, useState } from 'react'

const useVehicleNFTs = () => {
  const { account } = useEthers()
  const signer = useSigner()

  const [vehiclesNfts, setVehiclesNfts] = useState<VehicleNFT[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const loadVehiclesByAddress = async () => {
    try {
      setIsLoading(true)
      if (!signer || !account) throw new Error('Invalid')

      const response = await api.get<GetNftsForAddressResponse>(`/vehicles/${account}`)
      const { nfts: ownedNFTs } = response.data

      const nfts: VehicleNFT[] = await Promise.all(
        ownedNFTs.map(async (ownedNFT) => {
          const vehicleMetadata = await getVehicleNFTMetadataByTokenId({
            tokenId: ownedNFT.tokenId,
            signer,
          })
          const contracts = await getContractsByTokenId({ tokenId: ownedNFT.tokenId, signer })

          const nft: VehicleNFT = {
            ...ownedNFT,
            vehicleMetadata,
            contracts,
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
    if (account && signer) loadVehiclesByAddress()
  }, [account, signer])

  return { vehiclesNfts, isLoading, load: loadVehiclesByAddress }
}

export default useVehicleNFTs