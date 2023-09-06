export type VehicleService = {
  requester: string
  tokenId: number
  title: string
  description: string
  price: number
  date: number
  createdAt: number
}

export type VehicleAccident = {
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
  requester: string
  insurer: string
  tokenId: number
  contractUrl: string
  insuranceStartDate: number
  insuranceEndDate: number
  vehicleServicesIds: number[]
  createdAt: number
  updatedAt: number
}
