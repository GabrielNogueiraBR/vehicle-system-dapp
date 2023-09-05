'use client'

import React from 'react'
import Sidebar from '@/components/Sidebar'
import { useEthers } from '@usedapp/core'
import { redirect } from 'next/navigation'

const LayoutClientElement = ({ children }: { children: React.ReactNode }) => {
  const { account } = useEthers()
  if (!account) redirect('/auth')

  return (
    <>
      <Sidebar />
      {children}
    </>
  )
}

export default LayoutClientElement
