'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Role } from '@/types'
import { useEthers } from '@usedapp/core'
import { redirect, usePathname } from 'next/navigation'
import { useWeb3 } from './Web3Context'
import UserRegistrationModal from '@/components/Modal/UserRegistration'
import LoadingModalAccess from '@/components/Modal/Loading'

interface AuthContextData {
  address?: string
  roles: Role[]
}

const AuthContext = createContext({} as AuthContextData)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const pathname = usePathname()

  const [userRoles, setUserRoles] = useState<Role[]>([])
  const [isLoadingRoles, setIsLoadingRoles] = useState(true)

  const { account, isLoading: isLoadingAuth } = useEthers()
  if (!account && !isLoadingAuth) redirect(`/auth?callbackUrl=${encodeURIComponent(pathname)}`)

  const { listAgents, listInsurers, getDriverLicenseCode } = useWeb3()
  const { data: agents, isLoading: isLoadingAgents } = listAgents
  const { data: insurers, isLoading: isLoadingInsurers } = listInsurers
  const { data: CNH, isLoading: isLoadingCNH, load: loadCNH } = getDriverLicenseCode

  const isLoading = isLoadingAuth || isLoadingAgents || isLoadingInsurers
  const isLoadingAccess = isLoading || isLoadingRoles || isLoadingCNH
  const mustOpenUserRegistrationModal =
    !isLoading && !isLoadingRoles && !isLoadingCNH && !CNH && userRoles.includes('user')

  const checkRole = (address: string) => {
    const roles: Role[] = []
    setIsLoadingRoles(true)

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
    setIsLoadingRoles(false)
    setUserRoles(roles)
  }

  useEffect(() => {
    if (!account || isLoading) return
    checkRole(account)
  }, [agents, insurers, account, isLoading])

  useEffect(() => {
    loadCNH()
  }, [userRoles, account])

  return (
    <AuthContext.Provider value={{ address: account, roles: userRoles }}>
      <LoadingModalAccess isOpen={isLoadingAccess} />
      <UserRegistrationModal isOpen={mustOpenUserRegistrationModal} onCreate={loadCNH} />
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
