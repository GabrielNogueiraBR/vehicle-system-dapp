'use client'

import React from 'react'
import Sidebar from '@/components/Sidebar'
import { useEthers } from '@usedapp/core'
import { redirect } from 'next/navigation'

const LayoutClientElement = ({ children }: { children: React.ReactNode }) => {
  const { account, isLoading } = useEthers()
  if (!account && !isLoading) redirect('/auth')

  return (
    <>
      <Sidebar />
      {children}
    </>
  )
}

export default LayoutClientElement
