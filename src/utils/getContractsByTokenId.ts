import contract from '@/lib/contract'
import { InsuranceStatus, VehicleContract } from '@/types/contract'
import { useSigner } from '@usedapp/core'

type Params = {
  tokenId: string
  isInsurer?: boolean
  signer: ReturnType<typeof useSigner>
}

const getContractsByTokenId = async ({ tokenId, isInsurer = false, signer }: Params) => {
  try {
    if (!contract || !signer) throw new Error('Signer or contract invalid')
    const functionName = isInsurer ? 'getVehicleInsuranceContractIdsByInsurerAndTokenId' : 'getVehicleInsuranceContractIdsByTokenId'

    const tx = contract.connect(signer)[functionName](tokenId)
    const value = await tx
    const ids = value.map((n) => Number(n))

    const data: VehicleContract[] = []

    await Promise.all(
      ids.map(async (id) => {
        const tx = contract.connect(signer).getVehicleInsuranceContractById(id)
        const value = await tx

        const {
          requester,
          insurer,
          tokenId,
          contractUrl,
          insuranceStartDate,
          insuranceEndDate,
          vehicleServicesIds,
          createdAt,
          updatedAt,
        } = value

        const nowTime = Date.now() / 1000
        const status =
          Number(insuranceStartDate) <= nowTime && nowTime <= Number(insuranceEndDate)
            ? InsuranceStatus.ACTIVE
            : InsuranceStatus.EXPIRED

        data.push({
          id,
          requester,
          insurer,
          tokenId: Number(tokenId),
          contractUrl,
          insuranceStartDate: new Date(Number(insuranceStartDate) * 1000),
          insuranceEndDate: new Date(Number(insuranceEndDate) * 1000),
          status,
          vehicleServicesIds: vehicleServicesIds.map((id) => Number(id)),
          createdAt: Number(createdAt),
          updatedAt: Number(updatedAt),
        })
      })
    )

    return data
  } catch (e) {
    console.error(e)
    return []
  }
}

export default getContractsByTokenId
