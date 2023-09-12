import { useEffect, useState } from 'react'
import { useSigner } from '@usedapp/core'
import contract from '@/lib/contract'
import { VehicleContract } from '@/types/contract'
import getContractsByTokenId from '@/utils/getContractsByTokenId'

const useVehicleContracts = (tokenId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [contracts, setContracts] = useState<VehicleContract[]>([])

  const signer = useSigner()

  const load = async () => {
    if (!signer || !contract) return

    try {
      setIsLoading(true)

      const data = await getContractsByTokenId({ tokenId, signer })

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
