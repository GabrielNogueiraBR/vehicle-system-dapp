'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSigner } from '@usedapp/core'
import contract from '@/lib/contract'
import ownerOfTokenId from '@/utils/ownerOfTokenId'

const useOwnerOfToken = (tokenId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [owner, setOwner] = useState<string>()
  const [signerAddress, setSignerAddress] = useState<string>()

  const signer = useSigner()

  const isOwner = useMemo(
    () => owner?.toLowerCase() === signerAddress?.toLowerCase(),
    [owner, signer]
  )

  const load = async () => {
    if (!signer || !contract) return

    try {
      setIsLoading(true)

      const data = await ownerOfTokenId({ tokenId, signer })
      if (data) setOwner(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (signer && contract) load()
  }, [signer, contract])

  useEffect(() => {
    signer?.getAddress().then((address) => setSignerAddress(address))
  }, [signer])

  return { owner, isOwner, isLoading, load }
}

export default useOwnerOfToken
