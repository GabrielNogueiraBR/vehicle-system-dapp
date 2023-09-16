'use client'

import { VehicleRequest, VehicleRequestData } from '@/types/contract'
import readContract from '@/utils/readContract'
import { useEthers, useSigner } from '@usedapp/core'
import { useEffect, useState } from 'react'

const useVehiclesRequests = () => {
  const { account } = useEthers()
  const signer = useSigner()

  const [vehiclesRequests, setVehiclesRequests] = useState<VehicleRequest[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const loadVehiclesRequestsByAddress = async (address: string) => {
    try {
      setIsLoading(true)

      const requestsIds = await readContract({
        signer,
        functionName: 'listVehicleRequestsIds',
        args: [],
      })
      if (!requestsIds) throw Error('Error on get vehicle requests')

      const newVehiclesRequests: VehicleRequest[] = []

      await Promise.all(
        requestsIds.map(async (requestId) => {
          try {
            const data = await readContract({
              signer,
              functionName: 'getUserVehicleRequestById',
              args: [requestId],
            })
            if (!data) return Promise.resolve()

            const {
              requester,
              agent,
              vehicleRegistrationCode,
              vehicleData: blockchainVehicleData,
              status,
              createdAt,
              updatedAt,
            } = data

            const { carBrand, carModel, manufacturingDate, vehicleOwnershipRecordIds } =
              blockchainVehicleData

            const vehicleData: VehicleRequestData = {
              carBrand,
              carModel,
              manufacturingDate: new Date(Number(manufacturingDate) * 1000),
              vehicleOwnershipRecordIds: vehicleOwnershipRecordIds.map((bn) => Number(bn)),
            }

            const vehicleRequest: VehicleRequest = {
              requester,
              agent,
              vehicleRegistrationCode,
              vehicleData,
              status,
              createdAt: new Date(Number(createdAt) * 1000),
              updatedAt: new Date(Number(updatedAt) * 1000),
            }

            newVehiclesRequests.push(vehicleRequest)

            return Promise.resolve()
          } catch (e) {
            console.error(e)
            return Promise.resolve()
          }
        })
      )

      setVehiclesRequests(newVehiclesRequests)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (account && signer) loadVehiclesRequestsByAddress(account)
  }, [account, signer])

  return { vehiclesRequests, isLoading, load: loadVehiclesRequestsByAddress }
}

export default useVehiclesRequests
