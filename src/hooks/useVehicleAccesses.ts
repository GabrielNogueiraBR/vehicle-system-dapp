'use client'

import { useEffect, useState } from 'react'
import { useSigner } from '@usedapp/core'
import contract from '@/lib/contract'
import { Access } from '@/types/contract'
import { useWeb3 } from '@/contexts/Web3Context'

const useVehicleAccesses = (tokenId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [accesses, setAccesses] = useState<Access[]>([])

  const signer = useSigner()
  const { giveVehicleAccessByTokenId, revokeVehicleAccessByTokenId } = useWeb3()

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

  const giveAccess = async (address: string, expirationDate: Date): Promise<boolean> => {
    if (!signer || !contract) return false
    try {
      const expiration = expirationDate.getTime() / 1000
      await giveVehicleAccessByTokenId.send(tokenId, address, expiration)
      await load()
      return true
    } catch (e) {
      console.error(e)
      return false
    } finally {
    }
  }

  const revoke = async (address: string): Promise<boolean> => {
    if (!signer || !contract) return false
    try {
      await revokeVehicleAccessByTokenId.send(tokenId, address)
      await load()
      await load()
      return true
    } catch (e) {
      console.error(e)
      return false
    } finally {
    }
  }

  useEffect(() => {
    load()
  }, [signer, contract])

  return { accesses, isLoading, load, revoke, giveAccess }
}

export default useVehicleAccesses
