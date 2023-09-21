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
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import {
  VehicleInsuranceProposal,
  VehicleInsuranceRequest,
  VehicleMetadata,
} from '@/types/contract'
import { useContractFunction } from '@usedapp/core'
import { useWeb3 } from '@/contexts/Web3Context'
import { BLOCK_EXPLORER } from '@/constants/web3'
import { ethers } from 'ethers'

export type FormValue = {
  tokenId: string
  insuranceStartDate: string
  insuranceEndDate: string
  price: number
  contractUrl: string
}

type ReturnOfFunction = Awaited<ReturnType<ReturnType<typeof useContractFunction>['send']>>
type CustomData = VehicleInsuranceRequest &
  Partial<VehicleInsuranceProposal> & { metadata: VehicleMetadata }

interface Props extends Omit<ModalProps, 'children'> {
  requestData?: CustomData
  onApprove?: () => void
}

const VehicleInsuranceApproval = ({ requestData, onApprove, ...rest }: Props) => {
  const { createVehicleInsuranceProposal } = useWeb3()
  const toast = useToast()

  const isSubmitted = requestData?.insuranceStartDate !== undefined

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValue>()

  const onSubmit = async (data: FormValue) => {
    try {
      const requestId = requestData?.id
      if (!requestId) throw new Error('Invalid')
      const { contractUrl } = data
      const insuranceStartDate = new Date(data.insuranceStartDate).getTime() / 1000
      const insuranceEndDate = new Date(data.insuranceEndDate).getTime() / 1000
      const price = ethers.utils.parseUnits(String(data.price), 'ether')

      const promise = new Promise<ReturnOfFunction>(async (resolve, reject) => {
        try {
          const receipt = await createVehicleInsuranceProposal.send(
            requestId,
            insuranceStartDate,
            insuranceEndDate,
            price,
            contractUrl
          )
          if (receipt?.status !== 1) reject(receipt)
          resolve(receipt)
        } catch (e) {
          reject(e)
        }
      })

      toast.promise(promise, {
        success: (receipt) => ({
          title: 'Sucesso ao enviar proposta de seguro',
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
          title: 'Erro ao criar proposta de seguro, por favor, tente novamente.',
          position: 'top-right',
        },
        loading: { title: 'Enviando proposta de seguro...' },
      })

      await promise

      rest.onClose()
      if (onApprove) onApprove()
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
    <Modal size={'4xl'} closeOnEsc={false} closeOnOverlayClick={false} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isSubmitted ? 'Proposta enviada' : 'Adicionar proposta'}</ModalHeader>
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
                <FormControl maxW="90%">
                  <FormLabel htmlFor="tokenId">TokenId</FormLabel>
                  <Input
                    id="tokenId"
                    value={requestData?.tokenId}
                    {...register('tokenId', {
                      required: 'Campo obrigatório',
                    })}
                    isReadOnly
                  />
                </FormControl>
              </Flex>
              <Flex flex="1" direction="column" gap="1">
                <FormControl maxW="90%">
                  <FormLabel htmlFor="carBrand">Marca</FormLabel>
                  <Input
                    id="carBrand"
                    placeholder="Insira a marca do veículo..."
                    value={requestData?.metadata.carBrand}
                    isReadOnly
                  />
                </FormControl>
              </Flex>
              <Flex flex="1" direction="column" gap="1">
                <FormControl>
                  <FormLabel htmlFor="carModel">Modelo</FormLabel>
                  <Input
                    id="carModel"
                    placeholder="Insira a marca do veículo..."
                    value={requestData?.metadata.carModel}
                    isReadOnly
                  />
                </FormControl>
              </Flex>
            </Flex>
            <Flex w="100%" h="fit-content" direction="row" justify="" align="flex-start">
              <Flex flex="1" direction="column" gap="1">
                <FormControl maxW="90%" isInvalid={!!errors.insuranceStartDate}>
                  <FormLabel htmlFor="insuranceStartDate">Data de início</FormLabel>
                  <Input
                    id="insuranceStartDate"
                    type="date"
                    placeholder="Insira a data..."
                    value={
                      isSubmitted
                        ? requestData?.insuranceStartDate?.toISOString().slice(0, 10)
                        : undefined
                    }
                    {...register('insuranceStartDate', {
                      valueAsDate: true,
                      required: 'Campo obrigatório',
                    })}
                    disabled={isSubmitting}
                    isReadOnly={isSubmitted}
                  />
                  <FormErrorMessage>
                    {errors.insuranceStartDate && errors.insuranceStartDate.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex flex="1" direction="column" gap="1">
                <FormControl maxW="90%" isInvalid={!!errors.insuranceEndDate}>
                  <FormLabel htmlFor="insuranceEndDate">Data de fim</FormLabel>
                  <Input
                    id="insuranceEndDate"
                    type="date"
                    placeholder="Insira a data..."
                    value={
                      isSubmitted
                        ? requestData?.insuranceEndDate?.toISOString().slice(0, 10)
                        : undefined
                    }
                    {...register('insuranceEndDate', {
                      valueAsDate: true,
                      required: 'Campo obrigatório',
                    })}
                    disabled={isSubmitting}
                    isReadOnly={isSubmitted}
                  />
                  <FormErrorMessage>
                    {errors.insuranceEndDate && errors.insuranceEndDate.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex flex="1" direction="column" gap="1">
                <FormControl isInvalid={!!errors.price}>
                  <FormLabel htmlFor="price">Preço</FormLabel>
                  <InputGroup>
                    <Input
                      id="price"
                      type="number"
                      step="0.000000000000000001"
                      placeholder="Insira o preço..."
                      value={isSubmitted ? requestData?.price : undefined}
                      {...register('price', {
                        required: 'Campo obrigatório',
                        min: 0,
                      })}
                      disabled={isSubmitting}
                      isReadOnly={isSubmitted}
                    />
                    <InputRightAddon>ETH</InputRightAddon>
                  </InputGroup>
                  <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
                </FormControl>
              </Flex>
            </Flex>
            <Flex w="100%" h="fit-content" direction="row" justify="" align="flex-start">
              <Flex flex="1" direction="column" gap="1">
                <FormControl maxW="63.5%" isInvalid={!!errors.contractUrl}>
                  <FormLabel htmlFor="contractUrl">Url externo</FormLabel>
                  <Input
                    id="contractUrl"
                    placeholder="Link do contrato..."
                    value={isSubmitted ? requestData?.contractUrl : undefined}
                    {...register('contractUrl', {
                      required: 'Campo obrigatório',
                      minLength: { value: 2, message: 'Mínimo de 2 caracteres' },
                    })}
                    disabled={isSubmitting}
                    isReadOnly={isSubmitted}
                  />
                  <FormErrorMessage>
                    {errors.contractUrl && errors.contractUrl.message}
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

export default VehicleInsuranceApproval
