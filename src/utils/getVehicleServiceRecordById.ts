import contract from '@/lib/contract'
import { VehicleService } from '@/types/contract'
import { useSigner } from '@usedapp/core'
import { ethers } from 'ethers'

type Params = {
  id: number
  signer: ReturnType<typeof useSigner>
}

const getVehicleServiceRecordById = async ({ id, signer }: Params) => {
  try {
    if (!contract || !signer) throw new Error('Signer or contract invalid')

    const tx = contract.connect(signer).getVehicleServiceRecordById(id)
    const value = await tx

    if (!value) throw Error('Error on get vehicle service record by id')

    const { requester, tokenId, title, description, price, date, createdAt } = value

    const vehicleService: VehicleService = {
      id,
      requester,
      tokenId: Number(tokenId),
      title,
      description,
      price: Number(ethers.utils.formatEther(price)),
      date: Number(date),
      createdAt: Number(createdAt),
    }

    return vehicleService
  } catch (e) {
    console.error(e)
    return null
  }
}

export default getVehicleServiceRecordById
