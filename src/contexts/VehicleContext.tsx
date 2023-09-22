'use client'

import React, { createContext, useContext, useMemo } from 'react'
import useVehicleServices from '@/hooks/useVehicleServices'
import useVehicleAccidents from '@/hooks/useVehicleAccidents'
import useVehicleContracts from '@/hooks/useVehicleContracts'
import useVehicleMetadata from '@/hooks/useVehicleMetadata'
import useOwnerOfToken from '@/hooks/useOwnerOfToken'
import { useAuth } from './AuthContext'
import { InsuranceStatus } from '@/types/contract'

interface VehicleContextData {
  tokenId: string
  useServices: ReturnType<typeof useVehicleServices>
  useAccidents: ReturnType<typeof useVehicleAccidents>
  useContract: ReturnType<typeof useVehicleContracts>
  useMetadata: ReturnType<typeof useVehicleMetadata>
  useOwner: ReturnType<typeof useOwnerOfToken>
  isInsurer: boolean
}

const VehicleContext = createContext({} as VehicleContextData)

interface VehicleProviderProps {
  tokenId: string
  children: React.ReactNode
}

export const VehicleProvider = ({ tokenId, children }: VehicleProviderProps) => {
  const { address, roles } = useAuth()

  const useServices = useVehicleServices(tokenId)
  const useAccidents = useVehicleAccidents(tokenId)
  const useContract = useVehicleContracts(tokenId)
  const useMetadata = useVehicleMetadata(tokenId)
  const useOwner = useOwnerOfToken(tokenId)

  const { contracts } = useContract

  const isInsurer = useMemo(
    () =>
      contracts.some(
        (contract) =>
          contract.insurer.toLowerCase() === address?.toLowerCase() &&
          contract.status === InsuranceStatus.ACTIVE
      ),
    [contracts, address]
  )

  return (
    <VehicleContext.Provider
      value={{ tokenId, useServices, useAccidents, useContract, useMetadata, useOwner, isInsurer }}
    >
      {children}
    </VehicleContext.Provider>
  )
}

export const useVehicle = () => useContext(VehicleContext)
