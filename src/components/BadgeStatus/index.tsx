'use client'

import React, { useMemo } from 'react'
import { Circle, Flex, FlexProps, Text } from '@chakra-ui/react'

interface BadgeStatusProps extends FlexProps {
  theme: 'green' | 'purple'
  children?: React.ReactNode
}

const BadgeStatus = ({ theme, children, ...rest }: BadgeStatusProps) => {
  const color = theme === 'green' ? 'dark-green' : 'primary'
  const borderColor = theme === 'green' ? 'dark-green' : 'primary'
  const backgroundColor = theme === 'green' ? 'light-green' : 'light-purple'

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
        {children}
      </Text>
    </Flex>
  )
}

export default BadgeStatus
