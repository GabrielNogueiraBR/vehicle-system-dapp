import React, { useMemo, useState } from 'react'

import { TabPanel, TabPanelProps, useDisclosure } from '@chakra-ui/react'
import BadgeStatus from '@/components/BadgeStatus'
import ButtonEye from '@/components/Buttons/ButtonEye'
import CreateButton from '@/components/CreateButton'
import CustomDataTable from '@/components/CustomDataTable'
import { VehicleContract } from '@/types/contract'
import useVehicleServices from '@/hooks/useVehicleServices'
import VehicleServiceCreateModal from '@/components/Modal/VehicleServiceCreate'
import useVehicleAccidents from '@/hooks/useVehicleAccidents'

interface AccidentTabProps extends Omit<TabPanelProps, 'children'> {
  tokenId: string
  useAccidents: ReturnType<typeof useVehicleAccidents>
}

const AccidentTab = ({ tokenId, useAccidents, ...rest }: AccidentTabProps) => {
  const { accidents, isLoading: isLoadingAccidents, load: loadAccidents } = useAccidents

  return (
    <TabPanel display="flex" flexDirection="column" pt="8" p="6" gap="4" w="100%" {...rest}>
      <CreateButton alignSelf="flex-end" mr="4" hideTextOnSmallScreen>
        Cadastrar sinistro
      </CreateButton>
      <CustomDataTable
        defaultSortFieldId="date"
        defaultSortAsc={false}
        columns={[
          {
            name: 'ID',
            selector: (row) => row.id,
            sortable: true,
            wrap: true,
            grow: 0.5,
          },
          {
            name: 'Dono do veículo',
            selector: (row) => row.vehicleOwner,
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
          },
          {
            name: 'Descrição',
            selector: (row) => row.description,
            sortable: true,
            wrap: true,
            grow: 1,
          },
          {
            id: 'date',
            name: 'Data do sinistro',
            selector: (row) => row.accidentDate,
            sortable: true,
            wrap: true,
            grow: 0.5,
          },
        ]}
        data={accidents}
        progressPending={isLoadingAccidents}
      />
    </TabPanel>
  )
}

export default AccidentTab
