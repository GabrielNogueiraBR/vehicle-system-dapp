'use client'

import React, { useMemo } from 'react'
import { Circle, Flex, FlexProps, Text } from '@chakra-ui/react'

interface BadgeStatusProps extends FlexProps {
  status: 'payed' | 'insured'
}

const BadgeStatus = ({ status, ...rest }: BadgeStatusProps) => {
  const statusText = useMemo(() => (status === 'payed' ? 'Pago' : 'Assegurado'), [status])

  const color = status === 'payed' ? 'dark-green' : 'primary'
  const borderColor = status === 'payed' ? 'dark-green' : 'primary'
  const backgroundColor = status === 'payed' ? 'light-green' : 'light-purple'

  return (
    <Flex
      direction="row"
      justify="center"
      align="center"
      w="fit-content"
      h="fit-content"
      px="2"
      gap="2"
      rounded="lg"
      border="1px solid"
      borderColor={borderColor}
      bg={backgroundColor}
      color={color}
      {...rest}
    >
      <Circle size="0.6875rem" bg={color} />
      <Text fontSize="1rem" fontWeight={700} lineHeight="150%">
        {statusText}
      </Text>
    </Flex>
  )
}

export default BadgeStatus
