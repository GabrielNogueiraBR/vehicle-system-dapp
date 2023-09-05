import type { Metadata } from 'next'
import { Providers } from './providers'
import LayoutClientElement from './LayoutClientElement'

export const metadata: Metadata = {
  title: 'Vehicle Dapp',
  description: 'Dapp for vehicle system',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <LayoutClientElement>{children}</LayoutClientElement>
        </Providers>
      </body>
    </html>
  )
}
