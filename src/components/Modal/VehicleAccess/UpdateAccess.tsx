'use client'

import React from 'react'
import AccessFormModal, { FormValue } from './AccessForm'
import { ModalProps, useToast, Text, Link } from '@chakra-ui/react'
import { useWeb3 } from '@/contexts/Web3Context'
import { BLOCK_EXPLORER } from '@/constants/web3'
import { Access } from '@/types/contract'
import { TransactionReceipt } from 'alchemy-sdk'

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

      const promise = new Promise<TransactionReceipt | undefined>(async (resolve, reject) => {
        try {
          const receipt = await giveVehicleAccessByTokenId.send(tokenId, address, date)
          if (receipt?.status !== 1) reject(receipt)
          resolve(receipt)
        } catch (e) {
          reject(undefined)
        }
      })

      toast.promise(promise, {
        success: (receipt) => ({
          title: 'Sucesso ao atualizar acesso',
          description: (
            <Text>
              Para consultar a transação{' '}
              <Link
                href={`${BLOCK_EXPLORER}/tx/${String(receipt?.transactionHash)}`}
                target="_blank"
              >
                clique aqui
              </Link>{' '}
            </Text>
          ),
          duration: 7000,
          position: 'top-right',
        }),
        error: {
          title: 'Erro ao atualizar acesso',
          position: 'top-right',
        },
        loading: { title: 'Atualizando acesso...', position: 'top' },
      })

      await promise

      if (onUpdate) onUpdate()
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  return <AccessFormModal vehicleAccess={vehicleAccess} onSubmit={onSubmit} {...rest} />
}

export default UpdateAccess
