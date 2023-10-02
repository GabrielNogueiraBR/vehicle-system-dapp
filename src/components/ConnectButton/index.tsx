'use client'

import { Button, ButtonProps} from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import React, { useCallback } from 'react'

interface Props extends ButtonProps {}

const ConnectButton = ({ ...rest }: Props) => {
  const { account, deactivate, isLoading, activateBrowserWallet, chainId } = useEthers()

  const handleConnectClick = useCallback(() => {
    activateBrowserWallet()
  }, [activateBrowserWallet])

  if (account)
    return (
      <Button isLoading={isLoading} loadingText="Fazendo login..." onClick={deactivate} {...rest}>
        {account}
      </Button>
    )

  return (
    <Button
      isLoading={isLoading}
      loadingText="Carregando..."
      onClick={handleConnectClick}
      {...rest}
    >
      Conectar
    </Button>
  )
}

export default ConnectButton
