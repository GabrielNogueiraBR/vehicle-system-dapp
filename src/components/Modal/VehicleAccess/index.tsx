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

interface Props extends Omit<ModalProps, 'children'> {
  tokenId: string
}

const VehicleAccess = ({ tokenId, ...rest }: Props) => {
  return (
    <Modal size="4xl" {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Acesso ao veículo</ModalHeader>
        <ModalBody>
          {/* <CustomDataTable
            pagination={false}
            defaultSortFieldId="endDate"
            defaultSortAsc={false}
            columns={[
              {
                name: 'Usuário',
                selector: (row) => row.driverLicenseCode,
                wrap: true,
                grow: 0.5,
                format: (row) => row.driverLicenseCode || '-',
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
                name: 'Status',
                selector: (row) => row.federalUnit,
                sortable: true,
                wrap: true,
                grow: 0.5,
                format: (row) => row.federalUnit || '-',
              },
              {
                name: 'Ações',
                selector: (row) => row.federalUnit,
                wrap: true,
                center: true,
                grow: 0.5,
              },
            ]}
            data={[{}]}
          /> */}
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
