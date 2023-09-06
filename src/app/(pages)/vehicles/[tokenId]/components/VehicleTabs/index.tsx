'use client'
import React, { useEffect } from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel, Flex } from '@chakra-ui/react'
import useVehicleServices from '@/hooks/useVehicleServices'
import { useSigner } from '@usedapp/core'
import contract from '@/lib/contract'

interface Props {
  tokenId: string
}

const VehicleTabs = ({ tokenId }: Props) => {
  const signer = useSigner()
  const services = []

  const searchVehicleServices = async (tokenId: string) => {
    if (!signer || !contract) return []

    const tx = contract.connect(signer).getVehicleServiceRecordIdsByTokenId(tokenId)
    const value = await tx
    const servicesIds = value.map((n) => Number(n))

    const services: {
      requester: string
      tokenId: Number
      title: string
      description: string
      price: Number
      date: Number
      createdAt: Number
    }[] = []

    await Promise.all(
      servicesIds.map(async (id) => {
        const tx = contract.connect(signer).getVehicleServiceRecordById(id)
        const value = await tx

        const { requester, tokenId, title, description, price, date, createdAt } = value

        services.push({
          requester,
          tokenId: Number(tokenId),
          title,
          description,
          price: Number(price),
          date: Number(date),
          createdAt: Number(createdAt),
        })
      })
    )

    console.log({ services })

    return services
  }

  useEffect(() => {
    searchVehicleServices(tokenId)
  }, [signer])

  return (
    <Flex rounded="xl" w="100%" bg="white" paddingTop={2} shadow="sm" overflow="hidden">
      <Tabs size="md" w="100%" variant="unstyles">
        <TabList bg="white">
          <Tab _selected={{ color: 'gray.800', fontWeight: 700 }}>Serviços</Tab>
          <Tab _selected={{ color: 'gray.800', fontWeight: 700 }}>Sinistros</Tab>
          <Tab _selected={{ color: 'gray.800', fontWeight: 700 }}>Contratos</Tab>
        </TabList>
        <TabPanels bg="gray.50">
          <TabPanel>
            <p>um!</p>
          </TabPanel>
          <TabPanel>
            <p>dois!</p>
          </TabPanel>
          <TabPanel>
            <p>três!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

export default VehicleTabs
