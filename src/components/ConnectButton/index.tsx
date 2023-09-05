'use client'

import { Button, ButtonProps } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import React, { useCallback } from 'react'

interface Props extends ButtonProps {}

const ConnectButton = ({ ...rest }: Props) => {
  const { account, deactivate, activateBrowserWallet, chainId } = useEthers()

  const handleConnectClick = useCallback(() => {
    activateBrowserWallet()
  }, [activateBrowserWallet])

  if (account) return <Button {...rest}>{account}</Button>

  return (
    <Button onClick={handleConnectClick} {...rest}>
      Connect- {chainId}
    </Button>
  )
}

export default ConnectButton
