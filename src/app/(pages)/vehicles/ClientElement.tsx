'use client'

import React, { useEffect } from 'react'
import { Button, Center, Flex, Heading, Img, Text, useDisclosure } from '@chakra-ui/react'
import useVehicleRequests from '@/hooks/useVehiclesRequest'
import { useEthers } from '@usedapp/core'
import LoadingPage from '@/components/LoadingPage'
import { Link } from '@chakra-ui/next-js'
import CreateButton from '@/components/CreateButton'
import VehicleRequestCreateModal from '@/components/Modal/VehicleRequestCreate'

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
    <Center flexDirection="column" gap="4" w="100%">
      {hasVehicles ? (
        <>
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
        </>
      ) : (
        <>
          <Img src="/no-vehicles.svg" w="sm" alt="no vehicles" loading="lazy" aspectRatio={1} />
          <Heading as="h3">Sem veículos cadastrados</Heading>
        </>
      )}
      <CreateButton onClick={onVehicleRequestModalOpen}>Novo veículo</CreateButton>
      <VehicleRequestCreateModal
        isOpen={isVehicleRequestModalOpen}
        onClose={onVehicleRequestModalClose}
      />
    </Center>
  )
}

export default ClientElement
