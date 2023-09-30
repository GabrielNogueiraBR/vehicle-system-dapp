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
        direction={{ base: 'column', md: 'row' }}
        justify="flex-start"
        align="flex-start"
        gap="4"
        rounded="xl"
        bg="white"
        shadow="sm"
        w="100%"
        border="2px solid"
        borderColor="secondary"
        overflow="hidden"
      >
        <Box
          w="auto"
          h="18.5625rem"
          rounded="xl"
          aspectRatio={1}
          py={{ base: 0, sm: 0, md: 10 }}
          px={{ base: 0, md: 14 }}
          mt={{ base: 10, sm: 10, md: 0 }}
          alignSelf="center"
        >
          <Img w="auto" h="100%" src="/vehicle-nft.png" alt="vehicle nft" />
        </Box>
        <Flex
          flex="1"
          direction="column"
          gap="5"
          justify="center"
          alignItems="flex-start"
          mt="12"
          mr="12"
          p={{ base: 4, md: 0 }}
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
            direction={{ base: 'column', md: 'row' }}
            w="100%"
            justify="flex-start"
            align={{ base: 'flex-start', md: 'center' }}
            rowGap={3}
          >
            <Flex direction="row" flex="1">
              <VStack flex="1" justify="center" align="flex-start" spacing="3">
                <Detail title="Modelo:" value={metadata?.carModel} isLoading={isLoading} />
                <Detail title="Marca:" value={metadata?.carBrand} isLoading={isLoading} />
                <Detail
                  title="Data de fabricação:"
                  value={new Intl.DateTimeFormat('pt-BR').format(metadata?.manufacturingDate)}
                  isLoading={isLoading}
                />
              </VStack>
            </Flex>
            <Flex direction="row" flex="1">
              <VStack flex="1" justify="center" align="flex-start" spacing="3">
                <Detail title="Dono:" value={owner} isLoading={isLoading} />
                <Detail
                  title="Renavam:"
                  value={metadata?.vehicleRegistrationCode}
                  isLoading={isLoading}
                />
              </VStack>
            </Flex>
            <Flex
              direction={{ base: 'row', md: 'column' }}
              justify="center"
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
