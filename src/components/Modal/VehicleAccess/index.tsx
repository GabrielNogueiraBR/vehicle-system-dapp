'use client'

import React from 'react'
import {
  Modal,
  ModalProps,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
} from '@chakra-ui/react'
import CustomDataTable from '@/components/CustomDataTable'
import useVehicleAccesses from '@/hooks/useVehicleAccesses'
import { ADDRESS_REGEX } from '@/constants/web3'

interface Props extends Omit<ModalProps, 'children'> {
  tokenId: string
}

const VehicleAccess = ({ tokenId, ...rest }: Props) => {
  const { accesses, isLoading, load } = useVehicleAccesses(tokenId)

  return (
    <Modal size="5xl" {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Acesso ao veículo</ModalHeader>
        <ModalBody>
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
                cell: (row) => 'teste',
              },
              {
                name: 'Ações',
                wrap: true,
                center: true,
                grow: 0.5,
                cell: (row) => 'acoes',
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
  )
}

export default VehicleAccess
