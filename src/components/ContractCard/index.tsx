'use client'

import React from 'react'
import { Box, Flex, FlexProps, HStack, Heading, Icon, Text } from '@chakra-ui/react'
import BadgeStatus from '../BadgeStatus'

import { HiOutlineDocumentText } from 'react-icons/hi'
import FramerMotionBox from '../FramerMotionBox'
import { ADDRESS_REGEX } from '@/constants/web3'

interface Props extends FlexProps {
  tokenId: number
  insurer: string
  insuranceStartDate?: Date
  insuranceEndDate?: Date
  requestCreatedAt?: Date
  status: 'contract' | 'contract' | 'request' | 'proposal'
}

const ContractCard = ({
  tokenId,
  insurer,
  insuranceStartDate,
  insuranceEndDate,
  requestCreatedAt,
  status,
  ...rest
}: Props) => {
  const isContractExpired = insuranceEndDate ? insuranceEndDate.getTime() < Date.now() : false

  return (
    <FramerMotionBox
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.99 }}
      // @ts-ignore no problem in operation, although type error appears.
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      <Flex
        position="relative"
        direction="row"
        minW={{ base: '100%', md: '100%', lg: '31.25rem' }}
        w="fit-content"
        h="fit-content"
        gap="3"
        p="5"
        rounded="2xl"
        border="2px solid"
        borderColor="dark"
        shadow="xl"
        cursor="pointer"
        userSelect={'none'}
        {...rest}
      >
        <Icon boxSize="3.75rem" m={0} p={0} as={HiOutlineDocumentText} />
        <Flex direction="column" justify="flex-start" align="flex-start" gap="2">
          <Box>
            <Heading as="h3" fontSize="xl">
              {status === 'request'
                ? 'Solicitação de seguro'
                : status === 'proposal'
                ? 'Proposta de contrato'
                : 'Contrato de seguro'}
            </Heading>
            <Text color="light-gray" fontSize="lg" fontWeight={500}>
              Token #{tokenId.toString().padStart(3, '0')}
            </Text>
          </Box>
          <Box sx={{ p: { color: 'dark' }, span: { color: 'light-gray' } }}>
            <Text fontSize="lg" fontWeight={500}>
              Seguradora: <Text as="span">{insurer.replace(ADDRESS_REGEX, '$1...$2')}</Text>
            </Text>
            <Text
              display={status !== 'request' ? 'none' : undefined}
              fontSize="lg"
              fontWeight={500}
            >
              Data criação:{' '}
              <Text as="span">{new Intl.DateTimeFormat('pt-BR').format(requestCreatedAt)}</Text>
            </Text>
            <HStack spacing={5}>
              <Text fontSize="lg" fontWeight={500}>
                Início:{' '}
                <Text as="span">{new Intl.DateTimeFormat('pt-BR').format(insuranceStartDate)}</Text>
              </Text>
              <Text fontSize="lg" fontWeight={500}>
                Fim:{' '}
                <Text as="span">{new Intl.DateTimeFormat('pt-BR').format(insuranceEndDate)}</Text>
              </Text>
            </HStack>
          </Box>
        </Flex>
        <BadgeStatus
          position="absolute"
          top={0}
          right={0}
          mt="5"
          mr="5"
          minW="5.625rem"
          theme={
            status === 'request'
              ? 'blue'
              : status === 'proposal'
              ? 'purple'
              : isContractExpired
              ? 'red'
              : 'green'
          }
          hiddenCircle
        >
          {status === 'request'
            ? 'Pendente'
            : status === 'proposal'
            ? 'Aprovado'
            : isContractExpired
            ? 'Expirado'
            : 'Ativo'}
        </BadgeStatus>
      </Flex>
    </FramerMotionBox>
  )
}

export default ContractCard
