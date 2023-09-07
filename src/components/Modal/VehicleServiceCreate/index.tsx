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
  InputGroup,
  InputRightAddon,
  ButtonGroup,
  useToast,
  Text,
  Link,
} from '@chakra-ui/react'
import { useWeb3 } from '@/contexts/Web3Context'
import { useForm } from 'react-hook-form'
import { AutoResizeTextarea } from '@/components/AutoResizeTextarea'
import { ethers } from 'ethers'
import { BLOCK_EXPLORER } from '@/constants/web3'

type FormValue = {
  title: string
  description: string
  price: number
  date: string
}

interface Props extends Omit<ModalProps, 'children'> {
  tokenId: string
  onCreate?: () => void
}

const VehicleServiceCreateModal = ({ tokenId, onCreate, ...rest }: Props) => {
  const { addVehicleServiceRecord } = useWeb3()
  const toast = useToast()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValue>()

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

      rest.onClose()
      if (onCreate) onCreate()
    } catch (e) {
      console.error(e)
      toast({
        title: 'Erro ao cadastrar serviço de manutenção',
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
        <ModalHeader>Cadastro Serviço de Manutenção</ModalHeader>
        <ModalBody>
          <Flex
            as="form"
            direction="column"
            justifyContent="flex-start"
            gap="4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justifyContent="flex-start"
              w="100%"
              gap={{ base: '4', md: '2' }}
              alignItems="center"
            >
              <FormControl isInvalid={!!errors.title}>
                <FormLabel htmlFor="name">Título</FormLabel>
                <Input
                  id="title"
                  placeholder="Insira o título..."
                  {...register('title', {
                    required: 'Campo obrigatório',
                    minLength: { value: 4, message: 'Mínimo de 4 caracteres' },
                  })}
                />
                <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.price}>
                <FormLabel htmlFor="price">Preço</FormLabel>
                <InputGroup>
                  <Input
                    id="price"
                    type="number"
                    step="0.001"
                    placeholder="Insira o preço..."
                    {...register('price', {
                      required: 'Campo obrigatório',
                      min: 0,
                    })}
                  />
                  <InputRightAddon>ETH</InputRightAddon>
                </InputGroup>
                <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
              </FormControl>
            </Flex>

            <FormControl>
              <FormLabel htmlFor="date">Data</FormLabel>
              <Input
                id="date"
                type="datetime-local"
                placeholder="Insira a data..."
                {...register('date', { required: 'Campo obrigatório' })}
              />
            </FormControl>

            <FormControl isInvalid={!!errors.description}>
              <FormLabel htmlFor="description">Descrição</FormLabel>
              <AutoResizeTextarea
                id="description"
                placeholder="Insira a descrição..."
                minRows={2}
                {...register('description', {
                  required: 'Campo obrigatório',
                  minLength: { value: 4, message: 'Mínimo de 4 caracteres' },
                })}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
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

export default VehicleServiceCreateModal
