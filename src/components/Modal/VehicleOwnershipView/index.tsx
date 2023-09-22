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
import { VehicleOwnershipRecord } from '@/types/contract'
import CustomDataTable from '@/components/CustomDataTable'

interface Props extends Omit<ModalProps, 'children'> {
  ownership: VehicleOwnershipRecord[]
}

const VehicleOwnershipViewModal = ({ ownership, ...rest }: Props) => {
  return (
    <Modal size="6xl" {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Histórico de proprietários</ModalHeader>
        <ModalBody>
          <CustomDataTable
            pagination={false}
            defaultSortFieldId="endDate"
            defaultSortAsc={false}
            columns={[
              {
                name: 'CNH',
                selector: (row) => row.driverLicenseCode,
                wrap: true,
                grow: 0.5,
                format: (row) => row.driverLicenseCode || '-',
              },
              {
                name: 'Placa do veículo',
                selector: (row) => row.vehiclePlate,
                sortable: true,
                wrap: true,
                grow: 1,
                format: (row) => row.vehiclePlate || '-',
              },
              {
                id: 'startDate',
                name: 'Data início',
                selector: (row) => row.startDate.getTime(),
                sortable: true,
                wrap: true,
                grow: 1,
                format: (row) =>
                  new Intl.DateTimeFormat('pt-BR', {
                    timeZone: 'UTC',
                    month: 'long',
                    year: 'numeric',
                    day: '2-digit',
                  }).format(row.startDate),
              },
              {
                id: 'endDate',
                name: 'Data fim',
                selector: (row) => row.endDate.getTime(),
                sortable: true,
                wrap: true,
                grow: 1,
                format: (row) =>
                  new Intl.DateTimeFormat('pt-BR', {
                    timeZone: 'UTC',
                    month: 'long',
                    year: 'numeric',
                    day: '2-digit',
                  }).format(row.endDate),
              },
              {
                name: 'Estado',
                selector: (row) => row.federalUnit,
                sortable: true,
                wrap: true,
                grow: 0.5,
                format: (row) => row.federalUnit || '-',
              },
            ]}
            data={ownership}
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

export default VehicleOwnershipViewModal
