import { OwnedNft } from 'alchemy-sdk'
import { VehicleContract, VehicleMetadata } from './contract'
import { useContractFunction } from '@usedapp/core'

export interface VehicleNFT extends OwnedNft {
  vehicleMetadata?: VehicleMetadata
  contracts: VehicleContract[]
}

export interface SharedVehicleNFT {
  tokenId: string
  vehicleMetadata?: VehicleMetadata
}

export type ReturnOfFunction = Awaited<ReturnType<ReturnType<typeof useContractFunction>['send']>>

export type Role = 'user' | 'agent' | 'insurer' | 'admin'
