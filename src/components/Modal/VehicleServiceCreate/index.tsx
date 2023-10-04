'use client'

import React from 'react'
import FormModal, { FormValue } from './FormModal'
import { VehicleService } from '@/types/contract'
import { ModalProps, useToast, Text, Link } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useWeb3 } from '@/contexts/Web3Context'
import { BLOCK_EXPLORER } from '@/constants/web3'

interface Props extends Omit<ModalProps, 'children'> {
  tokenId: string
  vehicleService?: VehicleService
  onCreate?: () => void
}

const VehicleServiceCreateModal = ({ tokenId, vehicleService, onCreate, ...rest }: Props) => {
  const { addVehicleServiceRecord } = useWeb3()
  const toast = useToast()

  const onSubmit = async (data: FormValue) => {
    try {
      const { title, description } = data
      const price = ethers.utils.parseUnits(String(data.price), 'ether')
      const date = new Date(data.date).getTime() / 1000

      const receipt = await addVehicleServiceRecord.send(tokenId, title, description, price, date)

      if (receipt?.status !== 1) throw new Error('Erro ao cadastrar serviço de manutenção')
      const href = `${BLOCK_EXPLORER}/tx/${String(receipt?.transactionHash)}`

      toast({
        title: 'Sucesso ao cadastrar serviço de manutenção',
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
        title: 'Erro ao cadastrar serviço de manutenção',
        position: 'top-right',
        status: 'error',
      })
      return false
    }
  }

  return <FormModal onSubmit={onSubmit} vehicleService={vehicleService} {...rest} />
}

export default VehicleServiceCreateModal
