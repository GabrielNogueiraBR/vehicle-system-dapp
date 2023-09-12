import { OwnedNft } from 'alchemy-sdk'
import { VehicleContract } from './contract'

export interface VehicleNFT extends OwnedNft {
  vehicleRegistrationCode: string
  carBrand: string
  carModel: string
  manufacturingDate: number
  vehicleOwnershipRecordIds: number[]
  contracts: VehicleContract[]
}
