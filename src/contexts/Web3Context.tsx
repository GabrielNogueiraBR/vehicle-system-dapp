import contract from '@/lib/contract'
import { useContractFunction } from '@usedapp/core'
import React, { createContext, useContext } from 'react'

interface Web3ContextData {
  userRegistration: ReturnType<typeof useContractFunction>
}

export const Web3Context = createContext({} as Web3ContextData)

interface Web3ProviderProps {
  children: React.ReactNode
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  const userRegistration = useContractFunction(contract, 'userRegistration', {
    transactionName: 'User Registration',
  })

  return <Web3Context.Provider value={{ userRegistration }}>{children}</Web3Context.Provider>
}

export const useWeb3 = () => useContext(Web3Context)
