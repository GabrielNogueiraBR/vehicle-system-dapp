'use client'

import { Button } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import React, { useCallback } from 'react'

const ConnectButton = () => {
  const { account, deactivate, activateBrowserWallet, chainId } = useEthers()

  const handleConnectClick = useCallback(() => {
    activateBrowserWallet()
  }, [activateBrowserWallet])

  if (account) return <Button>{account}</Button>

  return <Button onClick={handleConnectClick}>Connect- {chainId}</Button>
}

export default ConnectButton
