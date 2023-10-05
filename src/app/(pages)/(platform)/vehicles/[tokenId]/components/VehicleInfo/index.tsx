'use client'

import React from 'react'
import {
  Flex,
  Box,
  Img,
  Heading,
  HStack,
  VStack,
  Button,
  Icon,
  useDisclosure,
} from '@chakra-ui/react'
import useVehicleMetadata from '@/hooks/useVehicleMetadata'
import Detail from './Detail'
import useOwnerOfToken from '@/hooks/useOwnerOfToken'
import ShareIcon from '@/components/Icons/ShareIcon'
import HistoryIcon from '@/components/Icons/HistoryIcon'
import VehicleOwnershipViewModal from '@/components/Modal/VehicleOwnershipView'
import { useVehicle } from '@/contexts/VehicleContext'
import VehicleAccess from '@/components/Modal/VehicleAccess'

const VehicleInfo = () => {
  const { tokenId, useOwner, useMetadata } = useVehicle()

  const { owner, isLoading: isOwnerLoading } = useOwner
  const { metadata, isLoading: isMetadataLoading } = useMetadata

  const {
    isOpen: isOwnershipViewModalOpen,
    onOpen: onOwnershipViewModalOpen,
    onClose: onOwnershipViewModalClose,
  } = useDisclosure()

  const {
    isOpen: isVehicleAccessModalOpen,
    onOpen: onVehicleAccessModalOpen,
    onClose: onVehicleAccessModalClose,
  } = useDisclosure()

  const isLoading = isOwnerLoading || isMetadataLoading

  return (
    <>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        justify="flex-start"
        align="flex-start"
        rounded="xl"
        bg="white"
        shadow="sm"
        w="100%"
        border="2px solid"
        borderColor="secondary"
        overflow="hidden"
        py={{ base: 4, md: 5, '2xl': 10 }}
        px={{ base: 4, md: 5, '2xl': 14 }}
        gap={{ base: 4, lg: 6, '2xl': 16 }}
      >
        <Box
          w={{ base: '100%', lg: 'auto' }}
          h={{ base: '22rem', '2xl': '13.5625rem' }}
          rounded="xl"
          aspectRatio={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Img w="auto" h="100%" src="/vehicle-nft.png" alt="vehicle nft" />
        </Box>
        <Flex
          flex="1"
          w="100%"
          direction="column"
          gap="5"
          justify="center"
          alignItems="flex-start"
          px={{ base: 4, lg: 0 }}
          py={{ base: 4, '2xl': 0 }}
        >
          <HStack w="100%" justify="flex-start" align="center">
            <Heading
              as="h1"
              fontSize="4xl"
              fontWeight={700}
              textShadow="0px 4px 4px rgba(0, 0, 0, 0.25);"
            >
              Token #{tokenId.toString().padStart(3, '0')}
            </Heading>
          </HStack>
          <Flex
            w="100%"
            direction={{ base: 'column', '2xl': 'row' }}
            justify="flex-start"
            align={{ base: 'flex-start', lg: 'center' }}
            rowGap={3}
            columnGap={3}
          >
            <Flex flex="1" w="100%" direction="row">
              <VStack flex="1" w="100%" justify="center" align="flex-start" spacing="3">
                <Detail title="Modelo:" value={metadata?.carModel} isLoading={isLoading} />
                <Detail title="Marca:" value={metadata?.carBrand} isLoading={isLoading} />
                <Detail
                  title="Data de fabricação:"
                  value={new Intl.DateTimeFormat('pt-BR').format(metadata?.manufacturingDate)}
                  isLoading={isLoading}
                />
              </VStack>
            </Flex>
            <Flex flex="1" w="100%" direction="row">
              <VStack flex="1" w="100%" justify="center" align="flex-start" spacing="3">
                <Detail title="Dono:" value={owner} isLoading={isLoading} />
                <Detail
                  title="Renavam:"
                  value={metadata?.vehicleRegistrationCode}
                  isLoading={isLoading}
                />
              </VStack>
            </Flex>
            <Flex
              w={{ base: '100%', '2xl': 'fit-content' }}
              direction={{ base: 'row', '2xl': 'column' }}
              justify="flex-start"
              align="flex-start"
              gap="3"
            >
              <Button
                rounded="2xl"
                shadow="lg"
                w="fit-content"
                colorScheme="whiteAlpha"
                variant="outline"
                border="2px solid"
                borderColor="secondary"
                h="fit-content"
                py="2"
                px="3"
                onClick={onVehicleAccessModalOpen}
              >
                <Icon as={ShareIcon} fontSize="4xl" color="secondary" />
              </Button>
              <Button
                rounded="2xl"
                shadow="lg"
                w="fit-content"
                colorScheme="whiteAlpha"
                variant="outline"
                border="2px solid"
                borderColor="secondary"
                h="fit-content"
                py="2"
                px="3"
                onClick={onOwnershipViewModalOpen}
              >
                <Icon as={HistoryIcon} fontSize="4xl" color="secondary" />
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <VehicleOwnershipViewModal
        ownership={metadata?.vehicleOwnershipRecords || []}
        isOpen={isOwnershipViewModalOpen}
        onClose={onOwnershipViewModalClose}
      />
      <VehicleAccess
        tokenId={tokenId}
        isOpen={isVehicleAccessModalOpen}
        onClose={onVehicleAccessModalClose}
      />
    </>
  )
}

export default VehicleInfo
