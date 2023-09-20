import contract from '@/lib/contract'
import { Status, VehicleInsuranceProposal, VehicleInsuranceRequest } from '@/types/contract'
import { useSigner } from '@usedapp/core'
import readContract from './readContract'
import { ethers } from 'ethers'

type Params = {
  tokenId: string
  signer: ReturnType<typeof useSigner>
}

const getInsuranceProposalsByTokenId = async ({ tokenId, signer }: Params) => {
  try {
    if (!contract || !signer) throw new Error('Signer or contract invalid')

    const proposalIds = await readContract({
      signer,
      functionName: 'getVehicleInsuranceProposalIdsByTokenId',
      args: [tokenId],
    })

    if (!proposalIds) throw Error('Error on get vehicle insurance proposals')

    const proposals: VehicleInsuranceProposal[] = []

    await Promise.all(
      proposalIds.map(async (proposalId) => {
        try {
          const data = await readContract({
            signer,
            functionName: 'getVehicleInsuranceProposalById',
            args: [proposalId],
          })
          if (!data) return Promise.resolve()

          // Only pending requests
          if (data.status !== Status.PENDING) return Promise.resolve()

          const {
            requester,
            insurer,
            tokenId,
            insuranceStartDate,
            insuranceEndDate,
            price,
            contractUrl,
            status,
            createdAt,
            updatedAt,
          } = data

          const insuranceProposal: VehicleInsuranceProposal = {
            id: Number(proposalId),
            requester,
            insurer,
            tokenId: Number(tokenId),
            insuranceStartDate: new Date(Number(insuranceStartDate) * 1000),
            insuranceEndDate: new Date(Number(insuranceEndDate) * 1000),
            price: Number(ethers.utils.formatEther(price)),
            contractUrl,
            status,
            createdAt: new Date(Number(createdAt) * 1000),
            updatedAt: new Date(Number(updatedAt) * 1000),
          }

          proposals.push(insuranceProposal)

          return Promise.resolve()
        } catch (e) {
          console.error(e)
          return Promise.resolve()
        }
      })
    )

    return proposals
  } catch (e) {
    console.error(e)
    return []
  }
}

export default getInsuranceProposalsByTokenId
