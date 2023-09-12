import { OwnedNft } from 'alchemy-sdk'

export interface VehicleNFT extends OwnedNft {
  vehicleRegistrationCode: string
  carBrand: string
  carModel: string
  manufacturingDate: number
  vehicleOwnershipRecordIds: number[]
}
