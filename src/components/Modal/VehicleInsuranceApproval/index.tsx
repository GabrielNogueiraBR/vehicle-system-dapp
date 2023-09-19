'use client'
import React, { useMemo } from 'react'
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
  VStack,
  Icon,
  useToast,
  Link,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react'
import { useFieldArray, useForm } from 'react-hook-form'
import {
  Status,
  VehicleInsuranceProposal,
  VehicleInsuranceRequest,
  VehicleMetadata,
  VehicleRequest,
} from '@/types/contract'
import { RiAddCircleLine } from 'react-icons/ri'
import { useContractFunction } from '@usedapp/core'
import { useWeb3 } from '@/contexts/Web3Context'
import { BLOCK_EXPLORER } from '@/constants/web3'
import useVehicleMetadata from '@/hooks/useVehicleMetadata'
import { ethers } from 'ethers'

type FormValueOwnershipRecord = {
  driverLicenseCode: string
  federalUnit: string
  county: string
  vehiclePlate: string
  year: string
  startDate: string
  endDate: string
}

export type FormValue = {
  insuranceStartDate: string
  insuranceEndDate: string
  price: number
  contractUrl: string
}

type ReturnOfFunction = Awaited<ReturnType<ReturnType<typeof useContractFunction>['send']>>

interface Props extends Omit<ModalProps, 'children'> {
  tokenId: number
  metadata?: VehicleMetadata
  vehicleInsuranceRequest?: VehicleInsuranceRequest
  vehicleInsuranceProposal?: VehicleInsuranceProposal
  onApprove?: () => void
}

const VehicleInsuranceApproval = ({
  tokenId,
  metadata,
  vehicleInsuranceRequest,
  vehicleInsuranceProposal,
  onApprove,
  ...rest
}: Props) => {
  const { approveVehicleRequest } = useWeb3()
  const toast = useToast()

  const isSubmitted = !!vehicleInsuranceProposal

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValue>()

  const onSubmit = async (data: FormValue) => {
    try {
      const price = ethers.utils.parseUnits(String(data.price), 'ether')
      
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
                  <Input id="tokenId" value={tokenId} isReadOnly />
                </FormControl>
              </Flex>
              <Flex flex="1" direction="column" gap="1">
                <FormControl maxW="90%">
                  <FormLabel htmlFor="carBrand">Marca</FormLabel>
                  <Input
                    id="carBrand"
                    placeholder="Insira a marca do veículo..."
                    value={metadata?.carBrand}
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
                    value={metadata?.carModel}
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
                      vehicleInsuranceProposal
                        ? vehicleInsuranceProposal.insuranceStartDate.toISOString().slice(0, 10)
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
                      vehicleInsuranceProposal
                        ? vehicleInsuranceProposal.insuranceEndDate.toISOString().slice(0, 10)
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
                      step="0.001"
                      placeholder="Insira o preço..."
                      value={vehicleInsuranceProposal ? vehicleInsuranceProposal.price : undefined}
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
              Cancelar
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
