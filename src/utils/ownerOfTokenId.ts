import contract from '@/lib/contract'
import { VehicleMetadata } from '@/types/contract'
import { useSigner } from '@usedapp/core'
import readContract from './readContract'

type Params = {
  tokenId: string
  signer: ReturnType<typeof useSigner>
}

const ownerOfTokenId = async ({ tokenId, signer }: Params) => {
  try {
    if (!contract || !signer) throw new Error('Signer or contract invalid')

    const data = await readContract({
      signer,
      functionName: 'ownerOf',
      args: [tokenId],
    })

    if (!data) throw Error('Error on get owner of vehicle tokenId')

    return data
  } catch (e) {
    console.error(e)
    return null
  }
}

export default ownerOfTokenId
