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
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { AutoResizeTextarea } from '@/components/AutoResizeTextarea'
import { VehicleService } from '@/types/contract'

export type FormValue = {
  title: string
  description: string
  price: number
  date: string
}

interface Props extends Omit<ModalProps, 'children'> {
  vehicleService?: VehicleService
  onSubmit: (data: FormValue) => Promise<boolean>
}

const FormModal = ({ onSubmit: onSubmitParam, vehicleService, ...rest }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValue>()

  const onSubmit = async (data: FormValue) => {
    if (await onSubmitParam(data)) rest.onClose()
  }

  const onCloseParam = rest.onClose
  rest.onClose = () => {
    reset()
    onCloseParam()
  }

  return (
    <Modal closeOnEsc={false} closeOnOverlayClick={false} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{vehicleService ? 'Serviço de Manutenção' : 'Adicionar Serviço'}</ModalHeader>
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
              alignItems="flex-start"
            >
              <FormControl isInvalid={!!errors.title}>
                <FormLabel htmlFor="title">Título</FormLabel>
                <Input
                  id="title"
                  placeholder="Insira o título..."
                  value={vehicleService ? vehicleService.title : undefined}
                  {...register('title', {
                    required: 'Campo obrigatório',
                    minLength: { value: 4, message: 'Mínimo de 4 caracteres' },
                  })}
                  disabled={isSubmitting}
                  isReadOnly={!!vehicleService}
                />
                <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.price}>
                <FormLabel htmlFor="price">Preço</FormLabel>
                <InputGroup>
                  <Input
                    id="price"
                    type="number"
                    step="0.000000000000000001"
                    value={vehicleService ? vehicleService.price.toNumber() : undefined}
                    placeholder="Insira o preço..."
                    {...register('price', {
                      required: 'Campo obrigatório',
                      min: 0,
                    })}
                    disabled={isSubmitting}
                    isReadOnly={!!vehicleService}
                  />
                  <InputRightAddon>ETH</InputRightAddon>
                </InputGroup>
                <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
              </FormControl>
            </Flex>

            <FormControl isInvalid={!!errors.date}>
              <FormLabel htmlFor="date">Data</FormLabel>
              <Input
                id="date"
                type="date"
                placeholder="Insira a data..."
                value={
                  vehicleService
                    ? new Date(vehicleService.date * 1000).toISOString().slice(0, 10)
                    : undefined
                }
                {...register('date', { valueAsDate: true, required: 'Campo obrigatório' })}
                disabled={isSubmitting}
                isReadOnly={!!vehicleService}
              />
              <FormErrorMessage>{errors.date && errors.date.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.description}>
              <FormLabel htmlFor="description">Descrição</FormLabel>
              <AutoResizeTextarea
                id="description"
                placeholder="Insira a descrição..."
                minRows={2}
                value={vehicleService ? vehicleService.description : undefined}
                {...register('description', {
                  required: 'Campo obrigatório',
                  minLength: { value: 4, message: 'Mínimo de 4 caracteres' },
                })}
                disabled={isSubmitting}
                isReadOnly={!!vehicleService}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>

            <ButtonGroup mt={4} justifySelf="flex-end" alignSelf="flex-end" spacing={4}>
              <Button
                onClick={rest.onClose}
                variant="outline"
                colorScheme="purple"
                display={vehicleService ? 'flex' : 'none'}
                px="12"
              >
                OK
              </Button>
              <Button
                variant="cancel"
                onClick={rest.onClose}
                display={vehicleService ? 'none' : 'flex'}
              >
                {isSubmitting ? 'Fechar' : 'Cancelar'}
              </Button>
              <Button
                colorScheme="purple"
                variant="outline"
                isLoading={isSubmitting}
                type="submit"
                display={vehicleService ? 'none' : 'flex'}
              >
                Enviar
              </Button>
            </ButtonGroup>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default FormModal
