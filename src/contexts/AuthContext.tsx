'use client'

import React, { createContext, useContext } from 'react'
import { Role } from '@/types'
import { useEthers } from '@usedapp/core'
import { redirect } from 'next/navigation'

interface AuthContextData {
  address?: string
  roles: Role[]
}

const AuthContext = createContext({} as AuthContextData)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { account, isLoading } = useEthers()
  if (!account && !isLoading) redirect('/auth')

  //TODO: Adicionar aqui a lógica de roles -> para pegar da blockchain

  return (
    <AuthContext.Provider value={{ address: account, roles: ['user', 'agent', 'insurer'] }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
