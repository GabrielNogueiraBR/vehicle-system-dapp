/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IVehicleFactory,
  IVehicleFactoryInterface,
} from "../../../contracts/vehicleFactory/IVehicleFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "createVehicle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
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
    ],
    name: "createVehicleRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "driverLicenseCode",
        type: "string",
      },
    ],
    name: "defineDriverLicenseCode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "driverLicenseCodeOf",
    outputs: [
      {
        internalType: "string",
        name: "driverLicenseCode",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDriverLicenseCode",
    outputs: [
      {
        internalType: "string",
        name: "driverLicenseCode",
        type: "string",
      },
    ],
    stateMutability: "view",
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
    name: "getUserVehicleRequestById",
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
    name: "listApprovalsIds",
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
  {
    inputs: [],
    name: "listUserVehicleRequestsIds",
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
  {
    inputs: [
      {
        internalType: "string",
        name: "driverLicenseCode",
        type: "string",
      },
    ],
    name: "userRegistration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IVehicleFactory__factory {
  static readonly abi = _abi;
  static createInterface(): IVehicleFactoryInterface {
    return new utils.Interface(_abi) as IVehicleFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IVehicleFactory {
    return new Contract(address, _abi, signerOrProvider) as IVehicleFactory;
  }
}
