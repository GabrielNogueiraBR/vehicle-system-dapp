'use client'

import Sidebar from '@/components/Sidebar'
import { useEthers } from '@usedapp/core'
import { redirect } from 'next/navigation'

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  const { account, isLoading } = useEthers()

  if (!account && !isLoading) redirect('/auth')

  return (
    <>
      <Sidebar />
      {children}
    </>
  )
}
