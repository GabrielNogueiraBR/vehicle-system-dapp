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
import { InsuranceStatus, VehicleAccident } from '@/types/contract'
import { useWeb3 } from '@/contexts/Web3Context'
import { BLOCK_EXPLORER } from '@/constants/web3'
import { ReturnOfFunction } from '@/types'
import { AutoResizeTextarea } from '@/components/AutoResizeTextarea'
import { useVehicle } from '@/contexts/VehicleContext'

export type FormValue = {
  insurance: string
  date: string
  description: string
}

interface Props extends Omit<ModalProps, 'children'> {
  vehicleAccident?: VehicleAccident
  onCreate?: () => void
}

const VehicleAccidentCreate = ({ vehicleAccident, onCreate, ...rest }: Props) => {
  const { tokenId, useContract } = useVehicle()
  const { registerVehicleAccidentRecord } = useWeb3()

  const { contracts } = useContract

  const toast = useToast()

  const isSubmitted = vehicleAccident?.accidentDate !== undefined

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValue>()

  const onSubmit = async (data: FormValue) => {
    try {
      const insuranceId = data.insurance
      const description = data.description
      const accidentDate = new Date(data.date).getTime() / 1000

      const promise = new Promise<ReturnOfFunction>(async (resolve, reject) => {
        try {
          const receipt = await registerVehicleAccidentRecord.send(
            tokenId,
            insuranceId,
            description,
            accidentDate
          )
          if (receipt?.status !== 1) reject(receipt)
          resolve(receipt)
        } catch (e) {
          reject(e)
        }
      })

      toast.promise(promise, {
        success: (receipt) => ({
          title: 'Sucesso ao cadastrar sinistro para o veículo',
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
          title: 'Erro ao cadastrar sinistro, por favor, tente novamente.',
          position: 'top-right',
        },
        loading: { title: 'Cadastrando sinistro...' },
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
    <Modal size={'xl'} closeOnEsc={false} closeOnOverlayClick={false} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isSubmitted ? 'Sinistro' : 'Adicionar Sinistro'}</ModalHeader>
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
                <FormControl isInvalid={!!errors.insurance}>
                  <FormLabel htmlFor="insurance">Contrato de Seguro</FormLabel>
                  <Select
                    id="insurance"
                    {...register('insurance', { required: 'Campo obrigatório' })}
                    disabled={isSubmitting}
                  >
                    {contracts
                      ?.filter((contract) => contract.status !== InsuranceStatus.EXPIRED)
                      .map((contract) => (
                        <option key={String(contract.id)} value={contract.id}>
                          {`Início: ${new Intl.DateTimeFormat('pt-BR').format(
                            contract.insuranceStartDate
                          )}`}
                          {' e '}
                          {`Fim: ${new Intl.DateTimeFormat('pt-BR').format(
                            contract.insuranceEndDate
                          )}`}
                        </option>
                      ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.insurance && errors.insurance.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
            </Flex>
            <Flex w="100%" h="fit-content" direction="row" justify="" align="flex-start">
              <Flex flex="1" direction="column" gap="1">
                <FormControl isInvalid={!!errors.date}>
                  <FormLabel htmlFor="date">Data</FormLabel>
                  <Input
                    id="date"
                    type="date"
                    placeholder="Insira a data..."
                    value={isSubmitted ? '10-10-2010' : undefined}
                    {...register('date', {
                      valueAsDate: true,
                      required: 'Campo obrigatório',
                    })}
                    disabled={isSubmitting}
                    isReadOnly={isSubmitted}
                  />
                  <FormErrorMessage>{errors.date && errors.date.message}</FormErrorMessage>
                </FormControl>
              </Flex>
            </Flex>
            <Flex w="100%" h="fit-content" direction="row" justify="" align="flex-start">
              <Flex flex="1" direction="column" gap="1">
                <FormControl isInvalid={!!errors.description}>
                  <FormLabel htmlFor="description">Descrição</FormLabel>
                  <AutoResizeTextarea
                    id="description"
                    placeholder="Descrição..."
                    minRows={5}
                    value={isSubmitted ? 'Descrição do sinistro' : undefined}
                    {...register('description', {
                      required: 'Campo obrigatório',
                      minLength: { value: 2, message: 'Mínimo de 2 caracteres' },
                    })}
                    disabled={isSubmitting}
                    isReadOnly={isSubmitted}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup justifySelf="flex-end" alignSelf="flex-end" spacing={4}>
            <Button
              onClick={rest.onClose}
              variant="outline"
              colorScheme="purple"
              display={isSubmitted ? 'flex' : 'none'}
              px="12"
            >
              OK
            </Button>
            <Button variant="cancel" onClick={rest.onClose} display={isSubmitted ? 'none' : 'flex'}>
              {isSubmitting ? 'Fechar' : 'Cancelar'}
            </Button>
            <Button
              colorScheme="purple"
              variant="outline"
              isLoading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              type="submit"
              display={isSubmitted ? 'none' : 'flex'}
            >
              Salvar
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default VehicleAccidentCreate
