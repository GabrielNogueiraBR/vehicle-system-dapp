'use client'

import React, { useEffect } from 'react'
import { Button, Center, Flex, Heading, Img, Text, useDisclosure } from '@chakra-ui/react'
import useVehicleRequests from '@/hooks/useVehiclesRequest'
import { useEthers } from '@usedapp/core'
import LoadingPage from '@/components/LoadingPage'
import { Link } from '@chakra-ui/next-js'
import CreateButton from '@/components/CreateButton'
import VehicleRequestCreateModal from '@/components/Modal/VehicleRequestCreate'
import NoVehicles from '@/components/Assets/NoVehicles'

const ClientElement = () => {
  const { vehiclesNfts, isLoading } = useVehicleRequests()

  const {
    isOpen: isVehicleRequestModalOpen,
    onOpen: onVehicleRequestModalOpen,
    onClose: onVehicleRequestModalClose,
  } = useDisclosure()

  const hasVehicles = !!vehiclesNfts.length

  if (isLoading) return <LoadingPage />

  return (
    <Flex direction="column" justify="flex-start" alignItems="flex-start" gap="4" mt="25" w="100%">
      <CreateButton alignSelf="flex-end" onClick={onVehicleRequestModalOpen}>
        Novo veículo
      </CreateButton>
      <Flex flexFlow="row wrap" gap="4" display={hasVehicles ? 'flex' : 'none'}>
        {vehiclesNfts.map((nft) => (
          <Flex direction="column" key={nft.tokenId} p="4" bg="white" rounded="md" shadow="md">
            <Text>TokenId: {nft.tokenId}</Text>
            <Button variant={'link'}>
              <Link href={`/vehicles/${nft.tokenId}`}>Go to</Link>
            </Button>
          </Flex>
        ))}
      </Flex>
      <Center
        flexDirection="column"
        w="100%"
        display={hasVehicles ? 'none' : 'flex'}
        mt="16"
        gap="4"
      >
        <NoVehicles color="purple.500" w="md" />
        <Heading as="h3">Sem veículos cadastrados</Heading>
      </Center>
      <VehicleRequestCreateModal
        isOpen={isVehicleRequestModalOpen}
        onClose={onVehicleRequestModalClose}
      />
    </Flex>
  )
}

export default ClientElement
