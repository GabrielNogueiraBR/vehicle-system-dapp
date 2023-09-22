'use client'

import React from 'react'

import { TabPanel, TabPanelProps } from '@chakra-ui/react'
import CreateButton from '@/components/CreateButton'
import CustomDataTable from '@/components/CustomDataTable'
import useVehicleAccidents from '@/hooks/useVehicleAccidents'
import { ADDRESS_REGEX } from '@/constants/web3'
import ButtonEye from '@/components/Buttons/ButtonEye'

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
            name: '#',
            selector: (row) => row.id,
            center: true,
            wrap: true,
            grow: 0.5,
            cell: (row) => <ButtonEye onClick={undefined} />,
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
    </TabPanel>
  )
}

export default AccidentTab
