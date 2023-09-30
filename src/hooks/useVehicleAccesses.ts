'use client'

import { useEffect, useState } from 'react'
import { useSigner } from '@usedapp/core'
import contract from '@/lib/contract'
import { Access } from '@/types/contract'

const useVehicleAccesses = (tokenId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [accesses, setAccesses] = useState<Access[]>([])

  const signer = useSigner()

  const load = async () => {
    if (!signer || !contract) return

    try {
      setIsLoading(true)

      const tx = contract.connect(signer).listAccessByTokenId(tokenId)
      const addresses = await tx

      const data: Access[] = []

      await Promise.all(
        addresses.map(async (address) => {
          const tx = contract.connect(signer).getAccessByTokenId(tokenId, address)
          const value = await tx

          const { expirationDate, updatedAt, createdAt } = value

          const access: Access = {
            tokenId: Number(tokenId),
            address,
            expirationDate: new Date(Number(expirationDate) * 1000),
            createdAt: new Date(Number(createdAt) * 1000),
            updatedAt: new Date(Number(updatedAt) * 1000),
          }

          data.push(access)
        })
      )

      setAccesses(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [signer, contract])

  return { accesses, isLoading, load }
}

export default useVehicleAccesses
