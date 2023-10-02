'use client'

import React, { useState } from 'react'
import {
  Modal,
  ModalProps,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  Icon,
  ButtonGroup,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import CustomDataTable from '@/components/CustomDataTable'
import useVehicleAccesses from '@/hooks/useVehicleAccesses'
import { ADDRESS_REGEX } from '@/constants/web3'
import BadgeStatus from '@/components/BadgeStatus'
import { BiEdit, BiSolidXCircle } from 'react-icons/bi'
import DeleteAlert from './DeleteAlert'
import CreateButton from '@/components/CreateButton'
import CreateAccess from './CreateAccess'

interface Props extends Omit<ModalProps, 'children'> {
  tokenId: string
}

const VehicleAccess = ({ tokenId, ...rest }: Props) => {
  const { accesses, isLoading, load: loadAccess, revoke, giveAccess } = useVehicleAccesses(tokenId)

  const [selectedAddress, setSelectedAddress] = useState<string>('')

  const {
    isOpen: isAlertDeleteOpen,
    onOpen: onAlertDeleteOpen,
    onClose: onAlertDeleteClose,
  } = useDisclosure()

  const {
    isOpen: isCreateVehicleAccessOpen,
    onOpen: onCreateVehicleAccessOpen,
    onClose: onCreateVehicleAccessClose,
  } = useDisclosure()

  const handleRevokeAccessClick = (address: string) => {
    setSelectedAddress(address)
    onAlertDeleteOpen()
  }

  const handleEditAccessClick = (address: string) => {
    setSelectedAddress(address)
  }

  return (
    <>
      <Modal size="5xl" {...rest}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Acesso ao veículo</ModalHeader>
          <ModalBody display="flex" flexDirection="column" gap="4">
            <CreateButton
              w="fit-content"
              display="flex"
              alignSelf="flex-end"
              onClick={onCreateVehicleAccessOpen}
            >
              Adicionar acesso
            </CreateButton>
            <CustomDataTable
              pagination={false}
              defaultSortFieldId="endDate"
              defaultSortAsc={false}
              columns={[
                {
                  name: 'Usuário',
                  selector: (row) => row.address,
                  wrap: true,
                  format: (row) => row.address.replace(ADDRESS_REGEX, '$1...$2'),
                },
                {
                  id: 'startDate',
                  name: 'Data início',
                  selector: (row) => row.createdAt.getTime(),
                  sortable: true,
                  wrap: true,
                  format: (row) =>
                    new Intl.DateTimeFormat('pt-BR', {
                      timeZone: 'UTC',
                      month: 'long',
                      year: 'numeric',
                      day: '2-digit',
                    }).format(row.createdAt),
                },
                {
                  id: 'endDate',
                  name: 'Data fim',
                  selector: (row) => row.expirationDate.getTime(),
                  sortable: true,
                  wrap: true,
                  format: (row) =>
                    new Intl.DateTimeFormat('pt-BR', {
                      timeZone: 'UTC',
                      month: 'long',
                      year: 'numeric',
                      day: '2-digit',
                    }).format(row.expirationDate),
                },
                {
                  name: 'Status',
                  sortable: true,
                  wrap: true,
                  grow: 0.5,
                  cell: (row) => {
                    const isExpired = row.expirationDate.getTime() < Date.now()
                    return (
                      <BadgeStatus theme={isExpired ? 'purple' : 'green'}>
                        {isExpired ? 'Inativo' : 'Ativo'}
                      </BadgeStatus>
                    )
                  },
                },
                {
                  selector: (row) => row.address,
                  grow: 0.2,
                  cell: (row) => {
                    const isExpired = row.expirationDate.getTime() < Date.now()

                    return (
                      <ButtonGroup>
                        <Tooltip label="Editar acesso" placement="top" hasArrow>
                          <Button
                            colorScheme="none"
                            p={0}
                            m={0}
                            w="fit-content"
                            h="fit-content"
                            minW={0}
                            minH={0}
                            aspectRatio={1}
                            onClick={() => handleEditAccessClick(row.address)}
                          >
                            <Icon
                              as={BiEdit}
                              bg="transparent"
                              color="dark-green"
                              rounded="md"
                              fontSize="2xl"
                            />
                          </Button>
                        </Tooltip>
                        <Tooltip label="Revogar acesso" placement="top" hasArrow>
                          <Button
                            colorScheme="none"
                            p={0}
                            m={0}
                            w="fit-content"
                            h="fit-content"
                            minW={0}
                            minH={0}
                            aspectRatio={1}
                            onClick={() => handleRevokeAccessClick(row.address)}
                            display={isExpired ? 'none' : undefined}
                          >
                            <Icon
                              as={BiSolidXCircle}
                              bg="transparent"
                              color="dark-purple"
                              rounded="md"
                              fontSize="2xl"
                            />
                          </Button>
                        </Tooltip>
                      </ButtonGroup>
                    )
                  },
                },
              ]}
              data={accesses}
              progressPending={isLoading}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={rest.onClose} variant="outline" colorScheme="purple" px="12">
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <DeleteAlert
        onConfirm={async (address) => {
          await revoke(address)
        }}
        address={selectedAddress}
        isOpen={isAlertDeleteOpen}
        onClose={onAlertDeleteClose}
      />
      <CreateAccess
        tokenId={tokenId}
        isOpen={isCreateVehicleAccessOpen}
        onClose={onCreateVehicleAccessClose}
        onCreate={loadAccess}
      />
    </>
  )
}

export default VehicleAccess
