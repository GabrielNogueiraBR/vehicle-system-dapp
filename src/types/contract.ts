export enum InsuranceStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
}

export type VehicleService = {
  id: number
  requester: string
  tokenId: number
  title: string
  description: string
  price: number
  date: number
  createdAt: number
}

export type VehicleAccident = {
  id: number
  vehicleOwner: string
  insurer: string
  tokenId: number
  insuranceId: number
  description: string
  accidentDate: number
  vehicleServicesIds: number[]
  createdAt: number
  updatedAt: number
}

export type VehicleContract = {
  id: number
  requester: string
  insurer: string
  tokenId: number
  contractUrl: string
  insuranceStartDate: number
  insuranceEndDate: number
  vehicleServicesIds: number[]
  status: InsuranceStatus
  createdAt: number
  updatedAt: number
}
