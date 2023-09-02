import { Contract, utils } from 'ethers'
import { CONTRACT_ADDRESS } from '@/constants/web3'

import { VehicleSystemContract } from '@/contract/typechain/contracts/VehicleSystemContract'
import VehicleSystemContractABI from '@/contract/abi/contracts/VehicleSystemContract.sol/VehicleSystemContract.json'

const contractInterface = new utils.Interface(VehicleSystemContractABI.abi)
const contract = new Contract(CONTRACT_ADDRESS, contractInterface) as VehicleSystemContract

export default contract
