'use client'

import React, { useEffect, useState } from 'react'
import { Icon, Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react'
import { MdSearch } from 'react-icons/md'

interface Props extends Omit<InputProps, 'onChange'> {
  onChange?: (value: string) => void
}

const SearchInput = ({ onChange, ...rest }: Props) => {
  const [hasChanged, setHasChanged] = useState(false)
  const [value, setValue] = useState('')

  const handleChangeValue = (value: string) => {
    setHasChanged(true)
    setValue(value)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (hasChanged && onChange) onChange(value)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [value, hasChanged, onChange])

  return (
    <InputGroup
      w="fit-content"
      minW="22.875rem"
      border="none"
      bg="background"
      color="gray.400"
      rounded="2xl"
      size='lg'
    >
      <Input
        placeholder="Pesquisar..."
        border="none"
        color="gray.400"
        _placeholder={{ color: 'gray.400' }}
        focusBorderColor="gray.400"
        onChange={(e) => handleChangeValue(e.target.value)}
        {...rest}
      />
      <InputRightElement>
        <Icon as={MdSearch} fontSize="2xl" color="ligth-gray" />
      </InputRightElement>
    </InputGroup>
  )
}

export default SearchInput
