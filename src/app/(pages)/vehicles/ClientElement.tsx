'use client'

import React from 'react'
import { Button, Center, Flex, Heading, Icon, Img, Text } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'
import useVehicleRequests from '@/hooks/useVehiclesRequest'
import { useEthers } from '@usedapp/core'
import LoadingPage from '@/components/LoadingPage'
import { Link } from '@chakra-ui/next-js'

const ClientElement = () => {
  const { account } = useEthers()
  const { vehiclesNfts, isLoading } = useVehicleRequests(account || 'no account')

  if (isLoading) return <LoadingPage />

  if (!vehiclesNfts.length)
    return (
      <Center flexDirection="column" gap="4" w="100%">
        <Img src="/no-vehicles.svg" w="sm" alt="no vehicles" loading="lazy" aspectRatio={1} />
        <Heading as="h3">Sem veículos cadastrados</Heading>
        <Button colorScheme="purple" fontSize="lg" leftIcon={<Icon as={BiPlus} fontSize="2xl" />}>
          Novo veículo
        </Button>
      </Center>
    )

  return (
    <Center flexDirection="column" gap="4" w="100%">
      <Heading as="h3">Tem veículos</Heading>
      <Flex flexFlow="row wrap" gap="4">
        {vehiclesNfts.map((nft) => (
          <Flex direction="column" key={nft.tokenId} p="4" bg="white" rounded="md" shadow="md">
            <Text>TokenId: {nft.tokenId}</Text>
            <Button variant={'link'}>
              <Link href={`/vehicles/${nft.tokenId}`}>Go to</Link>
            </Button>
          </Flex>
        ))}
      </Flex>
    </Center>
  )
}

export default ClientElement
