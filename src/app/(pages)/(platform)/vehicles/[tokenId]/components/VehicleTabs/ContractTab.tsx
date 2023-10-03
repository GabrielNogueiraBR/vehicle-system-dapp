'use client'

import React, { useMemo, useState } from 'react'

import { TabPanel, TabPanelProps, useDisclosure } from '@chakra-ui/react'
import BadgeStatus from '@/components/BadgeStatus'
import ButtonEye from '@/components/Buttons/ButtonEye'
import CreateButton from '@/components/CreateButton'
import CustomDataTable from '@/components/CustomDataTable'
import { ADDRESS_REGEX } from '@/constants/web3'
import { InsuranceStatus } from '@/types/contract'
import VehicleContractInfoModal from '@/components/Modal/VehicleContractInfo'
import VehicleContractRequestCreateModal from '@/components/Modal/VehicleContractRequestCreate'
import { useVehicle } from '@/contexts/VehicleContext'

interface ContractTabProps extends Omit<TabPanelProps, 'children'> {}

const ContractTab = ({ ...rest }: ContractTabProps) => {
  const { tokenId, useContract, useOwner } = useVehicle()
  const { contracts, isLoading: isLoadingContracts, load: loadContracts } = useContract
  const { isOwner } = useOwner

  const {
    isOpen: isVehicleInsuranceRequestModalOpen,
    onOpen: onOpenVehicleInsuranceRequestModal,
    onClose: onCloseVehicleInsuranceRequestModal,
  } = useDisclosure()
  const {
    isOpen: isVehicleContractViewOpen,
    onOpen: onVehicleContractViewOpen,
    onClose: onVehicleContractViewClose,
  } = useDisclosure()

  const [vehicleContractViewId, setVehicleContractViewId] = useState<number | undefined>(undefined)

  const vehicleContract = useMemo(
    () =>
      vehicleContractViewId !== undefined
        ? contracts.find((c) => c.id === vehicleContractViewId)
        : undefined,
    [contracts, vehicleContractViewId]
  )

  return (
    <TabPanel display="flex" flexDirection="column" pt="8" p="6" gap="4" w="100%" {...rest}>
      <CreateButton
        alignSelf="flex-end"
        mr="4"
        onClick={onOpenVehicleInsuranceRequestModal}
        hideTextOnSmallScreen
        display={!isOwner ? 'none' : undefined}
      >
        Solicitar contrato
      </CreateButton>
      <CustomDataTable
        defaultSortFieldId="final_date"
        defaultSortAsc={false}
        columns={[
          {
            name: '#',
            selector: (row) => row.id,
            center: true,
            wrap: true,
            width: '5.5rem',
            cell: (row) => (
              <ButtonEye
                onClick={() => {
                  setVehicleContractViewId(row.id)
                  onVehicleContractViewOpen()
                }}
              />
            ),
          },
          {
            name: 'Seguradora',
            selector: (row) => row.insurer,
            sortable: true,
            wrap: true,
            grow: 1,
            format: (row) => `${row.insurer.replace(ADDRESS_REGEX, '$1...$2')}`,
          },
          {
            name: 'Data início',
            selector: (row) => row.insuranceStartDate.getTime(),
            sortable: true,
            wrap: true,
            grow: 1,
            format: (row) =>
              new Intl.DateTimeFormat('pt-BR', {
                timeZone: 'UTC',
                month: 'long',
                year: 'numeric',
                day: '2-digit',
              }).format(row.insuranceStartDate),
          },
          {
            id: 'final_date',
            name: 'Data fim',
            selector: (row) => row.insuranceEndDate.getTime(),
            sortable: true,
            wrap: true,
            grow: 1,
            format: (row) =>
              new Intl.DateTimeFormat('pt-BR', {
                timeZone: 'UTC',
                month: 'long',
                year: 'numeric',
                day: '2-digit',
              }).format(row.insuranceEndDate),
          },
          {
            name: 'Status',
            selector: (row) => row.status,
            sortable: true,
            wrap: true,
            grow: 0.5,
            cell: (row) => {
              const isExpired = row.status === InsuranceStatus.EXPIRED

              return (
                <BadgeStatus theme={isExpired ? 'purple' : 'green'}>
                  {isExpired ? 'Inativo' : 'Ativo'}
                </BadgeStatus>
              )
            },
          },
        ]}
        data={contracts}
        progressPending={isLoadingContracts}
      />
      <VehicleContractRequestCreateModal
        tokenId={tokenId}
        isOpen={isVehicleInsuranceRequestModalOpen}
        onClose={onCloseVehicleInsuranceRequestModal}
        onCreate={loadContracts}
      />
      <VehicleContractInfoModal
        isOpen={isVehicleContractViewOpen}
        onClose={onVehicleContractViewClose}
        tokenId={vehicleContract?.tokenId || 0}
        insurer={vehicleContract?.insurer || ''}
        insuranceStartDate={vehicleContract?.insuranceStartDate}
        insuranceEndDate={vehicleContract?.insuranceEndDate}
        contractUrl={vehicleContract?.contractUrl}
        status="contract"
      />
    </TabPanel>
  )
}

export default ContractTab
