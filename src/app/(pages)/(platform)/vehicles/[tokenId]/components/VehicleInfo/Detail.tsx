'use client'

import React from 'react'
import { HStack, Heading, Text, SkeletonText, Box } from '@chakra-ui/react'

interface Props {
  title: string
  value?: string
  isLoading?: boolean
}

const Detail = ({ title, value, isLoading }: Props) => {
  const isLoaded = isLoading !== undefined ? !!value && !isLoading : !!value

  return (
    <HStack spacing={4} justifyContent="flex-start" alignItems="flex-end">
      <Heading as="h3" fontSize="xl" fontWeight={700} textShadow="0px 4px 4px rgba(0, 0, 0, 0.25);">
        {title}
      </Heading>

      <SkeletonText isLoaded={isLoaded} noOfLines={1} alignSelf={!isLoaded ? 'center' : undefined}>
        <Heading
          as="p"
          fontSize="lg"
          fontWeight={500}
          textShadow="0px 4px 4px rgba(0, 0, 0, 0.25);"
        >
          {value || 'no value'}
        </Heading>
      </SkeletonText>
    </HStack>
  )
}

export default Detail
