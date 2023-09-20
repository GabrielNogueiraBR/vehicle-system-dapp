'use client'

import React, { useMemo } from 'react'
import { Circle, Flex, FlexProps, Text } from '@chakra-ui/react'

interface BadgeStatusProps extends FlexProps {
  theme: 'green' | 'purple' | 'red' | 'blue'
  hiddenCircle?: boolean
  children?: React.ReactNode
}

const BadgeStatus = ({ theme, hiddenCircle = false, children, ...rest }: BadgeStatusProps) => {
  const themeColor = useMemo(() => {
    switch (theme) {
      case 'green':
        return {
          color: 'dark-green',
          borderColor: 'dark-green',
          backgroundColor: 'light-green',
        }
      case 'purple':
        return {
          color: 'primary',
          borderColor: 'primary',
          backgroundColor: 'light-purple',
        }
      case 'red':
        return {
          color: '#F84242',
          borderColor: '#F84242',
          backgroundColor: 'rgba(255, 23, 10, 0.12)',
        }
      case 'blue':
        return {
          color: 'secondary',
          borderColor: 'secondary',
          backgroundColor: 'background',
        }
    }
  }, [theme])

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
      borderColor={themeColor.borderColor}
      bg={themeColor.backgroundColor}
      color={themeColor.color}
      {...rest}
    >
      <Circle size="0.6875rem" bg={themeColor.color} display={hiddenCircle ? 'none' : undefined} />
      <Text fontSize="1rem" fontWeight={700} lineHeight="150%">
        {children}
      </Text>
    </Flex>
  )
}

export default BadgeStatus
