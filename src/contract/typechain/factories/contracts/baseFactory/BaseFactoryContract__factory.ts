/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  BaseFactoryContract,
  BaseFactoryContractInterface,
} from "../../../contracts/baseFactory/BaseFactoryContract";

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
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600381526020016213919560ea1b815250604051806040016040528060048152602001631593919560e21b81525081601890816200005c919062000198565b5060196200006b828262000198565b50505062000088620000826200009d60201b60201c565b620000a1565b62000097601f80546001019055565b62000264565b3390565b601e80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200011e57607f821691505b6020821081036200013f57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200019357600081815260208120601f850160051c810160208610156200016e5750805b601f850160051c820191505b818110156200018f578281556001016200017a565b5050505b505050565b81516001600160401b03811115620001b457620001b4620000f3565b620001cc81620001c5845462000109565b8462000145565b602080601f831160018114620002045760008415620001eb5750858301515b600019600386901b1c1916600185901b1785556200018f565b600085815260208120601f198616915b82811015620002355788860151825594840194600190910190840162000214565b5085821015620002545787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61124280620002746000396000f3fe608060405234801561001057600080fd5b50600436106100d05760003560e01c806301ffc9a7146100d557806306fdde03146100fd578063081812fc14610112578063095ea7b31461013d57806323b872dd1461015257806342842e0e146101655780636352211e1461017857806370a082311461018b578063715018a6146101ac5780638da5cb5b146101b457806395d89b41146101bc578063a22cb465146101c4578063b88d4fde146101d7578063c87b56dd146101ea578063e985e9c5146101fd578063f2fde38b14610210575b600080fd5b6100e86100e3366004610d9d565b610223565b60405190151581526020015b60405180910390f35b610105610275565b6040516100f49190610e0a565b610125610120366004610e1d565b610307565b6040516001600160a01b0390911681526020016100f4565b61015061014b366004610e52565b61032e565b005b610150610160366004610e7c565b610448565b610150610173366004610e7c565b610479565b610125610186366004610e1d565b610494565b61019e610199366004610eb8565b6104c8565b6040519081526020016100f4565b61015061054e565b610125610562565b610105610571565b6101506101d2366004610ed3565b610580565b6101506101e5366004610f25565b61058f565b6101056101f8366004610e1d565b6105c7565b6100e861020b366004611000565b61063b565b61015061021e366004610eb8565b610669565b60006001600160e01b031982166380ac58cd60e01b148061025457506001600160e01b03198216635b5e139f60e01b145b8061026f57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606018805461028490611033565b80601f01602080910402602001604051908101604052809291908181526020018280546102b090611033565b80156102fd5780601f106102d2576101008083540402835291602001916102fd565b820191906000526020600020905b8154815290600101906020018083116102e057829003601f168201915b5050505050905090565b6000610312826106e2565b506000908152601c60205260409020546001600160a01b031690565b600061033982610494565b9050806001600160a01b0316836001600160a01b0316036103ab5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806103c757506103c7813361063b565b6104395760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c00000060648201526084016103a2565b6104438383610707565b505050565b6104523382610775565b61046e5760405162461bcd60e51b81526004016103a29061106d565b6104438383836107d4565b6104438383836040518060200160405280600081525061058f565b6000806104a083610938565b90506001600160a01b03811661026f5760405162461bcd60e51b81526004016103a2906110ba565b60006001600160a01b0382166105325760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b60648201526084016103a2565b506001600160a01b03166000908152601b602052604090205490565b610556610953565b61056060006109b2565b565b601e546001600160a01b031690565b60606019805461028490611033565b61058b338383610a04565b5050565b6105993383610775565b6105b55760405162461bcd60e51b81526004016103a29061106d565b6105c184848484610ace565b50505050565b60606105d2826106e2565b60006105e960408051602081019091526000815290565b905060008151116106095760405180602001604052806000815250610634565b8061061384610b01565b6040516020016106249291906110ec565b6040516020818303038152906040525b9392505050565b6001600160a01b039182166000908152601d6020908152604080832093909416825291909152205460ff1690565b610671610953565b6001600160a01b0381166106d65760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016103a2565b6106df816109b2565b50565b6106eb81610b93565b6106df5760405162461bcd60e51b81526004016103a2906110ba565b6000818152601c6020526040902080546001600160a01b0319166001600160a01b038416908117909155819061073c82610494565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60008061078183610494565b9050806001600160a01b0316846001600160a01b031614806107a857506107a8818561063b565b806107cc5750836001600160a01b03166107c184610307565b6001600160a01b0316145b949350505050565b826001600160a01b03166107e782610494565b6001600160a01b03161461080d5760405162461bcd60e51b81526004016103a29061111b565b6001600160a01b03821661086f5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103a2565b826001600160a01b031661088282610494565b6001600160a01b0316146108a85760405162461bcd60e51b81526004016103a29061111b565b6000818152601c6020908152604080832080546001600160a01b03199081169091556001600160a01b03878116808652601b8552838620805460001901905590871680865283862080546001019055868652601a90945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6000908152601a60205260409020546001600160a01b031690565b3361095c610562565b6001600160a01b0316146105605760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016103a2565b601e80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b816001600160a01b0316836001600160a01b031603610a615760405162461bcd60e51b815260206004820152601960248201527822a9219b99189d1030b8383937bb32903a379031b0b63632b960391b60448201526064016103a2565b6001600160a01b038381166000818152601d6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610ad98484846107d4565b610ae584848484610bb0565b6105c15760405162461bcd60e51b81526004016103a290611160565b60606000610b0e83610cb1565b60010190506000816001600160401b03811115610b2d57610b2d610f0f565b6040519080825280601f01601f191660200182016040528015610b57576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084610b6157509392505050565b600080610b9f83610938565b6001600160a01b0316141592915050565b60006001600160a01b0384163b15610ca657604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610bf49033908990889088906004016111b2565b6020604051808303816000875af1925050508015610c2f575060408051601f3d908101601f19168201909252610c2c918101906111ef565b60015b610c8c573d808015610c5d576040519150601f19603f3d011682016040523d82523d6000602084013e610c62565b606091505b508051600003610c845760405162461bcd60e51b81526004016103a290611160565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506107cc565b506001949350505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310610cf05772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6904ee2d6d415b85acef8160201b8310610d1a576904ee2d6d415b85acef8160201b830492506020015b662386f26fc100008310610d3857662386f26fc10000830492506010015b6305f5e1008310610d50576305f5e100830492506008015b6127108310610d6457612710830492506004015b60648310610d76576064830492506002015b600a831061026f5760010192915050565b6001600160e01b0319811681146106df57600080fd5b600060208284031215610daf57600080fd5b813561063481610d87565b60005b83811015610dd5578181015183820152602001610dbd565b50506000910152565b60008151808452610df6816020860160208601610dba565b601f01601f19169290920160200192915050565b6020815260006106346020830184610dde565b600060208284031215610e2f57600080fd5b5035919050565b80356001600160a01b0381168114610e4d57600080fd5b919050565b60008060408385031215610e6557600080fd5b610e6e83610e36565b946020939093013593505050565b600080600060608486031215610e9157600080fd5b610e9a84610e36565b9250610ea860208501610e36565b9150604084013590509250925092565b600060208284031215610eca57600080fd5b61063482610e36565b60008060408385031215610ee657600080fd5b610eef83610e36565b915060208301358015158114610f0457600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60008060008060808587031215610f3b57600080fd5b610f4485610e36565b9350610f5260208601610e36565b92506040850135915060608501356001600160401b0380821115610f7557600080fd5b818701915087601f830112610f8957600080fd5b813581811115610f9b57610f9b610f0f565b604051601f8201601f19908116603f01168101908382118183101715610fc357610fc3610f0f565b816040528281528a6020848701011115610fdc57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561101357600080fd5b61101c83610e36565b915061102a60208401610e36565b90509250929050565b600181811c9082168061104757607f821691505b60208210810361106757634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b602080825260189082015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604082015260600190565b600083516110fe818460208801610dba565b835190830190611112818360208801610dba565b01949350505050565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906111e590830184610dde565b9695505050505050565b60006020828403121561120157600080fd5b815161063481610d8756fea264697066735822122078815c6eba711738039ae98265755debb9deae1e8142c273c387b7303a105bc664736f6c63430008130033";

type BaseFactoryContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BaseFactoryContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BaseFactoryContract__factory extends ContractFactory {
  constructor(...args: BaseFactoryContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BaseFactoryContract> {
    return super.deploy(overrides || {}) as Promise<BaseFactoryContract>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): BaseFactoryContract {
    return super.attach(address) as BaseFactoryContract;
  }
  override connect(signer: Signer): BaseFactoryContract__factory {
    return super.connect(signer) as BaseFactoryContract__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BaseFactoryContractInterface {
    return new utils.Interface(_abi) as BaseFactoryContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BaseFactoryContract {
    return new Contract(address, _abi, signerOrProvider) as BaseFactoryContract;
  }
}
