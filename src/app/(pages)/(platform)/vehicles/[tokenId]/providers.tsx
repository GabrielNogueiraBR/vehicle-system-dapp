'use client'

import { VehicleProvider } from '@/contexts/VehicleContext'
import React from 'react'

interface Props {
  tokenId: string
  children: React.ReactNode
}

const Providers = ({ tokenId, children }: Props) => {
  return <VehicleProvider tokenId={tokenId}>{children}</VehicleProvider>
}

export default Providers
