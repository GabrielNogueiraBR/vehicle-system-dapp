'use client'

import React from 'react'
import { Flex, Box, Img, Heading, HStack, VStack, Button } from '@chakra-ui/react'
import useVehicleMetadata from '@/hooks/useVehicleMetadata'
import Detail from './Detail'

interface Props {
  tokenId: string
}

const VehicleInfo = ({ tokenId }: Props) => {
  const { metadata, isLoading } = useVehicleMetadata(tokenId)

  return (
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
      <Box w="auto" h="18.5625rem" rounded="xl" aspectRatio={1} py="10" px="14" alignSelf="center">
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
              <Detail title="Dono:" value={metadata?.owner} isLoading={isLoading} />
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
            <Button></Button>
            <Button></Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default VehicleInfo
