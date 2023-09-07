'use client'

import React from 'react'
import { Icon } from '@chakra-ui/react'
import DataTable, { TableProps, createTheme } from 'react-data-table-component'
import { RiArrowDownSFill } from 'react-icons/ri'

createTheme('transparent', {
  background: {
    default: 'transparent',
  },
})

interface Props<T> extends TableProps<T> {}

function CustomDataTable<T>({ ...rest }: Props<T>) {
  return (
    <DataTable
      pagination
      responsive
      theme="transparent"
      customStyles={{
        header: {
          style: {
            minHeight: '56px',
          },
        },
        headRow: {
          style: {
            borderTopStyle: 'none',
            borderTopWidth: '1px',
            fontWeight: 700,
            fontSize: 'var(--chakra-fontSizes-sm)',
          },
        },
        headCells: {
          style: {
            '&:not(:last-of-type)': {
              borderRightStyle: 'solid',
              borderRightWidth: '1px',
            },
          },
        },
        cells: {
          style: {
            fontSize: 'var(--chakra-fontSizes-sm)',
            '&:not(:last-of-type)': {
              borderRightStyle: 'solid',
              borderRightWidth: '1px',
            },
          },
        },
      }}
      sortIcon={<Icon as={RiArrowDownSFill} ml="2" alignSelf="center" />}
      {...rest}
    />
  )
}

export default CustomDataTable
