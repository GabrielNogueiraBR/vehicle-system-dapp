'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Role } from '@/types'
import { useEthers } from '@usedapp/core'
import { redirect } from 'next/navigation'
import { useWeb3 } from './Web3Context'

interface AuthContextData {
  address?: string
  roles: Role[]
}

const AuthContext = createContext({} as AuthContextData)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userRoles, setUserRoles] = useState<Role[]>([])

  const { account, isLoading: isLoadingAuth } = useEthers()
  if (!account && !isLoadingAuth) redirect('/auth')

  const { listAgents, listInsurers } = useWeb3()
  const { data: agents, isLoading: isLoadingAgents } = listAgents
  const { data: insurers, isLoading: isLoadingInsurers } = listInsurers

  const isLoading = isLoadingAuth || isLoadingAgents || isLoadingInsurers

  const checkRole = (address: string) => {
    const roles: Role[] = []

    try {
      const isAgent = agents?.some((a) => a.toLowerCase() === address.toLowerCase())
      const isInsuerer = insurers?.some((i) => i.toLowerCase() === address.toLowerCase())

      if (isAgent || isInsuerer) {
        if (isAgent) roles.push('agent')
        if (isInsuerer) roles.push('insurer')
      } else roles.push('user')
    } catch (e) {
      console.error(e)
    }

    setUserRoles(roles)
  }

  useEffect(() => {
    if (!account || isLoading) return
    checkRole(account)
  }, [agents, insurers, account, isLoading])

  return (
    <AuthContext.Provider value={{ address: account, roles: userRoles }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
