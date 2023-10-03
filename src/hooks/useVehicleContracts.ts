'use client'

import { useEffect, useMemo, useState } from 'react'
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

      const userContracts = await getContractsByTokenId({ tokenId, signer })
      const insurerContracts = await getContractsByTokenId({ tokenId, isInsurer: true, signer })

      // unique contracts
      const data = [...userContracts, ...insurerContracts].filter(
        (value, index, array) => array.indexOf(value) === index
      )

      setContracts(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (signer && contract) load()
  }, [signer, contract])

  return { contracts, isLoading, load }
}

export default useVehicleContracts
