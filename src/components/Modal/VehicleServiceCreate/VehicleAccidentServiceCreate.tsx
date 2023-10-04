'use client'

import React from 'react'
import FormModal, { FormValue } from './FormModal'
import { VehicleService } from '@/types/contract'
import { ModalProps, useToast, Text, Link } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useWeb3 } from '@/contexts/Web3Context'
import { BLOCK_EXPLORER } from '@/constants/web3'
import { ReturnOfFunction } from '@/types'

interface Props extends Omit<ModalProps, 'children'> {
  tokenId: string
  accidentId?: number
  insuranceId?: number
  vehicleService?: VehicleService
  onCreate?: () => void
}

const VehicleAccidentServiceCreate = ({
  tokenId,
  accidentId,
  insuranceId,
  vehicleService,
  onCreate,
  ...rest
}: Props) => {
  const { insurerAddVehicleServiceRecord } = useWeb3()
  const toast = useToast()

  const onSubmit = async (data: FormValue) => {
    try {
      if (accidentId === undefined || insuranceId === undefined)
        throw new Error('Invalid data on create accident service')
      const { title, description } = data
      const price = ethers.utils.parseUnits(String(data.price), 'ether')
      const date = new Date(data.date).getTime() / 1000

      const promise = new Promise<ReturnOfFunction>(async (resolve, reject) => {
        try {
          const receipt = await insurerAddVehicleServiceRecord.send(
            tokenId,
            insuranceId,
            accidentId,
            title,
            description,
            price,
            date
          )
          if (receipt?.status !== 1) reject(receipt)
          resolve(receipt)
        } catch (e) {
          reject(e)
        }
      })

      toast.promise(promise, {
        success: (receipt) => ({
          title: 'Sucesso ao cadastrar serviço de manutenção',
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
          title: 'Erro ao cadastrar serviço de manutenção',
          position: 'top-right',
        },
        loading: { title: 'Cadastrando serviço de manutenção...', position: 'top' },
      })

      await promise

      if (onCreate) onCreate()
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  return <FormModal onSubmit={onSubmit} vehicleService={vehicleService} {...rest} />
}

export default VehicleAccidentServiceCreate
