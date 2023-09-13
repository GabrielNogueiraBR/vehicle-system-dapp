import contract from '@/lib/contract'
import { VehicleMetadata } from '@/types/contract'
import { useSigner } from '@usedapp/core'
import readContract from './readContract'

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

    const data: VehicleMetadata = {
      vehicleRegistrationCode: response.vehicleRegistrationCode,
      carBrand: response.carBrand,
      carModel: response.carModel,
      manufacturingDate: Number(response.manufacturingDate),
      vehicleOwnershipRecordIds: response.vehicleOwnershipRecordIds.map((id) => Number(id)),
    }

    return data
  } catch (e) {
    console.error(e)
    return {
      vehicleRegistrationCode: 'no code',
      carBrand: 'no brand',
      carModel: 'no model',
      manufacturingDate: 0,
      vehicleOwnershipRecordIds: [],
    }
  }
}

export default getVehicleNFTMetadataByTokenId
