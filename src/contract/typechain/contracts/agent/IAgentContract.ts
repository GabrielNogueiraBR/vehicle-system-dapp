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

export interface IAgentContractInterface extends utils.Interface {
  functions: {
    "agentDeactivation(address)": FunctionFragment;
    "agentRegistration(address)": FunctionFragment;
    "approveVehicleRequest(uint256,string,string,uint256,(string,string,string,string,string,uint256,uint256)[])": FunctionFragment;
    "getVehicleRequestById(uint256)": FunctionFragment;
    "listAgents()": FunctionFragment;
    "listVehicleRequestsIds()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "agentDeactivation"
      | "agentRegistration"
      | "approveVehicleRequest"
      | "getVehicleRequestById"
      | "listAgents"
      | "listVehicleRequestsIds"
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
    functionFragment: "getVehicleRequestById",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "listAgents",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "listVehicleRequestsIds",
    values?: undefined
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
    functionFragment: "getVehicleRequestById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "listAgents", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "listVehicleRequestsIds",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IAgentContract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IAgentContractInterface;

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

    getVehicleRequestById(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[IBaseContract.VehicleRequestStructOutput]>;

    listAgents(overrides?: CallOverrides): Promise<[string[]]>;

    listVehicleRequestsIds(overrides?: CallOverrides): Promise<[BigNumber[]]>;
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

  getVehicleRequestById(
    requestId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IBaseContract.VehicleRequestStructOutput>;

  listAgents(overrides?: CallOverrides): Promise<string[]>;

  listVehicleRequestsIds(overrides?: CallOverrides): Promise<BigNumber[]>;

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

    getVehicleRequestById(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IBaseContract.VehicleRequestStructOutput>;

    listAgents(overrides?: CallOverrides): Promise<string[]>;

    listVehicleRequestsIds(overrides?: CallOverrides): Promise<BigNumber[]>;
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

    getVehicleRequestById(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    listAgents(overrides?: CallOverrides): Promise<BigNumber>;

    listVehicleRequestsIds(overrides?: CallOverrides): Promise<BigNumber>;
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

    getVehicleRequestById(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    listAgents(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    listVehicleRequestsIds(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
