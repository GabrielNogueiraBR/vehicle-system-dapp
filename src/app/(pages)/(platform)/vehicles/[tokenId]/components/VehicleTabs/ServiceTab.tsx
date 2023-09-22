'use client'

import React, { useMemo, useState } from 'react'

import { TabPanel, TabPanelProps, useDisclosure } from '@chakra-ui/react'
import BadgeStatus from '@/components/BadgeStatus'
import ButtonEye from '@/components/Buttons/ButtonEye'
import CreateButton from '@/components/CreateButton'
import CustomDataTable from '@/components/CustomDataTable'
import { VehicleContract } from '@/types/contract'
import useVehicleServices from '@/hooks/useVehicleServices'
import VehicleServiceCreateModal from '@/components/Modal/VehicleServiceCreate'

interface ServicesTabProps extends Omit<TabPanelProps, 'children'> {
  tokenId: string
  contracts: VehicleContract[]
  useServices: ReturnType<typeof useVehicleServices>
}

const ServicesTab = ({ tokenId, contracts, useServices, ...rest }: ServicesTabProps) => {
  const { services, isLoading: isLoadingServices, load: loadServices } = useServices

  const {
    isOpen: isVehicleServiceModalOpen,
    onOpen: onOpenVehicleServiceModal,
    onClose: onCloseVehicleServiceModal,
  } = useDisclosure()

  const [vehicleServiceViewId, setVehicleServiceViewId] = useState<number | undefined>(undefined)

  const vehicleService = useMemo(
    () =>
      vehicleServiceViewId !== undefined
        ? services.find((s) => s.id === vehicleServiceViewId)
        : undefined,
    [services, vehicleServiceViewId]
  )

  return (
    <TabPanel display="flex" flexDirection="column" pt="8" p="6" gap="4" w="100%" {...rest}>
      <CreateButton
        alignSelf="flex-end"
        onClick={onOpenVehicleServiceModal}
        mr="4"
        hideTextOnSmallScreen
      >
        Cadastrar serviço
      </CreateButton>
      <CustomDataTable
        defaultSortFieldId="date"
        defaultSortAsc={false}
        columns={[
          {
            name: '#',
            center: true,
            selector: (row) => row.id,
            wrap: true,
            grow: 0.5,
            cell: (row) => (
              <ButtonEye
                onClick={() => {
                  setVehicleServiceViewId(row.id)
                  onOpenVehicleServiceModal()
                }}
              />
            ),
          },
          {
            name: 'Título',
            selector: (row) => row.title,
            sortable: true,
            wrap: true,
            grow: 1,
          },
          {
            name: 'Preço',
            selector: (row) => row.price,
            sortable: true,
            wrap: true,
            grow: 0.5,
            format: (row) => `${row.price.toFixed(18).replace(/\.?0+$/, '')} ETH`,
          },
          {
            id: 'date',
            name: 'Data',
            selector: (row) => row.date,
            sortable: true,
            wrap: true,
            grow: 0.8,
            format: (row) =>
              new Intl.DateTimeFormat('pt-BR', {
                timeZone: 'UTC',
                month: 'long',
                year: 'numeric',
                day: '2-digit',
              }).format(new Date(row.date * 1000)),
          },
          {
            name: 'Status',
            center: true,
            selector: (row) => row.id,
            sortable: true,
            wrap: true,
            grow: 0.5,
            cell: (row) => {
              const isInsured = contracts.some((contract) =>
                contract.vehicleServicesIds.some((id) => id === row.id)
              )

              return (
                <BadgeStatus theme={isInsured ? 'purple' : 'green'}>
                  {isInsured ? 'Assegurado' : 'Pago'}
                </BadgeStatus>
              )
            },
          },
        ]}
        data={services}
        progressPending={isLoadingServices}
      />
      <VehicleServiceCreateModal
        tokenId={tokenId}
        vehicleService={vehicleService}
        isOpen={isVehicleServiceModalOpen}
        onClose={() => {
          onCloseVehicleServiceModal()
          setVehicleServiceViewId(undefined)
        }}
        onCreate={loadServices}
      />
    </TabPanel>
  )
}

export default ServicesTab
