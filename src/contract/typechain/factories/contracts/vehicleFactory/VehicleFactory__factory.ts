/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  VehicleFactory,
  VehicleFactoryInterface,
} from "../../../contracts/vehicleFactory/VehicleFactory";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
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
        name: "",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
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
    inputs: [],
    name: "getTokenIdsByOwner",
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
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
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
    name: "userRegistration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600381526020016213919560ea1b815250604051806040016040528060048152602001631593919560e21b81525081601890816200005c919062000198565b5060196200006b828262000198565b50505062000088620000826200009d60201b60201c565b620000a1565b62000097601f80546001019055565b62000264565b3390565b601e80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200011e57607f821691505b6020821081036200013f57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200019357600081815260208120601f850160051c810160208610156200016e5750805b601f850160051c820191505b818110156200018f578281556001016200017a565b5050505b505050565b81516001600160401b03811115620001b457620001b4620000f3565b620001cc81620001c5845462000109565b8462000145565b602080601f831160018114620002045760008415620001eb5750858301515b600019600386901b1c1916600185901b1785556200018f565b600085815260208120601f198616915b82811015620002355788860151825594840194600190910190840162000214565b5085821015620002545787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61264c80620002746000396000f3fe608060405234801561001057600080fd5b506004361061013e5760003560e01c806301ffc9a71461014357806306fdde031461016b578063081812fc14610180578063095ea7b3146101ab5780631114cd57146101c05780631499f40b146101d557806314a5189a146101f557806315acca77146101fd57806323b872dd1461021057806342842e0e146102235780634c7525da146102365780636352211e1461024957806370a082311461025c57806370e37a641461027d578063715018a61461028557806378301afd1461028d5780638da5cb5b146102a057806395d89b41146102a857806399326622146102b0578063a22cb465146102b8578063b88d4fde146102cb578063bc6f4be6146102de578063c87b56dd146102f1578063cf6713d014610304578063e985e9c514610317578063f2fde38b1461032a575b600080fd5b610156610151366004611e26565b61033d565b60405190151581526020015b60405180910390f35b61017361038f565b6040516101629190611e93565b61019361018e366004611ea6565b610421565b6040516001600160a01b039091168152602001610162565b6101be6101b9366004611ed6565b610448565b005b6101c8610562565b6040516101629190611f3b565b6101e86101e3366004611ea6565b6105ca565b6040516101629190611f86565b6101c86108aa565b61017361020b36600461205d565b610911565b6101be61021e366004612078565b6109c4565b6101be610231366004612078565b6109f5565b6101be61024436600461215f565b610a10565b610193610257366004611ea6565b610c38565b61026f61026a36600461205d565b610c6c565b604051908152602001610162565b6101c8610cf2565b6101be610d01565b6101be61029b3660046121ac565b610d15565b610193610d92565b610173610da1565b610173610db0565b6101be6102c63660046121e0565b610dd4565b6101be6102d936600461221c565b610de3565b6101be6102ec3660046121ac565b610e1b565b6101736102ff366004611ea6565b610e3c565b6101be610312366004611ea6565b610eb0565b610156610325366004612297565b610f56565b6101be61033836600461205d565b610f84565b60006001600160e01b031982166380ac58cd60e01b148061036e57506001600160e01b03198216635b5e139f60e01b145b8061038957506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606018805461039e906122ca565b80601f01602080910402602001604051908101604052809291908181526020018280546103ca906122ca565b80156104175780601f106103ec57610100808354040283529160200191610417565b820191906000526020600020905b8154815290600101906020018083116103fa57829003601f168201915b5050505050905090565b600061042c82610ffd565b506000908152601c60205260409020546001600160a01b031690565b600061045382610c38565b9050806001600160a01b0316836001600160a01b0316036104c55760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806104e157506104e18133610f56565b6105535760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c00000060648201526084016104bc565b61055d8383611022565b505050565b606061056c611090565b336000908152600d60209081526040918290208054835181840281018401909452808452909183018282801561041757602002820191906000526020600020905b8154815260200190600101908083116105ad575050505050905090565b6105d2611d38565b816105dc816110a2565b600083815481106105ef576105ef6122fe565b60009182526020918290206040805160e081018252600a90930290910180546001600160a01b039081168452600182015416938301939093526002830180549293929184019161063e906122ca565b80601f016020809104026020016040519081016040528092919081815260200182805461066a906122ca565b80156106b75780601f1061068c576101008083540402835291602001916106b7565b820191906000526020600020905b81548152906001019060200180831161069a57829003601f168201915b50505050508152602001600382016040518060800160405290816000820180546106e0906122ca565b80601f016020809104026020016040519081016040528092919081815260200182805461070c906122ca565b80156107595780601f1061072e57610100808354040283529160200191610759565b820191906000526020600020905b81548152906001019060200180831161073c57829003601f168201915b50505050508152602001600182018054610772906122ca565b80601f016020809104026020016040519081016040528092919081815260200182805461079e906122ca565b80156107eb5780601f106107c0576101008083540402835291602001916107eb565b820191906000526020600020905b8154815290600101906020018083116107ce57829003601f168201915b50505050508152602001600282015481526020016003820180548060200260200160405190810160405280929190818152602001828054801561084d57602002820191906000526020600020905b815481526020019060010190808311610839575b505050919092525050508152600782015460209091019060ff16600381111561087857610878611f4e565b600381111561088957610889611f4e565b81526020016008820154815260200160098201548152505091505b50919050565b60606108b4611090565b336000908152600c60209081526040918290208054835181840281018401909452808452909183018282801561041757602002820191906000526020600020908154815260200190600101908083116105ad575050505050905090565b606061091b6110e3565b6001600160a01b0382166000908152600a60205260409020805461093e906122ca565b80601f016020809104026020016040519081016040528092919081815260200182805461096a906122ca565b80156109b75780601f1061098c576101008083540402835291602001916109b7565b820191906000526020600020905b81548152906001019060200180831161099a57829003601f168201915b505050505090505b919050565b6109ce3382611142565b6109ea5760405162461bcd60e51b81526004016104bc90612314565b61055d8383836111a1565b61055d83838360405180602001604052806000815250610de3565b610a18611090565b610a21826112f3565b610a2a57600080fd5b6040805160a08082018352600060808084018281528452845160208082018752838252808601919091528486018390526060808601819052865160e0810188523381526001600160a01b038a81169382019384529781018981528183018890529381018590524295810186905260c081019590955283546001810185558480528551600a82027f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56381018054928b166001600160a01b031993841617815594517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5648201805491909b1692169190911790985592519396909594938492917f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5650190610b5390826123af565b506060820151805160038301908190610b6c90826123af565b5060208201516001820190610b8190826123af565b506040820151600282015560608201518051610ba7916003840191602090910190611db0565b505050608082015160078201805460ff19166001836003811115610bcd57610bcd611f4e565b021790555060a0820151600882015560c0909101516009909101556001600160a01b039096166000908152600b60209081526040808320805460018181018355918552838520018a9055338452600c8352908320805491820181558352912001959095555050505050565b600080610c4483611370565b90506001600160a01b0381166103895760405162461bcd60e51b81526004016104bc9061246e565b60006001600160a01b038216610cd65760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b60648201526084016104bc565b506001600160a01b03166000908152601b602052604090205490565b6060610cfc61138b565b905090565b610d096110e3565b610d1360006113ea565b565b610d1e3361143c565b1515600103610d2c57600080fd5b60048054600181019091557f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b810180546001600160a01b031916339081179091556000908152600760209081526040808320849055600a909152902061055d83826123af565b601e546001600160a01b031690565b60606019805461039e906122ca565b6060610dba611090565b336000908152600a60205260409020805461039e906122ca565b610ddf33838361149d565b5050565b610ded3383611142565b610e095760405162461bcd60e51b81526004016104bc90612314565b610e1584848484611567565b50505050565b610e23611090565b336000908152600a60205260409020610ddf82826123af565b6060610e4782610ffd565b6000610e5e60408051602081019091526000815290565b90506000815111610e7e5760405180602001604052806000815250610ea9565b80610e888461159a565b604051602001610e999291906124a0565b6040516020818303038152906040525b9392505050565b80610eba816110a2565b600160008381548110610ecf57610ecf6122fe565b600091825260209091206007600a90920201015460ff166003811115610ef757610ef7611f4e565b14610f0157600080fd5b610f0b338361162c565b600260008381548110610f2057610f206122fe565b600091825260209091206007600a9092020101805460ff19166001836003811115610f4d57610f4d611f4e565b02179055505050565b6001600160a01b039182166000908152601d6020908152604080832093909416825291909152205460ff1690565b610f8c6110e3565b6001600160a01b038116610ff15760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104bc565b610ffa816113ea565b50565b6110068161169a565b610ffa5760405162461bcd60e51b81526004016104bc9061246e565b6000818152601c6020526040902080546001600160a01b0319166001600160a01b038416908117909155819061105782610c38565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6110993361143c565b610d1357600080fd5b336001600160a01b0316600082815481106110bf576110bf6122fe565b60009182526020909120600a90910201546001600160a01b031614610ffa57600080fd5b336110ec610d92565b6001600160a01b031614610d135760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104bc565b60008061114e83610c38565b9050806001600160a01b0316846001600160a01b0316148061117557506111758185610f56565b806111995750836001600160a01b031661118e84610421565b6001600160a01b0316145b949350505050565b826001600160a01b03166111b482610c38565b6001600160a01b0316146111da5760405162461bcd60e51b81526004016104bc906124cf565b6001600160a01b03821661123c5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016104bc565b826001600160a01b031661124f82610c38565b6001600160a01b0316146112755760405162461bcd60e51b81526004016104bc906124cf565b6000818152601c6020908152604080832080546001600160a01b03199081169091556001600160a01b03878116808652601b8552838620805460001901905590871680865283862080546001019055868652601a90945282852080549092168417909155905184936000805160206125f783398151915291a4505050565b6001600160a01b0381166000908152600860205260408120548113806113195750600554155b1561132657506000919050565b6001600160a01b038216600081815260086020526040902054600580549091908110611354576113546122fe565b6000918252602090912001546001600160a01b03161492915050565b6000908152601a60205260409020546001600160a01b031690565b3360009081526027602090815260409182902080548351818402810184019094528084526060939283018282801561041757602002820191906000526020600020908154815260200190600101908083116105ad575050505050905090565b601e80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b0381166000908152600760205260408120548113806114625750600454155b1561146f57506000919050565b6001600160a01b038216600081815260076020526040902054600480549091908110611354576113546122fe565b816001600160a01b0316836001600160a01b0316036114fa5760405162461bcd60e51b815260206004820152601960248201527822a9219b99189d1030b8383937bb32903a379031b0b63632b960391b60448201526064016104bc565b6001600160a01b038381166000818152601d6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6115728484846111a1565b61157e848484846116b7565b610e155760405162461bcd60e51b81526004016104bc90612514565b606060006115a7836117b8565b60010190506000816001600160401b038111156115c6576115c66120b4565b6040519080825280601f01601f1916602001820160405280156115f0576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a85049450846115fa57509392505050565b6000611637601f5490565b9050611647601f80546001019055565b600081815260266020908152604080832080546001600160a01b03191633908117909155835260278252822080546001810182558184529190922001829055611690828461188e565b610e158483611bf5565b6000806116a683611370565b6001600160a01b0316141592915050565b60006001600160a01b0384163b156117ad57604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906116fb903390899088908890600401612566565b6020604051808303816000875af1925050508015611736575060408051601f3d908101601f19168201909252611733918101906125a3565b60015b611793573d808015611764576040519150601f19603f3d011682016040523d82523d6000602084013e611769565b606091505b50805160000361178b5760405162461bcd60e51b81526004016104bc90612514565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050611199565b506001949350505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b83106117f75772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6904ee2d6d415b85acef8160201b8310611821576904ee2d6d415b85acef8160201b830492506020015b662386f26fc10000831061183f57662386f26fc10000830492506010015b6305f5e1008310611857576305f5e100830492506008015b612710831061186b57612710830492506004015b6064831061187d576064830492506002015b600a83106103895760010192915050565b60008082815481106118a2576118a26122fe565b90600052602060002090600a02016003016040518060800160405290816000820180546118ce906122ca565b80601f01602080910402602001604051908101604052809291908181526020018280546118fa906122ca565b80156119475780601f1061191c57610100808354040283529160200191611947565b820191906000526020600020905b81548152906001019060200180831161192a57829003601f168201915b50505050508152602001600182018054611960906122ca565b80601f016020809104026020016040519081016040528092919081815260200182805461198c906122ca565b80156119d95780601f106119ae576101008083540402835291602001916119d9565b820191906000526020600020905b8154815290600101906020018083116119bc57829003601f168201915b505050505081526020016002820154815260200160038201805480602002602001604051908101604052809291908181526020018280548015611a3b57602002820191906000526020600020905b815481526020019060010190808311611a27575b505050505081525050905060006040518060a0016040528060008581548110611a6657611a666122fe565b90600052602060002090600a02016002018054611a82906122ca565b80601f0160208091040260200160405190810160405280929190818152602001828054611aae906122ca565b8015611afb5780601f10611ad057610100808354040283529160200191611afb565b820191906000526020600020905b815481529060010190602001808311611ade57829003601f168201915b50505050508152602001836000015181526020018360200151815260200183604001518152602001836060015181525090506000611b3860205490565b9050611b48602080546001019055565b6000858152602860205260408120829055602380546001810182559152825183916005027fd57b2b5166478fd4318d2acc6cc2c704584312bdd8781b32d5d06abda57f423001908190611b9b90826123af565b5060208201516001820190611bb090826123af565b5060408201516002820190611bc590826123af565b506060820151600382015560808201518051611beb916004840191602090910190611db0565b5050505050505050565b610ddf828260405180602001604052806000815250611c148383611c3d565b611c2160008484846116b7565b61055d5760405162461bcd60e51b81526004016104bc90612514565b6001600160a01b038216611c935760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016104bc565b611c9c8161169a565b15611cb95760405162461bcd60e51b81526004016104bc906125c0565b611cc28161169a565b15611cdf5760405162461bcd60e51b81526004016104bc906125c0565b6001600160a01b0382166000818152601b6020908152604080832080546001019055848352601a90915280822080546001600160a01b0319168417905551839291906000805160206125f7833981519152908290a45050565b6040518060e0016040528060006001600160a01b0316815260200160006001600160a01b0316815260200160608152602001611d956040518060800160405280606081526020016060815260200160008152602001606081525090565b81526020016000815260200160008152602001600081525090565b828054828255906000526020600020908101928215611deb579160200282015b82811115611deb578251825591602001919060010190611dd0565b50611df7929150611dfb565b5090565b5b80821115611df75760008155600101611dfc565b6001600160e01b031981168114610ffa57600080fd5b600060208284031215611e3857600080fd5b8135610ea981611e10565b60005b83811015611e5e578181015183820152602001611e46565b50506000910152565b60008151808452611e7f816020860160208601611e43565b601f01601f19169290920160200192915050565b602081526000610ea96020830184611e67565b600060208284031215611eb857600080fd5b5035919050565b80356001600160a01b03811681146109bf57600080fd5b60008060408385031215611ee957600080fd5b611ef283611ebf565b946020939093013593505050565b600081518084526020808501945080840160005b83811015611f3057815187529582019590820190600101611f14565b509495945050505050565b602081526000610ea96020830184611f00565b634e487b7160e01b600052602160045260246000fd5b60048110611f8257634e487b7160e01b600052602160045260246000fd5b9052565b60208152600060018060a01b0380845116602084015280602085015116604084015250604083015160e06060840152611fc3610100840182611e67565b90506060840151601f19848303016080850152805160808352611fe96080840182611e67565b9050602082015183820360208501526120028282611e67565b915050604082015160408401526060820151915082810360608401526120288183611f00565b92505050608084015161203e60a0850182611f64565b5060a084015160c084015260c084015160e08401528091505092915050565b60006020828403121561206f57600080fd5b610ea982611ebf565b60008060006060848603121561208d57600080fd5b61209684611ebf565b92506120a460208501611ebf565b9150604084013590509250925092565b634e487b7160e01b600052604160045260246000fd5b60006001600160401b03808411156120e4576120e46120b4565b604051601f8501601f19908116603f0116810190828211818310171561210c5761210c6120b4565b8160405280935085815286868601111561212557600080fd5b858560208301376000602087830101525050509392505050565b600082601f83011261215057600080fd5b610ea9838335602085016120ca565b6000806040838503121561217257600080fd5b61217b83611ebf565b915060208301356001600160401b0381111561219657600080fd5b6121a28582860161213f565b9150509250929050565b6000602082840312156121be57600080fd5b81356001600160401b038111156121d457600080fd5b6111998482850161213f565b600080604083850312156121f357600080fd5b6121fc83611ebf565b91506020830135801515811461221157600080fd5b809150509250929050565b6000806000806080858703121561223257600080fd5b61223b85611ebf565b935061224960208601611ebf565b92506040850135915060608501356001600160401b0381111561226b57600080fd5b8501601f8101871361227c57600080fd5b61228b878235602084016120ca565b91505092959194509250565b600080604083850312156122aa57600080fd5b6122b383611ebf565b91506122c160208401611ebf565b90509250929050565b600181811c908216806122de57607f821691505b6020821081036108a457634e487b7160e01b600052602260045260246000fd5b634e487b7160e01b600052603260045260246000fd5b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b601f82111561055d57600081815260208120601f850160051c810160208610156123885750805b601f850160051c820191505b818110156123a757828155600101612394565b505050505050565b81516001600160401b038111156123c8576123c86120b4565b6123dc816123d684546122ca565b84612361565b602080601f83116001811461241157600084156123f95750858301515b600019600386901b1c1916600185901b1785556123a7565b600085815260208120601f198616915b8281101561244057888601518255948401946001909101908401612421565b508582101561245e5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b602080825260189082015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604082015260600190565b600083516124b2818460208801611e43565b8351908301906124c6818360208801611e43565b01949350505050565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061259990830184611e67565b9695505050505050565b6000602082840312156125b557600080fd5b8151610ea981611e10565b6020808252601c908201527b115490cdcc8c4e881d1bdad95b88185b1c9958591e481b5a5b9d195960221b60408201526060019056feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa264697066735822122025e22cb27425ca3caa271a5fcd2e35c5970f6dafd3be008cdcb171a2f3f35da764736f6c63430008130033";

type VehicleFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VehicleFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VehicleFactory__factory extends ContractFactory {
  constructor(...args: VehicleFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<VehicleFactory> {
    return super.deploy(overrides || {}) as Promise<VehicleFactory>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): VehicleFactory {
    return super.attach(address) as VehicleFactory;
  }
  override connect(signer: Signer): VehicleFactory__factory {
    return super.connect(signer) as VehicleFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VehicleFactoryInterface {
    return new utils.Interface(_abi) as VehicleFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VehicleFactory {
    return new Contract(address, _abi, signerOrProvider) as VehicleFactory;
  }
}
