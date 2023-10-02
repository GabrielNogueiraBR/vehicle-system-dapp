import useReadContract from '@/hooks/useReadContract'
import contract from '@/lib/contract'
import { useContractFunction } from '@usedapp/core'
import React, { createContext, useContext, useEffect } from 'react'

interface Web3ContextData {
  listAgents: ReturnType<typeof useReadContract<'listAgents'>>
  listInsurers: ReturnType<typeof useReadContract<'listInsurers'>>
  userRegistration: ReturnType<typeof useContractFunction>
  defineDriverLicenseCode: ReturnType<typeof useContractFunction>
  addVehicleServiceRecord: ReturnType<typeof useContractFunction>
  createVehicleRequest: ReturnType<typeof useContractFunction>
  createVehicle: ReturnType<typeof useContractFunction>
  approveVehicleRequest: ReturnType<typeof useContractFunction>
  createVehicleInsuranceRequest: ReturnType<typeof useContractFunction>
  createVehicleInsuranceProposal: ReturnType<typeof useContractFunction>
  contractVehicleInsuranceProposal: ReturnType<typeof useContractFunction>
  registerVehicleAccidentRecord: ReturnType<typeof useContractFunction>
  insurerAddVehicleServiceRecord: ReturnType<typeof useContractFunction>
  giveVehicleAccessByTokenId: ReturnType<typeof useContractFunction>
  revokeVehicleAccessByTokenId: ReturnType<typeof useContractFunction>
}

export const Web3Context = createContext({} as Web3ContextData)

interface Web3ProviderProps {
  children: React.ReactNode
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  const listAgents = useReadContract({ functionName: 'listAgents', args: [] })
  const listInsurers = useReadContract({ functionName: 'listInsurers', args: [] })

  const userRegistration = useContractFunction(contract, 'userRegistration', {
    transactionName: 'User Registration',
  })

  const defineDriverLicenseCode = useContractFunction(contract, 'defineDriverLicenseCode', {
    transactionName: 'Define Driver License Code',
  })

  const addVehicleServiceRecord = useContractFunction(contract, 'addVehicleServiceRecord', {
    transactionName: 'Add Vehicle Service Record',
  })

  const createVehicleRequest = useContractFunction(contract, 'createVehicleRequest', {
    transactionName: 'Create Vehicle Request',
  })

  const createVehicle = useContractFunction(contract, 'createVehicle', {
    transactionName: 'Create Vehicle',
  })

  const approveVehicleRequest = useContractFunction(contract, 'approveVehicleRequest', {
    transactionName: 'Aprove Vehicle Request',
  })

  const createVehicleInsuranceRequest = useContractFunction(
    contract,
    'createVehicleInsuranceRequest',
    {
      transactionName: 'Create Vehicle Insurance Request',
    }
  )

  const createVehicleInsuranceProposal = useContractFunction(
    contract,
    'createVehicleInsuranceProposal',
    { transactionName: 'Create Vehicle Insurance Proposal' }
  )

  const contractVehicleInsuranceProposal = useContractFunction(
    contract,
    'contractVehicleInsuranceProposal',
    { transactionName: 'Contract Vehicle Insurance Proposal' }
  )

  const registerVehicleAccidentRecord = useContractFunction(
    contract,
    'registerVehicleAccidentRecord',
    {
      transactionName: 'Register Vehicle Accident Record',
    }
  )

  const insurerAddVehicleServiceRecord = useContractFunction(
    contract,
    'insurerAddVehicleServiceRecord',
    {
      transactionName: 'Insurer Add Vehicle Service Record',
    }
  )

  const giveVehicleAccessByTokenId = useContractFunction(contract, 'giveVehicleAccessByTokenId', {
    transactionName: 'Give Vehicle Access By Token Id',
  })

  const revokeVehicleAccessByTokenId = useContractFunction(
    contract,
    'revokeVehicleAccessByTokenId',
    {
      transactionName: 'Revoke Vehicle Access By Token Id',
    }
  )

  return (
    <Web3Context.Provider
      value={{
        listAgents,
        listInsurers,
        userRegistration,
        defineDriverLicenseCode,
        addVehicleServiceRecord,
        createVehicleRequest,
        createVehicle,
        approveVehicleRequest,
        createVehicleInsuranceRequest,
        createVehicleInsuranceProposal,
        contractVehicleInsuranceProposal,
        registerVehicleAccidentRecord,
        insurerAddVehicleServiceRecord,
        giveVehicleAccessByTokenId,
        revokeVehicleAccessByTokenId,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => useContext(Web3Context)
