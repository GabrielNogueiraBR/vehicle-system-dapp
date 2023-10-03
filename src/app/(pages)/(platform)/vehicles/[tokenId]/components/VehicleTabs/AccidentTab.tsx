'use client'

import React, { useCallback, useRef } from 'react'

import { TabPanel, TabPanelProps, useDisclosure } from '@chakra-ui/react'
import CreateButton from '@/components/CreateButton'
import CustomDataTable from '@/components/CustomDataTable'
import { ADDRESS_REGEX } from '@/constants/web3'
import ButtonEye from '@/components/Buttons/ButtonEye'
import { useVehicle } from '@/contexts/VehicleContext'
import VehicleAccidentModal from '@/components/Modal/VehicleAccident'
import { InsuranceStatus, VehicleAccident } from '@/types/contract'
import ButtonIconGear from '@/components/Buttons/ButtonIconGear'
import VehicleAccidentServiceCreate from '@/components/Modal/VehicleServiceCreate/VehicleAccidentServiceCreate'

interface AccidentTabProps extends Omit<TabPanelProps, 'children'> {}

const AccidentTab = ({ ...rest }: AccidentTabProps) => {
  const { tokenId, useAccidents, useServices, useContract, isInsurer } = useVehicle()

  const { load: loadServices } = useServices
  const { accidents, isLoading: isLoadingAccidents, load: loadAccidents } = useAccidents
  const { contracts, load: loadContracts } = useContract

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

  const {
    isOpen: isVehicleAccidentServiceOpen,
    onOpen: onVehicleAccidentServiceOpen,
    onClose: onVehicleAccidentServiceClose,
  } = useDisclosure()

  const isInsuranceActive = useCallback(
    (insuranceId: number) => {
      return (
        contracts.find((contract) => contract.id === insuranceId)?.status === InsuranceStatus.ACTIVE
      )
    },
    [contracts]
  )

  const handleViewAccidentClick = (accident: VehicleAccident) => {
    accidentViewRef.current = accident
    onVehicleAccidentViewOpen()
  }

  const handleAddVehicleServiceClick = (accident: VehicleAccident) => {
    accidentViewRef.current = accident
    onVehicleAccidentServiceOpen()
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
            width: '5.5rem',
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
          {
            center: true,
            wrap: true,
            cell: (row) => (
              <ButtonIconGear
                onClick={() => handleAddVehicleServiceClick(row)}
                display={isInsurer && isInsuranceActive(row.insuranceId) ? 'flex' : 'none'}
              />
            ),
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

      <VehicleAccidentServiceCreate
        isOpen={isVehicleAccidentServiceOpen}
        onClose={onVehicleAccidentServiceClose}
        tokenId={tokenId}
        accidentId={accidentViewRef.current?.id}
        insuranceId={accidentViewRef.current?.insuranceId}
        onCreate={async () => {
          await loadAccidents()
          await loadContracts()
          await loadServices()
        }}
      />
    </TabPanel>
  )
}

export default AccidentTab
