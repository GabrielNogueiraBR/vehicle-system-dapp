/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export declare namespace IBaseContract {
  export type VehicleOwnershipRecordStruct = {
    driverLicenseCode: PromiseOrValue<string>;
    federalUnit: PromiseOrValue<string>;
    county: PromiseOrValue<string>;
    vehiclePlate: PromiseOrValue<string>;
    year: PromiseOrValue<string>;
    startDate: PromiseOrValue<BigNumberish>;
    endDate: PromiseOrValue<BigNumberish>;
  };

  export type VehicleOwnershipRecordStructOutput = [
    string,
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber
  ] & {
    driverLicenseCode: string;
    federalUnit: string;
    county: string;
    vehiclePlate: string;
    year: string;
    startDate: BigNumber;
    endDate: BigNumber;
  };

  export type VehicleRequestDataStruct = {
    carBrand: PromiseOrValue<string>;
    carModel: PromiseOrValue<string>;
    manufacturingDate: PromiseOrValue<BigNumberish>;
    vehicleOwnershipRecordIds: PromiseOrValue<BigNumberish>[];
  };

  export type VehicleRequestDataStructOutput = [
    string,
    string,
    BigNumber,
    BigNumber[]
  ] & {
    carBrand: string;
    carModel: string;
    manufacturingDate: BigNumber;
    vehicleOwnershipRecordIds: BigNumber[];
  };

  export type VehicleRequestStruct = {
    requester: PromiseOrValue<string>;
    agent: PromiseOrValue<string>;
    vehicleRegistrationCode: PromiseOrValue<string>;
    vehicleData: IBaseContract.VehicleRequestDataStruct;
    status: PromiseOrValue<BigNumberish>;
    createdAt: PromiseOrValue<BigNumberish>;
    updatedAt: PromiseOrValue<BigNumberish>;
  };

  export type VehicleRequestStructOutput = [
    string,
    string,
    string,
    IBaseContract.VehicleRequestDataStructOutput,
    number,
    BigNumber,
    BigNumber
  ] & {
    requester: string;
    agent: string;
    vehicleRegistrationCode: string;
    vehicleData: IBaseContract.VehicleRequestDataStructOutput;
    status: number;
    createdAt: BigNumber;
    updatedAt: BigNumber;
  };
}

export interface IInsurerContractInterface extends utils.Interface {
  functions: {
    "agentDeactivation(address)": FunctionFragment;
    "agentRegistration(address)": FunctionFragment;
    "approveVehicleRequest(uint256,string,string,uint256,(string,string,string,string,string,uint256,uint256)[])": FunctionFragment;
    "createVehicleInsuranceProposal(uint256,uint256,uint256,uint256,string)": FunctionFragment;
    "getVehicleInsuranceContractIdsByInsurer()": FunctionFragment;
    "getVehicleInsuranceContractIdsByInsurerAndTokenId(uint256)": FunctionFragment;
    "getVehicleInsuranceProposalIdsByInsurer()": FunctionFragment;
    "getVehicleInsuranceRequestIdsByInsurer()": FunctionFragment;
    "getVehicleRequestById(uint256)": FunctionFragment;
    "insurerAddVehicleServiceRecord(uint256,uint256,uint256,string,string,uint256,uint256)": FunctionFragment;
    "insurerDeactivation(address)": FunctionFragment;
    "insurerRegistration(address)": FunctionFragment;
    "listAgents()": FunctionFragment;
    "listInsurers()": FunctionFragment;
    "listVehicleRequestsIds()": FunctionFragment;
    "registerVehicleAccidentRecord(uint256,uint256,string,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "agentDeactivation"
      | "agentRegistration"
      | "approveVehicleRequest"
      | "createVehicleInsuranceProposal"
      | "getVehicleInsuranceContractIdsByInsurer"
      | "getVehicleInsuranceContractIdsByInsurerAndTokenId"
      | "getVehicleInsuranceProposalIdsByInsurer"
      | "getVehicleInsuranceRequestIdsByInsurer"
      | "getVehicleRequestById"
      | "insurerAddVehicleServiceRecord"
      | "insurerDeactivation"
      | "insurerRegistration"
      | "listAgents"
      | "listInsurers"
      | "listVehicleRequestsIds"
      | "registerVehicleAccidentRecord"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "agentDeactivation",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "agentRegistration",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "approveVehicleRequest",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      IBaseContract.VehicleOwnershipRecordStruct[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "createVehicleInsuranceProposal",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getVehicleInsuranceContractIdsByInsurer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getVehicleInsuranceContractIdsByInsurerAndTokenId",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getVehicleInsuranceProposalIdsByInsurer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getVehicleInsuranceRequestIdsByInsurer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getVehicleRequestById",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "insurerAddVehicleServiceRecord",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "insurerDeactivation",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "insurerRegistration",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "listAgents",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "listInsurers",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "listVehicleRequestsIds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "registerVehicleAccidentRecord",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "agentDeactivation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "agentRegistration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveVehicleRequest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createVehicleInsuranceProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVehicleInsuranceContractIdsByInsurer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVehicleInsuranceContractIdsByInsurerAndTokenId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVehicleInsuranceProposalIdsByInsurer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVehicleInsuranceRequestIdsByInsurer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVehicleRequestById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "insurerAddVehicleServiceRecord",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "insurerDeactivation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "insurerRegistration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "listAgents", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "listInsurers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "listVehicleRequestsIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerVehicleAccidentRecord",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IInsurerContract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IInsurerContractInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    agentDeactivation(
      agentAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    agentRegistration(
      agentAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    approveVehicleRequest(
      requestId: PromiseOrValue<BigNumberish>,
      carBrand: PromiseOrValue<string>,
      carModel: PromiseOrValue<string>,
      manufacturingDate: PromiseOrValue<BigNumberish>,
      ownershipRecords: IBaseContract.VehicleOwnershipRecordStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createVehicleInsuranceProposal(
      requestId: PromiseOrValue<BigNumberish>,
      startDate: PromiseOrValue<BigNumberish>,
      endDate: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      contractUrl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getVehicleInsuranceContractIdsByInsurer(
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    getVehicleInsuranceContractIdsByInsurerAndTokenId(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    getVehicleInsuranceProposalIdsByInsurer(
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    getVehicleInsuranceRequestIdsByInsurer(
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    getVehicleRequestById(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[IBaseContract.VehicleRequestStructOutput]>;

    insurerAddVehicleServiceRecord(
      tokenId: PromiseOrValue<BigNumberish>,
      insuranceId: PromiseOrValue<BigNumberish>,
      accidentId: PromiseOrValue<BigNumberish>,
      title: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      price: PromiseOrValue<BigNumberish>,
      date: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    insurerDeactivation(
      insurerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    insurerRegistration(
      insurerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    listAgents(overrides?: CallOverrides): Promise<[string[]]>;

    listInsurers(overrides?: CallOverrides): Promise<[string[]]>;

    listVehicleRequestsIds(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    registerVehicleAccidentRecord(
      tokenId: PromiseOrValue<BigNumberish>,
      insuranceId: PromiseOrValue<BigNumberish>,
      description: PromiseOrValue<string>,
      accidentDate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  agentDeactivation(
    agentAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  agentRegistration(
    agentAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  approveVehicleRequest(
    requestId: PromiseOrValue<BigNumberish>,
    carBrand: PromiseOrValue<string>,
    carModel: PromiseOrValue<string>,
    manufacturingDate: PromiseOrValue<BigNumberish>,
    ownershipRecords: IBaseContract.VehicleOwnershipRecordStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createVehicleInsuranceProposal(
    requestId: PromiseOrValue<BigNumberish>,
    startDate: PromiseOrValue<BigNumberish>,
    endDate: PromiseOrValue<BigNumberish>,
    price: PromiseOrValue<BigNumberish>,
    contractUrl: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getVehicleInsuranceContractIdsByInsurer(
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getVehicleInsuranceContractIdsByInsurerAndTokenId(
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getVehicleInsuranceProposalIdsByInsurer(
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getVehicleInsuranceRequestIdsByInsurer(
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getVehicleRequestById(
    requestId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IBaseContract.VehicleRequestStructOutput>;

  insurerAddVehicleServiceRecord(
    tokenId: PromiseOrValue<BigNumberish>,
    insuranceId: PromiseOrValue<BigNumberish>,
    accidentId: PromiseOrValue<BigNumberish>,
    title: PromiseOrValue<string>,
    description: PromiseOrValue<string>,
    price: PromiseOrValue<BigNumberish>,
    date: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  insurerDeactivation(
    insurerAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  insurerRegistration(
    insurerAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  listAgents(overrides?: CallOverrides): Promise<string[]>;

  listInsurers(overrides?: CallOverrides): Promise<string[]>;

  listVehicleRequestsIds(overrides?: CallOverrides): Promise<BigNumber[]>;

  registerVehicleAccidentRecord(
    tokenId: PromiseOrValue<BigNumberish>,
    insuranceId: PromiseOrValue<BigNumberish>,
    description: PromiseOrValue<string>,
    accidentDate: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    agentDeactivation(
      agentAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    agentRegistration(
      agentAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    approveVehicleRequest(
      requestId: PromiseOrValue<BigNumberish>,
      carBrand: PromiseOrValue<string>,
      carModel: PromiseOrValue<string>,
      manufacturingDate: PromiseOrValue<BigNumberish>,
      ownershipRecords: IBaseContract.VehicleOwnershipRecordStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    createVehicleInsuranceProposal(
      requestId: PromiseOrValue<BigNumberish>,
      startDate: PromiseOrValue<BigNumberish>,
      endDate: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      contractUrl: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    getVehicleInsuranceContractIdsByInsurer(
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getVehicleInsuranceContractIdsByInsurerAndTokenId(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getVehicleInsuranceProposalIdsByInsurer(
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getVehicleInsuranceRequestIdsByInsurer(
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getVehicleRequestById(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IBaseContract.VehicleRequestStructOutput>;

    insurerAddVehicleServiceRecord(
      tokenId: PromiseOrValue<BigNumberish>,
      insuranceId: PromiseOrValue<BigNumberish>,
      accidentId: PromiseOrValue<BigNumberish>,
      title: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      price: PromiseOrValue<BigNumberish>,
      date: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    insurerDeactivation(
      insurerAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    insurerRegistration(
      insurerAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    listAgents(overrides?: CallOverrides): Promise<string[]>;

    listInsurers(overrides?: CallOverrides): Promise<string[]>;

    listVehicleRequestsIds(overrides?: CallOverrides): Promise<BigNumber[]>;

    registerVehicleAccidentRecord(
      tokenId: PromiseOrValue<BigNumberish>,
      insuranceId: PromiseOrValue<BigNumberish>,
      description: PromiseOrValue<string>,
      accidentDate: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    agentDeactivation(
      agentAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    agentRegistration(
      agentAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    approveVehicleRequest(
      requestId: PromiseOrValue<BigNumberish>,
      carBrand: PromiseOrValue<string>,
      carModel: PromiseOrValue<string>,
      manufacturingDate: PromiseOrValue<BigNumberish>,
      ownershipRecords: IBaseContract.VehicleOwnershipRecordStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createVehicleInsuranceProposal(
      requestId: PromiseOrValue<BigNumberish>,
      startDate: PromiseOrValue<BigNumberish>,
      endDate: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      contractUrl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getVehicleInsuranceContractIdsByInsurer(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVehicleInsuranceContractIdsByInsurerAndTokenId(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVehicleInsuranceProposalIdsByInsurer(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVehicleInsuranceRequestIdsByInsurer(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVehicleRequestById(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    insurerAddVehicleServiceRecord(
      tokenId: PromiseOrValue<BigNumberish>,
      insuranceId: PromiseOrValue<BigNumberish>,
      accidentId: PromiseOrValue<BigNumberish>,
      title: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      price: PromiseOrValue<BigNumberish>,
      date: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    insurerDeactivation(
      insurerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    insurerRegistration(
      insurerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    listAgents(overrides?: CallOverrides): Promise<BigNumber>;

    listInsurers(overrides?: CallOverrides): Promise<BigNumber>;

    listVehicleRequestsIds(overrides?: CallOverrides): Promise<BigNumber>;

    registerVehicleAccidentRecord(
      tokenId: PromiseOrValue<BigNumberish>,
      insuranceId: PromiseOrValue<BigNumberish>,
      description: PromiseOrValue<string>,
      accidentDate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    agentDeactivation(
      agentAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    agentRegistration(
      agentAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    approveVehicleRequest(
      requestId: PromiseOrValue<BigNumberish>,
      carBrand: PromiseOrValue<string>,
      carModel: PromiseOrValue<string>,
      manufacturingDate: PromiseOrValue<BigNumberish>,
      ownershipRecords: IBaseContract.VehicleOwnershipRecordStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createVehicleInsuranceProposal(
      requestId: PromiseOrValue<BigNumberish>,
      startDate: PromiseOrValue<BigNumberish>,
      endDate: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      contractUrl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getVehicleInsuranceContractIdsByInsurer(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVehicleInsuranceContractIdsByInsurerAndTokenId(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVehicleInsuranceProposalIdsByInsurer(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVehicleInsuranceRequestIdsByInsurer(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVehicleRequestById(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    insurerAddVehicleServiceRecord(
      tokenId: PromiseOrValue<BigNumberish>,
      insuranceId: PromiseOrValue<BigNumberish>,
      accidentId: PromiseOrValue<BigNumberish>,
      title: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      price: PromiseOrValue<BigNumberish>,
      date: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    insurerDeactivation(
      insurerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    insurerRegistration(
      insurerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    listAgents(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    listInsurers(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    listVehicleRequestsIds(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerVehicleAccidentRecord(
      tokenId: PromiseOrValue<BigNumberish>,
      insuranceId: PromiseOrValue<BigNumberish>,
      description: PromiseOrValue<string>,
      accidentDate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
