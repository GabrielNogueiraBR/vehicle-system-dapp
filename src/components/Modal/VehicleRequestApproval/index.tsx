'use client'
import React, { useMemo, useState } from 'react'
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
  IconButton,
} from '@chakra-ui/react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Status, VehicleRequest } from '@/types/contract'
import { RiAddCircleLine, RiIndeterminateCircleLine } from 'react-icons/ri'
import OwnershipForm from './OwnershipForm'

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
  carBrand: string
  carModel: string
  manufacturingDate: string
  ownershipRecords: FormValueOwnershipRecord[]
}

interface Props extends Omit<ModalProps, 'children'> {
  vehicleRequest?: VehicleRequest
  onApprove?: () => void
}

const VehicleRequestApprovalModal = ({ vehicleRequest, onApprove, ...rest }: Props) => {
  const submittedStatus = useMemo(() => [Status.APPROVED, Status.COMPLETED, Status.CANCEL], [])
  const isSubmitted = vehicleRequest ? submittedStatus.includes(vehicleRequest.status) : false

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValue>()
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray<FormValue>({
    control,
    name: 'ownershipRecords',
  })

  const onSubmit = async (data: FormValue) => {
    try {
      console.log({ data })

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

    //     color: var(--Dark, #3C3C3C);
    // font-family: Montserrat;
    // font-size: 18px;
    // font-style: normal;
    // font-weight: 500;
    // line-height: 150%; /* 27px */
  }

  // TODO: Colocar método para popular automaticamente os ownerships

  return (
    <Modal size={'4xl'} closeOnEsc={false} closeOnOverlayClick={false} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isSubmitted ? 'Solicitação aprovada' : 'Aprovação da solicitação'}
        </ModalHeader>
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
                  <FormLabel htmlFor="renavam">Código Renavam</FormLabel>
                  <Input id="renavam" value={vehicleRequest?.vehicleRegistrationCode} isReadOnly />
                </FormControl>
              </Flex>
              <Flex flex="1" direction="column" gap="1">
                <FormControl maxW="65%" isInvalid={!!errors.manufacturingDate}>
                  <FormLabel htmlFor="manufacturingDate">Data de fabricação</FormLabel>
                  <Input
                    id="manufacturingDate"
                    type="date"
                    placeholder="Insira a data..."
                    value={
                      isSubmitted
                        ? vehicleRequest?.vehicleData.manufacturingDate.toISOString().slice(0, 10)
                        : undefined
                    }
                    {...register('manufacturingDate', {
                      valueAsDate: true,
                      required: 'Campo obrigatório',
                    })}
                    disabled={isSubmitting}
                    isReadOnly={isSubmitted}
                  />
                  <FormErrorMessage>
                    {errors.manufacturingDate && errors.manufacturingDate.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
            </Flex>
            <Flex w="100%" h="fit-content" direction="row" justify="" align="flex-start">
              <Flex flex="1" direction="column" gap="1">
                <FormControl maxW="90%" isInvalid={!!errors.carBrand}>
                  <FormLabel htmlFor="carBrand">Marca</FormLabel>
                  <Input
                    id="carBrand"
                    placeholder="Insira a marca do veículo..."
                    value={isSubmitted ? vehicleRequest?.vehicleData.carBrand : undefined}
                    {...register('carBrand', {
                      required: 'Campo obrigatório',
                      minLength: { value: 2, message: 'Mínimo de 2 caracteres' },
                    })}
                    disabled={isSubmitting}
                    isReadOnly={isSubmitted}
                  />
                  <FormErrorMessage>{errors.carBrand && errors.carBrand.message}</FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex flex="1" direction="column" gap="1">
                <FormControl isInvalid={!!errors.carModel}>
                  <FormLabel htmlFor="carModel">Modelo</FormLabel>
                  <Input
                    id="carModel"
                    placeholder="Insira a marca do veículo..."
                    value={isSubmitted ? vehicleRequest?.vehicleData.carModel : undefined}
                    {...register('carModel', {
                      required: 'Campo obrigatório',
                      minLength: { value: 2, message: 'Mínimo de 2 caracteres' },
                    })}
                    disabled={isSubmitting}
                    isReadOnly={isSubmitted}
                  />
                  <FormErrorMessage>{errors.carModel && errors.carModel.message}</FormErrorMessage>
                </FormControl>
              </Flex>
            </Flex>
            <Flex
              w="100%"
              maxW="100%"
              h="fit-content"
              maxH="xs"
              overflowX="hidden"
              overflowY="auto"
              direction="row"
              justify="flex-start"
              align="flex-start"
              sx={{
                '&::-webkit-scrollbar': {
                  width: '8px',
                  borderRadius: '8px',
                  backgroundColor: '#D9D9D9',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '8px',
                  backgroundColor: 'light-gray',
                },
              }}
            >
              <VStack
                display={
                  isSubmitted && vehicleRequest?.vehicleData.vehicleOwnershipRecordIds.length
                    ? 'none'
                    : 'flex'
                }
                w="100%"
                justify="flex-start"
                align="flex-start"
              >
                <Text
                  display={
                    vehicleRequest?.vehicleData.vehicleOwnershipRecordIds.length || fields.length
                      ? 'block'
                      : 'none'
                  }
                >
                  Antigos proprietários
                </Text>
                <VStack
                  w="100%"
                  spacing={4}
                  justify="flex-start"
                  align="flex-start"
                  sx={{
                    '& > div:nth-child(n)': {
                      rounded: 'lg',
                      border: '1px dashed',
                      borderColor: 'light-gray',
                      bg: 'white',
                      w: '99%',
                      p: 3,
                      px: 4,
                      pb: 8,
                    },
                  }}
                >
                  {fields.map((field, index) => {
                    return (
                      <OwnershipForm
                        key={field.id}
                        index={index}
                        field={field}
                        vehicleRequest={vehicleRequest}
                        isSubmitted={isSubmitted}
                        isSubmitting={isSubmitting}
                        errors={errors}
                        remove={remove}
                        register={register}
                      />
                    )
                  })}
                </VStack>
              </VStack>
            </Flex>
            <Button
              variant="ghost"
              color="primary"
              colorScheme="none"
              alignSelf="center"
              display={isSubmitted ? 'none' : 'flex'}
              justifyContent="center"
              alignItems="center"
              gap="2"
              fontWeight={700}
              fontSize="lg"
              onClick={() =>
                append({
                  driverLicenseCode: '',
                  federalUnit: '',
                  county: '',
                  vehiclePlate: '',
                  year: '',
                  startDate: '',
                  endDate: '',
                })
              }
            >
              <Icon as={RiAddCircleLine} fontSize="xl" />
              Adicionar Proprietário
            </Button>
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

export default VehicleRequestApprovalModal
