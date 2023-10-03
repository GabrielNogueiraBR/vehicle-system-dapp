'use client'

import React, { useState } from 'react'
import {
  Modal,
  ModalProps,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Flex,
  ButtonGroup,
  Text,
  ModalFooter,
  useToast,
  Link,
  Icon,
} from '@chakra-ui/react'
import { Status, VehicleRequest } from '@/types/contract'
import { useWeb3 } from '@/contexts/Web3Context'
import { useContractFunction } from '@usedapp/core'
import { ADDRESS_REGEX, BLOCK_EXPLORER } from '@/constants/web3'
import { ReturnOfFunction } from '@/types'
import { HiExternalLink } from 'react-icons/hi'
import { ethers } from 'ethers'
import Decimal from 'decimal.js'

interface Props extends Omit<ModalProps, 'children'> {
  tokenId: number
  insurer: string
  proposalId?: number
  price?: Decimal
  insuranceStartDate?: Date
  insuranceEndDate?: Date
  requestCreatedAt?: Date
  requestUpdatedAt?: Date
  contractUrl?: string
  status: 'contract' | 'contract' | 'request' | 'proposal'
  onCreateContract?: () => void
}

const VehicleContractInfoModal = ({
  tokenId,
  insurer,
  proposalId,
  price,
  insuranceStartDate,
  insuranceEndDate,
  requestCreatedAt,
  requestUpdatedAt,
  contractUrl,
  status,
  onCreateContract,
  ...rest
}: Props) => {
  const [isContracting, setIsContracting] = useState(false)
  const isRequest = status === 'request'
  const isProposal = status === 'proposal'
  const isContract = status === 'contract'
  const isContractExpired = insuranceEndDate ? insuranceEndDate.getTime() < Date.now() : false

  const { contractVehicleInsuranceProposal } = useWeb3()
  const toast = useToast()

  const handleContractVehicleInsurance = async () => {
    try {
      setIsContracting(true)
      if (!proposalId || !price) throw new Error('Invalid')

      const promise = new Promise<ReturnOfFunction>(async (resolve, reject) => {
        const receipt = await contractVehicleInsuranceProposal.send(proposalId, {
          value: ethers.utils.parseEther(String(price)),
        })
        if (receipt?.status !== 1) reject(receipt)
        resolve(receipt)
      })

      toast.promise(promise, {
        success: (receipt) => ({
          title: 'Sucesso ao contratar seguro de veículo',
          description: (
            <Text>
              Para consultar a transação{' '}
              <Link
                href={`${BLOCK_EXPLORER}/tx/${String(receipt?.transactionHash)}`}
                target="_blank"
              >
                clique aqui
              </Link>{' '}
            </Text>
          ),
          duration: 7000,
          position: 'top-right',
        }),
        error: {
          title: 'Erro ao contratar seguro de veículo, por favor, tente novamente.',
          position: 'top-right',
        },
        loading: { title: 'Contratando seguro...' },
      })

      await promise

      rest.onClose()
      if (onCreateContract) onCreateContract()
    } catch (e) {
      console.error(e)
    } finally {
      setIsContracting(false)
    }
  }

  return (
    <Modal {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {status === 'request'
            ? 'Solicitação de seguro'
            : status === 'proposal'
            ? 'Solicitação aprovada'
            : 'Contrato de seguro'}
        </ModalHeader>
        <ModalBody>
          <Flex
            direction="row"
            justifyContent="flex-start"
            gap="4"
            color="dark"
            sx={{
              p: {
                fontSize: 'xl',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                maxW: '100%',
              },
              span: {
                fontSize: 'lg',
                fontWeight: 500,
                textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              },
            }}
          >
            <Flex
              flex="1.5"
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap="1"
            >
              <Text>
                Seguradora: <Text as="span">{insurer.replace(ADDRESS_REGEX, '$1...$2')}</Text>
              </Text>

              <Text display={isRequest ? 'block' : 'none'}>
                Data criação:{' '}
                <Text as="span">{new Intl.DateTimeFormat('pt-BR').format(requestCreatedAt)}</Text>
              </Text>
              <Text display={isRequest ? 'block' : 'none'}>
                Data atualização:{' '}
                <Text as="span">{new Intl.DateTimeFormat('pt-BR').format(requestUpdatedAt)}</Text>
              </Text>

              <Text display={isRequest ? 'none' : 'block'}>
                Data de início:{' '}
                <Text as="span">{new Intl.DateTimeFormat('pt-BR').format(insuranceStartDate)}</Text>
              </Text>
              <Text display={isRequest ? 'none' : 'block'}>
                Data de fim:{' '}
                <Text as="span">{new Intl.DateTimeFormat('pt-BR').format(insuranceEndDate)}</Text>
              </Text>

              <Link
                display={isRequest ? 'none' : 'flex'}
                fontSize="xl"
                fontWeight={700}
                color="primary"
                flexDirection="row"
                columnGap={2}
                justifyContent="flex-start"
                alignItems="center"
                href={contractUrl}
                target="_blank"
                isExternal
              >
                <Icon as={HiExternalLink} fontSize="2xl" />
                Link externo
              </Link>
            </Flex>
            <Flex
              flex="1"
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap="1"
            >
              <Text>
                TokenId: <Text as="span">#{tokenId.toString().padStart(3, '0')}</Text>
              </Text>
              <Text>
                Status:{' '}
                <Text as="span">
                  {isRequest
                    ? 'Em aberto'
                    : isProposal
                    ? 'Aprovado'
                    : isContractExpired
                    ? 'Expirado'
                    : 'Ativo'}
                </Text>
              </Text>
              <Text display={isProposal ? 'block' : 'none'}>
                Preço:{' '}
                <Text as="span">
                  {`${new Decimal(price || 0).toFixed(18).replace(/\.?0+$/, '')}`} ETH
                </Text>
              </Text>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup justifySelf="flex-end" alignSelf="flex-end" spacing={4}>
            <Button
              onClick={rest.onClose}
              variant="outline"
              colorScheme="purple"
              display={isProposal ? 'none' : 'flex'}
              px="12"
            >
              OK
            </Button>
            <Button variant="cancel" onClick={rest.onClose} display={isProposal ? 'flex' : 'none'}>
              Fechar
            </Button>
            <Button
              colorScheme="purple"
              variant="outline"
              isLoading={isContracting}
              onClick={handleContractVehicleInsurance}
              type="submit"
              display={isProposal ? 'flex' : 'none'}
            >
              Contratar
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default VehicleContractInfoModal
