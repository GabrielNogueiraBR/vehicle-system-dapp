export enum Status {
  PENDING,
  APPROVED,
  COMPLETED,
  CANCEL,
}

export enum InsuranceStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
}

export type VehicleOwnershipRecord = {
  driverLicenseCode: string
  federalUnit: string
  county: string
  vehiclePlate: string
  year: string
  startDate: Date
  endDate: Date
}

export type VehicleRequestData = {
  carBrand: string
  carModel: string
  manufacturingDate: Date
  vehicleOwnershipRecordIds: number[]
  vehicleOwnershipRecords?: VehicleOwnershipRecord[]
}

export type VehicleRequest = {
  id: number
  requester: string
  agent: string
  vehicleRegistrationCode: string
  vehicleData: VehicleRequestData
  status: Status
  createdAt: Date
  updatedAt: Date
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

export type VehicleInsuranceRequest = {
  id: string
  requester: string
  insurer: string
  tokenId: number
  status: Status
  createdAt: Date
  updatedAt: Date
}

export type VehicleInsuranceProposal = {
  id: string
  requester: string
  insurer: string
  tokenId: number
  insuranceStartDate: number
  insuranceEndDate: number
  price: number
  contractUrl: string
  status: Status
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

export type VehicleMetadata = {
  vehicleRegistrationCode: string
  carBrand: string
  carModel: string
  manufacturingDate: Date
  vehicleOwnershipRecordIds: number[]
}
