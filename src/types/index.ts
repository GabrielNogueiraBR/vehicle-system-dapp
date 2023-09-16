import { OwnedNft } from 'alchemy-sdk'
import { VehicleContract, VehicleMetadata } from './contract'

export interface VehicleNFT extends OwnedNft {
  vehicleMetadata?: VehicleMetadata
  contracts: VehicleContract[]
}