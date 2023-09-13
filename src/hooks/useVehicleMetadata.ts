import { useEffect, useState } from 'react'
import { useSigner } from '@usedapp/core'
import contract from '@/lib/contract'
import { VehicleMetadata } from '@/types/contract'
import getVehicleNFTMetadataByTokenId from '@/utils/getVehicleNFTMetadataByTokenId'

const useVehicleMetadata = (tokenId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [metadata, setMetadata] = useState<VehicleMetadata>()

  const signer = useSigner()

  const load = async () => {
    if (!signer || !contract) return

    try {
      setIsLoading(true)

      const data = await getVehicleNFTMetadataByTokenId({ tokenId, signer })
      if (data) setMetadata(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (signer && contract) load()
  }, [signer, contract])

  return { metadata, isLoading, load }
}

export default useVehicleMetadata
