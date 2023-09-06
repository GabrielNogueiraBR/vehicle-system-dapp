'use client'

import React from 'react'
import { Icon } from '@chakra-ui/react'
import DataTable, { TableProps } from 'react-data-table-component'
import { RiArrowDownSFill } from 'react-icons/ri'

interface Props<T> extends TableProps<T> {}

function CustomDataTable<T>({...rest}: Props<T>) {
  return (
    <DataTable
      pagination
      responsive
      sortIcon={<Icon as={RiArrowDownSFill} ml="2" alignSelf="center" />}
      {...rest}
    />
  )
}

export default CustomDataTable
