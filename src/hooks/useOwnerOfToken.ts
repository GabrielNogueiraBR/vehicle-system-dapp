import { useEffect, useState } from 'react'
import { useSigner } from '@usedapp/core'
import contract from '@/lib/contract'
import ownerOfTokenId from '@/utils/ownerOfTokenId'

const useOwnerOfToken = (tokenId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [owner, setOwner] = useState<string>()

  const signer = useSigner()

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

  return { owner, isLoading, load }
}

export default useOwnerOfToken
