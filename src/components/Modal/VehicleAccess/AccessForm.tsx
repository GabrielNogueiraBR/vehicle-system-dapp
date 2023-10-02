'use client'
import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalProps,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  Button,
  ButtonGroup,
  ModalFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
  Link,
  Select,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Access, InsuranceStatus, VehicleAccident } from '@/types/contract'
import { useWeb3 } from '@/contexts/Web3Context'
import { BLOCK_EXPLORER } from '@/constants/web3'
import { ReturnOfFunction } from '@/types'
import { AutoResizeTextarea } from '@/components/AutoResizeTextarea'
import { useVehicle } from '@/contexts/VehicleContext'

export type FormValue = {
  address: string
  date: string
}

interface Props extends Omit<ModalProps, 'children'> {
  vehicleAccess?: Access
  onSubmit: (data: FormValue) => Promise<void>
}

const AccessFormModal = ({ onSubmit, vehicleAccess, ...rest }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValue>()

  const onCloseParam = rest.onClose
  rest.onClose = () => {
    reset()
    onCloseParam()
  }

  return (
    <Modal size={'xl'} closeOnEsc={false} closeOnOverlayClick={false} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{vehicleAccess ? 'Alterar acesso' : 'Adicionar acesso'}</ModalHeader>
        <ModalBody>
          <Flex
            direction="column"
            justifyContent="flex-start"
            gap="4"
            px="4"
            sx={{
              input: {
                fontSize: 'md',
              },
              label: {
                color: 'dark',
                fontSize: 'lg',
                fontWeight: 500,
              },
            }}
          >
            <Flex w="100%" h="fit-content" direction="row" justify="" align="flex-start">
              <Flex flex="1" direction="column" gap="1">
                <FormControl isInvalid={!!errors.address}>
                  <FormLabel htmlFor="address">Endereço</FormLabel>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Insira o endereço..."
                    value={vehicleAccess ? vehicleAccess.address : undefined}
                    {...register('address', {
                      required: 'Campo obrigatório',
                      minLength: { value: 4, message: 'Mínimo de 4 caracteres' },
                      pattern: {
                        value: /^0x[0-9A-Fa-f]{40}$/i,
                        message: 'Formato de endereço inválido',
                      },
                    })}
                    disabled={isSubmitting}
                    isReadOnly={!!vehicleAccess}
                  />
                  <FormErrorMessage>{errors.address && errors.address.message}</FormErrorMessage>
                </FormControl>
              </Flex>
            </Flex>
            <Flex w="100%" h="fit-content" direction="row" justify="" align="flex-start">
              <Flex flex="1" direction="column" gap="1">
                <FormControl isInvalid={!!errors.date}>
                  <FormLabel htmlFor="date">Data de expiração</FormLabel>
                  <Input
                    id="date"
                    type="date"
                    placeholder="Insira a data..."
                    value={
                      vehicleAccess
                        ? vehicleAccess.expirationDate.toISOString().slice(0, 10)
                        : undefined
                    }
                    {...register('date', { valueAsDate: true, required: 'Campo obrigatório' })}
                    disabled={isSubmitting}
                    isReadOnly={!!vehicleAccess}
                  />
                  <FormErrorMessage>{errors.date && errors.date.message}</FormErrorMessage>
                </FormControl>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup mt={4} justifySelf="flex-end" alignSelf="flex-end" spacing={4}>
            <Button
              onClick={rest.onClose}
              variant="outline"
              colorScheme="purple"
              display={vehicleAccess ? 'flex' : 'none'}
              px="12"
            >
              OK
            </Button>
            <Button
              variant="cancel"
              onClick={rest.onClose}
              display={vehicleAccess ? 'none' : 'flex'}
            >
              {isSubmitting ? 'Fechar' : 'Cancelar'}
            </Button>
            <Button
              colorScheme="purple"
              variant="outline"
              isLoading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              display={vehicleAccess ? 'none' : 'flex'}
            >
              Enviar
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AccessFormModal
