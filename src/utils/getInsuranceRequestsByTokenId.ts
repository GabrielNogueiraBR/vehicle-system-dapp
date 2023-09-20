import contract from '@/lib/contract'
import { Status, VehicleInsuranceRequest } from '@/types/contract'
import { useSigner } from '@usedapp/core'
import readContract from './readContract'

type Params = {
  tokenId: string
  signer: ReturnType<typeof useSigner>
}

const getInsuranceRequestsByTokenId = async ({ tokenId, signer }: Params) => {
  try {
    if (!contract || !signer) throw new Error('Signer or contract invalid')

    const requestsIds = await readContract({
      signer,
      functionName: 'getVehicleInsuranceRequestIdsByTokenId',
      args: [tokenId],
    })

    if (!requestsIds) throw Error('Error on get vehicle insurance requests')

    const requests: VehicleInsuranceRequest[] = []

    await Promise.all(
      requestsIds.map(async (requestId) => {
        try {
          const data = await readContract({
            signer,
            functionName: 'getVehicleInsuranceRequestById',
            args: [requestId],
          })
          if (!data) return Promise.resolve()

          // Only pending requests
          if (data.status !== Status.PENDING) return Promise.resolve()

          const { requester, insurer, tokenId, status, createdAt, updatedAt } = data

          const insuranceRequests: VehicleInsuranceRequest = {
            id: Number(requestId),
            requester,
            insurer,
            tokenId: Number(tokenId),
            status,
            createdAt: new Date(Number(createdAt) * 1000),
            updatedAt: new Date(Number(updatedAt) * 1000),
          }

          requests.push(insuranceRequests)

          return Promise.resolve()
        } catch (e) {
          console.error(e)
          return Promise.resolve()
        }
      })
    )

    return requests
  } catch (e) {
    console.error(e)
    return []
  }
}

export default getInsuranceRequestsByTokenId
