'use client'

import React from 'react'
import AccessFormModal, { FormValue } from './AccessForm'
import { ModalProps, useToast, Text, Link } from '@chakra-ui/react'
import { useWeb3 } from '@/contexts/Web3Context'
import { BLOCK_EXPLORER } from '@/constants/web3'
import { Access } from '@/types/contract'

interface Props extends Omit<ModalProps, 'children'> {
  tokenId: string
  vehicleAccess?: Access
  onUpdate?: () => void
}

const UpdateAccess = ({ tokenId, vehicleAccess, onUpdate, ...rest }: Props) => {
  const { giveVehicleAccessByTokenId } = useWeb3()
  const toast = useToast()

  const onSubmit = async (data: FormValue) => {
    try {
      const { address } = data
      const date = new Date(data.date).getTime() / 1000

      const receipt = await giveVehicleAccessByTokenId.send(tokenId, address, date)

      if (receipt?.status !== 1) throw new Error('Erro ao atualizar acesso')
      const href = `${BLOCK_EXPLORER}/tx/${String(receipt?.transactionHash)}`

      toast({
        title: 'Sucesso ao atualizar acesso',
        description: (
          <Text>
            Para consultar a transação{' '}
            <Link href={href} target="_blank">
              clique aqui
            </Link>{' '}
          </Text>
        ),
        duration: 7000,
        position: 'top-right',
        status: 'success',
      })

      rest.onClose()
      if (onUpdate) onUpdate()
    } catch (e) {
      console.error(e)
      toast({
        title: 'Erro ao atualizar acesso',
        position: 'top-right',
        status: 'error',
      })
    }
  }

  return <AccessFormModal vehicleAccess={vehicleAccess} onSubmit={onSubmit} {...rest} />
}

export default UpdateAccess
