'use client'

import React from 'react'
import AccessFormModal, { FormValue } from './AccessForm'
import { ModalProps, useToast, Text, Link } from '@chakra-ui/react'
import { useWeb3 } from '@/contexts/Web3Context'
import { BLOCK_EXPLORER } from '@/constants/web3'

interface Props extends Omit<ModalProps, 'children'> {
  tokenId: string
  onCreate?: () => void
}

const CreateAccess = ({ tokenId, onCreate, ...rest }: Props) => {
  const { giveVehicleAccessByTokenId } = useWeb3()
  const toast = useToast()

  const onSubmit = async (data: FormValue) => {
    try {
      const { address } = data
      const date = new Date(data.date).getTime() / 1000

      const receipt = await giveVehicleAccessByTokenId.send(tokenId, address, date)

      if (receipt?.status !== 1) throw new Error('Erro ao cadastrar fornecer acesso ao veículo')
      const href = `${BLOCK_EXPLORER}/tx/${String(receipt?.transactionHash)}`

      toast({
        title: 'Sucesso ao cadastrar acesso',
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

      if (onCreate) onCreate()
      return true
    } catch (e) {
      console.error(e)
      toast({
        title: 'Erro ao cadastrar fornecer acesso ao veículo',
        position: 'top-right',
        status: 'error',
      })
      return false
    }
  }

  return <AccessFormModal onSubmit={onSubmit} {...rest} />
}

export default CreateAccess
