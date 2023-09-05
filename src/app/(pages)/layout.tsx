'use client'

import Sidebar from '@/components/Sidebar'

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  )
}
