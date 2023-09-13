import contract from '@/lib/contract'
import { VehicleMetadata } from '@/types/contract'
import { useSigner } from '@usedapp/core'
import readContract from './readContract'
import ownerOfTokenId from './ownerOfTokenId'

type Params = {
  tokenId: string
  signer: ReturnType<typeof useSigner>
}

const getVehicleNFTMetadataByTokenId = async ({ tokenId, signer }: Params) => {
  try {
    if (!contract || !signer) throw new Error('Signer or contract invalid')

    const response = await readContract({
      signer,
      functionName: 'getVehicleNFTMetadataByTokenId',
      args: [tokenId],
    })

    if (!response) throw Error('Error on get vehicle metadata')

    const manufacturingDate = new Date(Number(response.manufacturingDate) * 1000)
    const owner = await ownerOfTokenId({ tokenId, signer })

    const data: VehicleMetadata = {
      owner: owner || '0x00',
      vehicleRegistrationCode: response.vehicleRegistrationCode,
      carBrand: response.carBrand,
      carModel: response.carModel,
      manufacturingDate,
      vehicleOwnershipRecordIds: response.vehicleOwnershipRecordIds.map((id) => Number(id)),
    }

    return data
  } catch (e) {
    console.error(e)
    return null
  }
}

export default getVehicleNFTMetadataByTokenId
