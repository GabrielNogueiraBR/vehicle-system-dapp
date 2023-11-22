'use client'

import React from 'react'
import {
  Modal,
  ModalProps,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Flex,
  Text,
  ButtonGroup,
  useToast,
  Select,
  ModalFooter,
  Link,
} from '@chakra-ui/react'
import { useWeb3 } from '@/contexts/Web3Context'
import { useForm } from 'react-hook-form'
import useVehicleNFTs from '@/hooks/useVehicleNFTs'
import { ReturnOfFunction } from '@/types'
import { BLOCK_EXPLORER } from '@/constants/web3'

type FormValue = {
  tokenId: string
  insurer: string
}

interface Props extends Omit<ModalProps, 'children'> {
  tokenId?: string
  onCreate?: () => void
}

const VehicleContractRequestCreateModal = ({ tokenId, onCreate, ...rest }: Props) => {
  const { createVehicleInsuranceRequest, listInsurers } = useWeb3()
  const { vehiclesNfts } = useVehicleNFTs()
  const { data: insurers } = listInsurers

  const toast = useToast()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValue>()

  const onSubmit = async (data: FormValue) => {
    try {
      const { tokenId, insurer } = data

      const promise = new Promise<ReturnOfFunction>(async (resolve, reject) => {
        try {
          const receipt = await createVehicleInsuranceRequest.send(tokenId, insurer)
          if (receipt?.status !== 1) reject(receipt)
          resolve(receipt)
        } catch (e) {
          reject(e)
        }
      })

      toast.promise(promise, {
        success: (receipt) => ({
          title: 'Sucesso ao criar solicitação de contrato',
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
          title: 'Erro ao criar solicitação de contrato, por favor, tente novamente.',
          position: 'top-right',
        },
        loading: { title: 'Criando solicitação de contrato...', position: 'top' },
      })

      await promise

      rest.onClose()
      if (onCreate) onCreate()
    } catch (e) {
      console.error(e)
    }
  }

  const onCloseParam = rest.onClose
  rest.onClose = () => {
    reset()
    onCloseParam()
  }

  return (
    <Modal size="3xl" {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Solicitar contrato de seguro</ModalHeader>
        <ModalBody>
          <Flex direction="row" justifyContent="flex-start" gap="4">
            <FormControl isInvalid={!!errors.tokenId}>
              <FormLabel htmlFor="tokenId">Veículo</FormLabel>
              <Select
                id="tokenId"
                value={tokenId ? tokenId : undefined}
                {...register('tokenId', { required: 'Campo obrigatório' })}
                disabled={isSubmitting}
                isReadOnly={tokenId ? true : false}
              >
                {vehiclesNfts?.map((nft) => (
                  <option key={String(nft.tokenId)} value={nft.tokenId}>
                    {nft.tokenId} - {nft.vehicleMetadata?.carModel}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.tokenId && errors.tokenId.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.insurer}>
              <FormLabel htmlFor="insurer">Seguradora</FormLabel>
              <Select
                id="insurer"
                {...register('insurer', { required: 'Campo obrigatório' })}
                disabled={isSubmitting}
              >
                {insurers?.map((insurer) => (
                  <option key={String(insurer)} value={insurer}>
                    {insurer}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.insurer && errors.insurer.message}</FormErrorMessage>
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup mt={4} justifySelf="flex-end" alignSelf="flex-end" spacing={4}>
            <Button onClick={rest.onClose} variant="cancel">
              {isSubmitting ? 'Fechar' : 'Cancelar'}
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              colorScheme="purple"
              isLoading={isSubmitting}
              variant="outline"
            >
              Enviar
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default VehicleContractRequestCreateModal
