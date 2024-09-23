import { Network, Alchemy } from 'alchemy-sdk'

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY || 'no env',
  network: Network.MATIC_MAINNET,
}

const alchemy = new Alchemy(settings)

export default alchemy
