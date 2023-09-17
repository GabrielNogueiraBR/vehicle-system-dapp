'use client'

import React from 'react'
import {
  Button,
  Flex,
  FlexProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
} from '@chakra-ui/react'
import { RiIndeterminateCircleLine } from 'react-icons/ri'
import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
} from 'react-hook-form'
import { FormValue } from '.'
import { VehicleRequest } from '@/types/contract'

interface Props extends FlexProps {
  index: number
  field: FieldArrayWithId<FormValue, 'ownershipRecords', 'id'>
  vehicleRequest?: VehicleRequest
  isSubmitted: boolean
  isSubmitting: boolean
  errors: FieldErrors<FormValue>
  remove: UseFieldArrayRemove
  register: UseFormRegister<FormValue>
}

const OwnershipForm = ({
  index,
  field,
  vehicleRequest,
  isSubmitted,
  isSubmitting,
  errors,
  remove,
  register,
  ...rest
}: Props) => {
  return (
    <Flex direction="column" justify="flex-start" align="flex-start" gap="4" w="100%" {...rest}>
      <Button
        display="flex"
        justifyContent="center"
        alignItems="center"
        variant="ghost"
        color="red"
        colorScheme="none"
        justifySelf="flex-end"
        alignSelf="flex-end"
        px={0}
        py={1}
        m={0}
        w="fit-content"
        h="fit-content"
        zIndex={1}
        minH={0}
        minW={0}
        isDisabled={isSubmitting}
        onClick={() => remove(index)}
      >
        <Icon p={0} m={0} as={RiIndeterminateCircleLine} fontSize="xl" />
      </Button>
      <Flex
        w="100%"
        h="fit-content"
        mt="-8"
        direction="row"
        justify="flex-start"
        align="flex-start"
      >
        <Flex flex="1" direction="column" gap="1">
          <FormControl
            maxW="90%"
            isInvalid={!!errors?.ownershipRecords?.[index]?.driverLicenseCode}
          >
            <FormLabel htmlFor={`driverLicenseCode-${field.id}`}>CNH</FormLabel>
            <Input
              id={`driverLicenseCode-${field.id}`}
              placeholder="Insira a CNH..."
              value={
                isSubmitted
                  ? vehicleRequest?.vehicleData?.vehicleOwnershipRecords?.[index].driverLicenseCode
                  : undefined
              }
              {...register(`ownershipRecords.${index}.driverLicenseCode`, {
                required: 'Campo obrigatório',
                minLength: { value: 4, message: 'Mínimo de 4 caracteres' },
              })}
              disabled={isSubmitting}
              isReadOnly={isSubmitted}
            />
            <FormErrorMessage>
              {errors?.ownershipRecords?.[index]?.driverLicenseCode &&
                errors?.ownershipRecords?.[index]?.driverLicenseCode?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex flex="1" direction="column" gap="1">
          <FormControl maxW="100%" isInvalid={!!errors?.ownershipRecords?.[index]?.vehiclePlate}>
            <FormLabel htmlFor={`vehiclePlate-${field.id}`}>Placa do veículo</FormLabel>
            <Input
              id={`vehiclePlate-${field.id}`}
              placeholder="Insira a placa do veículo..."
              value={
                isSubmitted
                  ? vehicleRequest?.vehicleData?.vehicleOwnershipRecords?.[index].vehiclePlate
                  : undefined
              }
              {...register(`ownershipRecords.${index}.vehiclePlate`, {
                required: 'Campo obrigatório',
                minLength: { value: 4, message: 'Mínimo de 4 caracteres' },
              })}
              disabled={isSubmitting}
              isReadOnly={isSubmitted}
            />
            <FormErrorMessage>
              {errors?.ownershipRecords?.[index]?.vehiclePlate &&
                errors?.ownershipRecords?.[index]?.vehiclePlate?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
      </Flex>
      <Flex w="100%" h="fit-content" direction="row" justify="" align="flex-start">
        <Flex flex="2" direction="column" gap="1">
          <FormControl maxW="90%" isInvalid={!!errors?.ownershipRecords?.[index]?.startDate}>
            <FormLabel htmlFor={`startDate-${field.id}`}>Data início</FormLabel>
            <Input
              id={`startDate-${field.id}`}
              type="date"
              placeholder="Insira a data..."
              value={
                isSubmitted
                  ? vehicleRequest?.vehicleData?.vehicleOwnershipRecords?.[index].startDate
                      .toISOString()
                      .slice(0, 10)
                  : undefined
              }
              {...register(`ownershipRecords.${index}.startDate`, {
                valueAsDate: true,
                required: 'Campo obrigatório',
              })}
              disabled={isSubmitting}
              isReadOnly={isSubmitted}
            />
            <FormErrorMessage>
              {errors?.ownershipRecords?.[index]?.startDate &&
                errors?.ownershipRecords?.[index]?.startDate?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>

        <Flex flex="2" direction="column" gap="1">
          <FormControl maxW="90%" isInvalid={!!errors?.ownershipRecords?.[index]?.endDate}>
            <FormLabel htmlFor={`endDate-${field.id}`}>Data fim</FormLabel>
            <Input
              id={`endDate-${field.id}`}
              type="date"
              placeholder="Insira a data..."
              value={
                isSubmitted
                  ? vehicleRequest?.vehicleData?.vehicleOwnershipRecords?.[index].endDate
                      .toISOString()
                      .slice(0, 10)
                  : undefined
              }
              {...register(`ownershipRecords.${index}.endDate`, {
                valueAsDate: true,
                required: 'Campo obrigatório',
              })}
              disabled={isSubmitting}
              isReadOnly={isSubmitted}
            />
            <FormErrorMessage>
              {errors?.ownershipRecords?.[index]?.endDate &&
                errors?.ownershipRecords?.[index]?.endDate?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>

        <Flex flex="1" direction="column" gap="1">
          <FormControl maxW="100%" isInvalid={!!errors?.ownershipRecords?.[index]?.federalUnit}>
            <FormLabel htmlFor={`federalUnit-${field.id}`}>Estado</FormLabel>
            <Input
              id={`federalUnit-${field.id}`}
              placeholder="SP, MG, RJ..."
              value={
                isSubmitted
                  ? vehicleRequest?.vehicleData?.vehicleOwnershipRecords?.[index].federalUnit
                  : undefined
              }
              {...register(`ownershipRecords.${index}.federalUnit`, {
                required: 'Campo obrigatório',
                minLength: { value: 2, message: 'Mínimo de 2 caracteres' },
              })}
              disabled={isSubmitting}
              isReadOnly={isSubmitted}
            />
            <FormErrorMessage>
              {errors?.ownershipRecords?.[index]?.federalUnit &&
                errors?.ownershipRecords?.[index]?.federalUnit?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default OwnershipForm
