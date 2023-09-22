import Providers from './providers'

export default function VehicleLayout({
  children,
  params: { tokenId },
}: {
  children: React.ReactNode
  params: {
    tokenId: string
  }
}) {
  return <Providers tokenId={tokenId}>{children}</Providers>
}
