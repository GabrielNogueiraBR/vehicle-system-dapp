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
  Input,
  Button,
  FormErrorMessage,
  Flex,
  ButtonGroup,
  useToast,
  Text,
  Link,
  Select,
} from '@chakra-ui/react'
import { useWeb3 } from '@/contexts/Web3Context'
import { useForm } from 'react-hook-form'
import { BLOCK_EXPLORER } from '@/constants/web3'
import useReadContract from '@/hooks/useReadContract'

type FormValue = {
  agent: string
  renavam: string
}

interface Props extends Omit<ModalProps, 'children'> {
  onCreate?: () => void
}

const VehicleRequestCreateModal = ({ onCreate, ...rest }: Props) => {
  const { createVehicleRequest } = useWeb3()
  const { data: agents } = useReadContract({ functionName: 'listAgents', args: [] })

  const toast = useToast()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValue>()

  const onSubmit = async (data: FormValue) => {
    try {
      const { agent, renavam: vehicleRegistrationCode } = data

      const receipt = await createVehicleRequest.send(agent, vehicleRegistrationCode)

      if (receipt?.status !== 1) throw new Error('Erro ao cadastrar solicitação de veículo')
      const href = `${BLOCK_EXPLORER}/tx/${String(receipt?.transactionHash)}`

      toast({
        title: 'Sucesso ao cadastrar solicitação de veículo',
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
      if (onCreate) onCreate()
    } catch (e) {
      console.error(e)
      toast({
        title: 'Erro ao cadastrar solicitação de veículo',
        position: 'top-right',
        status: 'error',
      })
    }
  }

  const onCloseParam = rest.onClose
  rest.onClose = () => {
    reset()
    onCloseParam()
  }

  return (
    <Modal
      closeOnEsc={!isSubmitting}
      closeOnOverlayClick={!isSubmitting}
      isCentered
      size="xl"
      {...rest}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Solicitação de veículo</ModalHeader>
        <ModalBody>
          <Flex
            as="form"
            direction="column"
            justifyContent="flex-start"
            gap="4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl isInvalid={!!errors.agent}>
              <FormLabel htmlFor="agent">Agente Regularizador</FormLabel>
              <Select
                id="agent"
                {...register('agent', { required: 'Campo obrigatório' })}
                disabled={isSubmitting}
              >
                {agents?.map((agent) => (
                  <option key={String(agent)} value={agent}>
                    {agent}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.agent && errors.agent.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.renavam}>
              <FormLabel htmlFor="renavam">Código Renavam</FormLabel>
              <Input
                id="renavam"
                type="text"
                placeholder="Insira o Renavam do veículo..."
                {...register('renavam', {
                  required: 'Campo obrigatório',
                  minLength: { value: 4, message: 'Mínimo de 4 caracteres' },
                })}
                disabled={isSubmitting}
              />
              <FormErrorMessage>{errors.renavam && errors.renavam.message}</FormErrorMessage>
            </FormControl>

            <ButtonGroup mt={4} justifySelf="flex-end" alignSelf="flex-end" spacing={4}>
              <Button onClick={rest.onClose} isDisabled={isSubmitting}>
                Cancelar
              </Button>
              <Button colorScheme="purple" isLoading={isSubmitting} type="submit">
                Enviar
              </Button>
            </ButtonGroup>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default VehicleRequestCreateModal
