'use client'

import React, { useMemo, useRef, useState } from 'react'

import { TabPanel, TabPanelProps, useDisclosure } from '@chakra-ui/react'
import CreateButton from '@/components/CreateButton'
import CustomDataTable from '@/components/CustomDataTable'
import { ADDRESS_REGEX } from '@/constants/web3'
import ButtonEye from '@/components/Buttons/ButtonEye'
import { useVehicle } from '@/contexts/VehicleContext'
import VehicleAccidentModal from '@/components/Modal/VehicleAccident'
import { VehicleAccident } from '@/types/contract'

interface AccidentTabProps extends Omit<TabPanelProps, 'children'> {}

const AccidentTab = ({ ...rest }: AccidentTabProps) => {
  const { useAccidents, isInsurer } = useVehicle()
  const { accidents, isLoading: isLoadingAccidents, load: loadAccidents } = useAccidents

  const accidentViewRef = useRef<VehicleAccident>()

  const {
    isOpen: isVehicleAccidentCreateOpen,
    onOpen: onVehicleAccidentCreateOpen,
    onClose: onVehicleAccidentCreateClose,
  } = useDisclosure()

  const {
    isOpen: isVehicleAccidentViewOpen,
    onOpen: onVehicleAccidentViewOpen,
    onClose: onVehicleAccidentViewClose,
  } = useDisclosure()

  const handleViewAccidentClick = (accident: VehicleAccident) => {
    accidentViewRef.current = accident
    onVehicleAccidentViewOpen()
  }

  return (
    <TabPanel display="flex" flexDirection="column" pt="8" p="6" gap="4" w="100%" {...rest}>
      <CreateButton
        alignSelf="flex-end"
        mr="4"
        onClick={onVehicleAccidentCreateOpen}
        hideTextOnSmallScreen
        display={!isInsurer ? 'none' : undefined}
      >
        Cadastrar sinistro
      </CreateButton>
      <CustomDataTable
        defaultSortFieldId="date"
        defaultSortAsc={false}
        columns={[
          {
            name: '#',
            selector: (row) => row.id,
            center: true,
            wrap: true,
            grow: 0.5,
            cell: (row) => <ButtonEye onClick={() => handleViewAccidentClick(row)} />,
          },
          {
            name: 'Descrição',
            selector: (row) => row.description,
            sortable: true,
            wrap: true,
            grow: 3,
          },
          {
            name: 'Seguradora',
            selector: (row) => row.insurer,
            sortable: true,
            wrap: true,
            grow: 3,
            format: (row) => `${row.insurer.replace(ADDRESS_REGEX, '$1...$2')}`,
          },
          {
            id: 'date',
            name: 'Data',
            selector: (row) => row.accidentDate.getTime(),
            sortable: true,
            wrap: true,
            grow: 1,
            format: (row) =>
              new Intl.DateTimeFormat('pt-BR', {
                timeZone: 'UTC',
                month: 'long',
                year: 'numeric',
                day: '2-digit',
              }).format(row.accidentDate),
          },
        ]}
        data={accidents}
        progressPending={isLoadingAccidents}
      />

      <VehicleAccidentModal
        isOpen={isVehicleAccidentCreateOpen}
        onClose={onVehicleAccidentCreateClose}
        onCreate={loadAccidents}
      />
      <VehicleAccidentModal
        isOpen={isVehicleAccidentViewOpen}
        onClose={onVehicleAccidentViewClose}
        vehicleAccident={accidentViewRef.current}
      />
    </TabPanel>
  )
}

export default AccidentTab
