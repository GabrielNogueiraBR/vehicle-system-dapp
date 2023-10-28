'use client'

import { GetNftsForAddressResponse } from '@/app/api/vehicles/[address]/get'
import api from '@/services/api'
import { SharedVehicleNFT, VehicleNFT } from '@/types'
import getContractsByTokenId from '@/utils/getContractsByTokenId'
import getVehicleNFTMetadataByTokenId from '@/utils/getVehicleNFTMetadataByTokenId'
import readContract from '@/utils/readContract'
import { useEthers, useSigner } from '@usedapp/core'
import { useEffect, useState } from 'react'

const useVehicleNFTs = () => {
  const { account } = useEthers()
  const signer = useSigner()

  const [vehiclesNfts, setVehiclesNfts] = useState<VehicleNFT[]>([])
  const [sharedVehiclesNfts, setSharedVehiclesNfts] = useState<SharedVehicleNFT[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const loadOwnedVehicles = async () => {
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
      }),
    )

    setVehiclesNfts(nfts)
  }

  const loadSharedVehicles = async () => {
    try {
      const sharedNFTs: SharedVehicleNFT[] = []

      if (!signer || !account) throw new Error('Invalid')

      const tokenIds = await readContract({
        signer,
        functionName: 'listTokenIdsWithAccess',
        args: [],
      })

      if (!tokenIds) throw Error('Error on get vehicles shared')

      await Promise.all(
        tokenIds.map(async (tokenId) => {
          const vehicleMetadata = await getVehicleNFTMetadataByTokenId({
            tokenId: String(tokenId),
            signer,
          })

          const sharedVehicle: SharedVehicleNFT = {
            tokenId: String(tokenId),
            vehicleMetadata,
          }

          sharedNFTs.push(sharedVehicle)
        }),
      )

      setSharedVehiclesNfts(sharedNFTs)
    } catch (e) {
      console.error('Error on load shared vehicles')
    }
  }

  const loadVehiclesByAddress = async () => {
    try {
      setIsLoading(true)

      const ownedNFTs = loadOwnedVehicles()
      const sharedNFTs = loadSharedVehicles()

      await Promise.all([ownedNFTs, sharedNFTs])
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (account && signer) loadVehiclesByAddress()
  }, [account, signer])

  return { vehiclesNfts, sharedVehiclesNfts, isLoading, load: loadVehiclesByAddress }
}

export default useVehicleNFTs
