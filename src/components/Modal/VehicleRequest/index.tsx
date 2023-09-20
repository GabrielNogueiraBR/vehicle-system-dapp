'use client'

import React, { useState } from 'react'
import {
  Modal,
  ModalProps,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Flex,
  ButtonGroup,
  Text,
  ModalFooter,
  useToast,
  Link,
} from '@chakra-ui/react'
import { Status, VehicleRequest } from '@/types/contract'
import { useWeb3 } from '@/contexts/Web3Context'
import { useContractFunction } from '@usedapp/core'
import { ADDRESS_REGEX, BLOCK_EXPLORER } from '@/constants/web3'

interface Props extends Omit<ModalProps, 'children'> {
  vehicleRequest?: VehicleRequest
  onCreateVehicle?: () => void
}

type ReturnOfFunction = Awaited<ReturnType<ReturnType<typeof useContractFunction>['send']>>

const VehicleRequestModal = ({ vehicleRequest, onCreateVehicle, ...rest }: Props) => {
  const [isCreating, setIsCreating] = useState(false)
  const { createVehicle } = useWeb3()
  const toast = useToast()

  const isPending = vehicleRequest?.status === Status.PENDING

  const handleVehicleRequestClick = async () => {
    try {
      setIsCreating(true)
      const requestId = vehicleRequest?.id
      if (!requestId) throw new Error('Invalid')

      const promise = new Promise<ReturnOfFunction>(async (resolve, reject) => {
        const receipt = await createVehicle.send(requestId)
        if (receipt?.status !== 1) reject(receipt)
        resolve(receipt)
      })

      toast.promise(promise, {
        success: (receipt) => ({
          title: 'Sucesso ao criar veículo',
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
          title: 'Erro ao criar veículo, por favor, tente novamente.',
          position: 'top-right',
        },
        loading: { title: 'Cadastrando veículo...' },
      })

      await promise

      rest.onClose()
      if (onCreateVehicle) onCreateVehicle()
    } catch (e) {
      console.error(e)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Modal {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isPending ? 'Solicitação em aberto' : 'Solicitação aprovada'}</ModalHeader>
        <ModalBody>
          <Flex
            direction="row"
            justifyContent="flex-start"
            gap="4"
            color="dark"
            sx={{
              p: {
                fontSize: 'xl',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                maxW: '100%',
              },
              span: {
                fontSize: 'lg',
                fontWeight: 500,
                textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              },
            }}
          >
            <Flex
              flex="1"
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap="1"
            >
              <Text>
                Agente:{' '}
                <Text as="span">
                  {vehicleRequest?.agent.replace(ADDRESS_REGEX, '$1...$2')}
                </Text>
              </Text>
              <Text display={isPending ? 'block' : 'none'}>
                Data criação:{' '}
                <Text as="span">
                  {new Intl.DateTimeFormat('pt-BR').format(vehicleRequest?.createdAt)}
                </Text>
              </Text>
              <Text display={isPending ? 'block' : 'none'}>
                Data atualização:{' '}
                <Text as="span">
                  {new Intl.DateTimeFormat('pt-BR').format(vehicleRequest?.updatedAt)}
                </Text>
              </Text>

              <Text display={isPending ? 'none' : 'block'}>
                {'Modelo: '}
                <Text as="span">{vehicleRequest?.vehicleData.carModel}</Text>
              </Text>
              <Text display={isPending ? 'none' : 'block'}>
                Marca: <Text as="span">{vehicleRequest?.vehicleData.carBrand}</Text>
              </Text>
              <Text display={isPending ? 'none' : 'block'}>
                Data de fabricação:{' '}
                <Text as="span">
                  {new Intl.DateTimeFormat('pt-BR').format(
                    vehicleRequest?.vehicleData.manufacturingDate
                  )}
                </Text>
              </Text>
            </Flex>
            <Flex
              flex="1"
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap="1"
            >
              <Text>
                Renavam: <Text as="span">{vehicleRequest?.vehicleRegistrationCode}</Text>
              </Text>
              <Text>
                Status: <Text as="span">{isPending ? 'Em andamento' : 'Aprovado'}</Text>
              </Text>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup justifySelf="flex-end" alignSelf="flex-end" spacing={4}>
            <Button
              onClick={rest.onClose}
              variant="outline"
              colorScheme="purple"
              display={isPending ? 'flex' : 'none'}
              px="12"
            >
              OK
            </Button>
            <Button variant="cancel" onClick={rest.onClose} display={isPending ? 'none' : 'flex'}>
              Fechar
            </Button>
            <Button
              colorScheme="purple"
              variant="outline"
              isLoading={isCreating}
              onClick={handleVehicleRequestClick}
              type="submit"
              display={isPending ? 'none' : 'flex'}
            >
              Criar NFT
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default VehicleRequestModal
