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
} from '@chakra-ui/react'
import { useFieldArray, useForm } from 'react-hook-form'
import {
  Status,
  VehicleInsuranceProposal,
  VehicleInsuranceRequest,
  VehicleRequest,
} from '@/types/contract'
import { RiAddCircleLine } from 'react-icons/ri'
import { useContractFunction } from '@usedapp/core'
import { useWeb3 } from '@/contexts/Web3Context'
import { BLOCK_EXPLORER } from '@/constants/web3'
import useVehicleMetadata from '@/hooks/useVehicleMetadata'

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
  vehicleInsuranceRequest?: VehicleInsuranceRequest
  onApprove?: () => void
}

const VehicleInsuranceApproval = ({ vehicleInsuranceRequest, onApprove, ...rest }: Props) => {
  const { approveVehicleRequest } = useWeb3()
  const { metadata, isLoading: isMetadataLoading } = useVehicleMetadata(
    String(vehicleInsuranceRequest?.tokenId) || 'no token'
  )
  const toast = useToast()

  const submittedStatus = useMemo(() => [Status.APPROVED, Status.COMPLETED, Status.CANCEL], [])
  const isSubmitted = vehicleInsuranceRequest
    ? submittedStatus.includes(vehicleInsuranceRequest.status)
    : false

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValue>()

  const onSubmit = async (data: FormValue) => {
    try {
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
                  <Input id="tokenId" value={vehicleInsuranceRequest?.tokenId} isReadOnly />
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
