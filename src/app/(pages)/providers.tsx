'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '@/styles/theme'
import { Config, DAppProvider, Mumbai } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

const dappConfig: Config = {
  readOnlyChainId: Mumbai.chainId,
  readOnlyUrls: {
    [Mumbai.chainId]: getDefaultProvider('matic'),
  },
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <DAppProvider config={dappConfig}>{children}</DAppProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}
