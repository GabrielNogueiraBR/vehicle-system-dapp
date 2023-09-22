import { CONTRACT_ADDRESS } from '@/constants/web3'
import alchemy from '@/services/alchemy'
import { OwnedNft } from 'alchemy-sdk'
import { NextRequest, NextResponse } from 'next/server'

export type GetNftsForAddressResponse = { nfts: OwnedNft[] }
type Params = { params: { address: string } }

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { address } = params

    if (!address) throw new Error('Invalid data')

    const nfts: OwnedNft[] = []

    const nftsIterable = alchemy.nft.getNftsForOwnerIterator(address, {
      contractAddresses: [CONTRACT_ADDRESS],
    })

    for await (const nft of nftsIterable) {
      nfts.push(nft)
    }

    const response: GetNftsForAddressResponse = { nfts }
    return NextResponse.json(response, { status: 200 })
  } catch (e) {
    console.error(e)
    if (e instanceof Error) return NextResponse.json({ error: e.message }, { status: 400 })
    return NextResponse.json(null, { status: 400 })
  }
}
