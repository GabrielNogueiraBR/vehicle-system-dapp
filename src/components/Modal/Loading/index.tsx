'use client'

import React from 'react'
import {
  Modal,
  ModalProps,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Heading,
} from '@chakra-ui/react'
import LoadingPage from '@/components/LoadingPage'

type FormValue = {
  cnh: string
}

interface Props extends Omit<ModalProps, 'children' | 'onClose'> {}

const LoadingModalAccess = ({ ...rest }: Props) => {
  return (
    <Modal size="md" closeOnEsc={false} closeOnOverlayClick={false} onClose={() => {}} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody display="flex" flexDirection="column" alignItems="center" gap="4">
          <Heading as="h4" fontSize="xl">
            Carregando acessos...
          </Heading>
          <LoadingPage />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default LoadingModalAccess
