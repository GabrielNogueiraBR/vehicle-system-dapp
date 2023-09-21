import contract from '@/lib/contract'
import { VehicleMetadata, VehicleOwnershipRecord } from '@/types/contract'
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

    const vehicleOwnershipRecords: VehicleOwnershipRecord[] = []

    await Promise.all(
      response.vehicleOwnershipRecordIds.map(async (id) => {
        try {
          const record = await readContract({
            signer,
            functionName: 'getVehicleOwnershipRecordById',
            args: [tokenId, id],
          })

          if (!record) return Promise.resolve()

          const { driverLicenseCode, federalUnit, county, vehiclePlate, year, startDate, endDate } =
            record

          const vehicleOwnershipRecord: VehicleOwnershipRecord = {
            driverLicenseCode,
            federalUnit,
            county,
            vehiclePlate,
            year,
            startDate: new Date(Number(startDate) * 1000),
            endDate: new Date(Number(endDate) * 1000),
          }

          vehicleOwnershipRecords.push(vehicleOwnershipRecord)
        } catch (e) {
          console.error('Error on get Vehicle Ownership Record')
        }
      })
    )

    const data: VehicleMetadata = {
      vehicleRegistrationCode: response.vehicleRegistrationCode,
      carBrand: response.carBrand,
      carModel: response.carModel,
      manufacturingDate,
      vehicleOwnershipRecordIds: response.vehicleOwnershipRecordIds.map((id) => Number(id)),
      vehicleOwnershipRecords,
    }

    return data
  } catch (e) {
    console.error(e)
    return
  }
}

export default getVehicleNFTMetadataByTokenId
