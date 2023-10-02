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
import { TransactionReceipt } from 'alchemy-sdk'

type FormValue = {
  cnh: string
}

interface Props extends Omit<ModalProps, 'children' | 'onClose'> {
  onCreate?: () => void
}

const UserRegistrationModal = ({ onCreate, ...rest }: Props) => {
  const { userRegistration } = useWeb3()
  const toast = useToast()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValue>()

  const onSubmit = async (data: FormValue) => {
    try {
      const { cnh } = data

      const promise = new Promise<TransactionReceipt | undefined>(async (resolve, reject) => {
        const receipt = await userRegistration.send(cnh)
        if (receipt?.status !== 1) reject(receipt)
        resolve(receipt)
      })

      toast.promise(promise, {
        success: (receipt) => ({
          title: 'Sucesso ao cadastrar CNH',
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
          title: 'Erro ao cadastrar CNH',
          position: 'top-right',
        },
        loading: { title: 'Cadastrando CNH...' },
      })

      await promise

      if (onCreate) onCreate()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Modal size="xl" closeOnEsc={false} closeOnOverlayClick={false} onClose={() => {}} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Solicitar Acesso</ModalHeader>
        <ModalBody>
          <Flex
            as="form"
            direction="column"
            justifyContent="flex-start"
            gap="4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Text color='light-gray' fontSize='md'>
              Para se ter acesso a plataforma, solicite o cadastramento através da inserção do
              código de sua CNH no campo abaixo.
            </Text>
            <FormControl isInvalid={!!errors.cnh}>
              <FormLabel htmlFor="cnh">CNH</FormLabel>
              <Input
                id="cnh"
                type="text"
                placeholder="Insira sua CNH..."
                {...register('cnh', {
                  required: 'Campo obrigatório',
                  minLength: { value: 4, message: 'Mínimo de 4 caracteres' },
                })}
                disabled={isSubmitting}
              />
              <FormErrorMessage>{errors.cnh && errors.cnh.message}</FormErrorMessage>
            </FormControl>

            <ButtonGroup mt={4} justifySelf="flex-end" alignSelf="flex-end" spacing={4}>
              <Button colorScheme="purple" isLoading={isSubmitting} type="submit" variant="outline">
                Enviar
              </Button>
            </ButtonGroup>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default UserRegistrationModal
