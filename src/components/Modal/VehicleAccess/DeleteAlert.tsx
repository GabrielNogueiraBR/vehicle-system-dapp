'use client'

import React, { useRef } from 'react'
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Text,
  AlertDialogProps,
} from '@chakra-ui/react'

interface Props extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  address: string
  onConfirm?: (address: string) => void
  onCancel?: (address: string) => void
}

const DeleteAlert = ({ address, onConfirm, onCancel, ...rest }: Props) => {
  const buttonRef = useRef(null)

  const onConfirmParam = onConfirm
  onConfirm = (address: string) => {
    if (onConfirmParam) onConfirmParam(address)
    rest.onClose()
  }

  const onCancelParam = onCancel
  onCancel = (address: string) => {
    if (onCancelParam) onCancelParam(address)
    rest.onClose()
  }

  return (
    <AlertDialog leastDestructiveRef={buttonRef} motionPreset="slideInBottom" isCentered {...rest}>
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Revogar acesso?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Text>
            Tem certeza que deseja revogar o acesso? O endereço{' '}
            <Text as="span" fontWeight={700}>
              {address}
            </Text>{' '}
            não terá mais acesso aos dados do NFT.
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={buttonRef} onClick={() => onCancel && onCancel(address)} px="8">
            Cancelar
          </Button>
          <Button onClick={() => onConfirm && onConfirm(address)} colorScheme="red" ml="3" px="8">
            Revogar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAlert
