/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IAgentContract,
  IAgentContractInterface,
} from "../../../contracts/agent/IAgentContract";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "agentAddress",
        type: "address",
      },
    ],
    name: "agentDeactivation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "agentAddress",
        type: "address",
      },
    ],
    name: "agentRegistration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "carBrand",
        type: "string",
      },
      {
        internalType: "string",
        name: "carModel",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "manufacturingDate",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "driverLicenseCode",
            type: "string",
          },
          {
            internalType: "string",
            name: "federalUnit",
            type: "string",
          },
          {
            internalType: "string",
            name: "county",
            type: "string",
          },
          {
            internalType: "string",
            name: "vehiclePlate",
            type: "string",
          },
          {
            internalType: "string",
            name: "year",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "startDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endDate",
            type: "uint256",
          },
        ],
        internalType: "struct IBaseContract.VehicleOwnershipRecord[]",
        name: "ownershipRecords",
        type: "tuple[]",
      },
    ],
    name: "approveVehicleRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "getVehicleRequestById",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "requester",
            type: "address",
          },
          {
            internalType: "address",
            name: "agent",
            type: "address",
          },
          {
            internalType: "string",
            name: "vehicleRegistrationCode",
            type: "string",
          },
          {
            components: [
              {
                internalType: "string",
                name: "carBrand",
                type: "string",
              },
              {
                internalType: "string",
                name: "carModel",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "manufacturingDate",
                type: "uint256",
              },
              {
                internalType: "uint256[]",
                name: "vehicleOwnershipRecordIds",
                type: "uint256[]",
              },
            ],
            internalType: "struct IBaseContract.VehicleRequestData",
            name: "vehicleData",
            type: "tuple",
          },
          {
            internalType: "enum IBaseContract.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
        ],
        internalType: "struct IBaseContract.VehicleRequest",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "listAgents",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "listVehicleRequestsIds",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IAgentContract__factory {
  static readonly abi = _abi;
  static createInterface(): IAgentContractInterface {
    return new utils.Interface(_abi) as IAgentContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IAgentContract {
    return new Contract(address, _abi, signerOrProvider) as IAgentContract;
  }
}