'use client'

import React, { useRef, useState } from 'react'
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
  ButtonGroup,
} from '@chakra-ui/react'

interface Props extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  address: string
  onConfirm?: (address: string) => Promise<void>
  onCancel?: (address: string) => Promise<void>
}

const DeleteAlert = ({ address, onConfirm, onCancel, ...rest }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const buttonRef = useRef(null)

  const onConfirmParam = onConfirm
  onConfirm = async (address: string) => {
    try {
      setIsLoading(true)
      if (onConfirmParam) await onConfirmParam(address)
      rest.onClose()
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const onCancelParam = onCancel
  onCancel = async (address: string) => {
    if (onCancelParam) await onCancelParam(address)
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
          <ButtonGroup spacing={3}>
            <Button onClick={rest.onClose} px="8" display={isLoading ? undefined : 'none'}>
              Fechar
            </Button>
            <Button
              ref={buttonRef}
              onClick={() => onCancel && onCancel(address)}
              display={isLoading ? 'none' : undefined}
            >
              Cancelar
            </Button>
            <Button
              loadingText="Revogando..."
              isLoading={isLoading}
              onClick={() => onConfirm && onConfirm(address)}
              colorScheme="red"
              px="8"
            >
              Revogar
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAlert
