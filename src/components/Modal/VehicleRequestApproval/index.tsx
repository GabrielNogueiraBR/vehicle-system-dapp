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
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Status, VehicleRequest } from '@/types/contract'

type FormValue = {}

interface Props extends Omit<ModalProps, 'children'> {
  vehicleRequest?: VehicleRequest
  onApprove?: () => void
}

const VehicleRequestApprovalModal = ({ vehicleRequest, onApprove, ...rest }: Props) => {
  const [isApproving, setIsApproving] = useState<boolean>(false)
  const submittedStatus = useMemo(() => [Status.APPROVED, Status.COMPLETED, Status.CANCEL], [])
  const isSubmitted = vehicleRequest ? submittedStatus.includes(vehicleRequest.status) : false

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValue>()

  const onSubmit = async (data: FormValue) => {
    console.log({ data })

    rest.onClose()
    if (onApprove) onApprove()
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
        <ModalHeader>
          {isSubmitted ? 'Solicitação aprovada' : 'Aprovação da solicitação'}
        </ModalHeader>
        <ModalBody>
          <Flex direction="column" justifyContent="flex-start" gap="4">
            {vehicleRequest?.agent}
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
              isLoading={isApproving}
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
