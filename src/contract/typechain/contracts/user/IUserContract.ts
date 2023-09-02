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

export interface IUserContractInterface extends utils.Interface {
  functions: {
    "createVehicleRequest(address,string)": FunctionFragment;
    "defineDriverLicenseCode(string)": FunctionFragment;
    "driverLicenseCodeOf(address)": FunctionFragment;
    "getDriverLicenseCode()": FunctionFragment;
    "getUserVehicleRequestById(uint256)": FunctionFragment;
    "listApprovalsIds()": FunctionFragment;
    "listUserVehicleRequestsIds()": FunctionFragment;
    "userRegistration(string)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createVehicleRequest"
      | "defineDriverLicenseCode"
      | "driverLicenseCodeOf"
      | "getDriverLicenseCode"
      | "getUserVehicleRequestById"
      | "listApprovalsIds"
      | "listUserVehicleRequestsIds"
      | "userRegistration"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createVehicleRequest",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "defineDriverLicenseCode",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "driverLicenseCodeOf",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getDriverLicenseCode",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getUserVehicleRequestById",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "listApprovalsIds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "listUserVehicleRequestsIds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "userRegistration",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "createVehicleRequest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "defineDriverLicenseCode",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "driverLicenseCodeOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDriverLicenseCode",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserVehicleRequestById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "listApprovalsIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "listUserVehicleRequestsIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userRegistration",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IUserContract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IUserContractInterface;

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
    createVehicleRequest(
      agent: PromiseOrValue<string>,
      vehicleRegistrationCode: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    defineDriverLicenseCode(
      driverLicenseCode: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    driverLicenseCodeOf(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string] & { driverLicenseCode: string }>;

    getDriverLicenseCode(
      overrides?: CallOverrides
    ): Promise<[string] & { driverLicenseCode: string }>;

    getUserVehicleRequestById(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[IBaseContract.VehicleRequestStructOutput]>;

    listApprovalsIds(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    listUserVehicleRequestsIds(
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    userRegistration(
      driverLicenseCode: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  createVehicleRequest(
    agent: PromiseOrValue<string>,
    vehicleRegistrationCode: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  defineDriverLicenseCode(
    driverLicenseCode: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  driverLicenseCodeOf(
    user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getDriverLicenseCode(overrides?: CallOverrides): Promise<string>;

  getUserVehicleRequestById(
    requestId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IBaseContract.VehicleRequestStructOutput>;

  listApprovalsIds(overrides?: CallOverrides): Promise<BigNumber[]>;

  listUserVehicleRequestsIds(overrides?: CallOverrides): Promise<BigNumber[]>;

  userRegistration(
    driverLicenseCode: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createVehicleRequest(
      agent: PromiseOrValue<string>,
      vehicleRegistrationCode: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    defineDriverLicenseCode(
      driverLicenseCode: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    driverLicenseCodeOf(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getDriverLicenseCode(overrides?: CallOverrides): Promise<string>;

    getUserVehicleRequestById(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IBaseContract.VehicleRequestStructOutput>;

    listApprovalsIds(overrides?: CallOverrides): Promise<BigNumber[]>;

    listUserVehicleRequestsIds(overrides?: CallOverrides): Promise<BigNumber[]>;

    userRegistration(
      driverLicenseCode: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    createVehicleRequest(
      agent: PromiseOrValue<string>,
      vehicleRegistrationCode: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    defineDriverLicenseCode(
      driverLicenseCode: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    driverLicenseCodeOf(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDriverLicenseCode(overrides?: CallOverrides): Promise<BigNumber>;

    getUserVehicleRequestById(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    listApprovalsIds(overrides?: CallOverrides): Promise<BigNumber>;

    listUserVehicleRequestsIds(overrides?: CallOverrides): Promise<BigNumber>;

    userRegistration(
      driverLicenseCode: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createVehicleRequest(
      agent: PromiseOrValue<string>,
      vehicleRegistrationCode: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    defineDriverLicenseCode(
      driverLicenseCode: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    driverLicenseCodeOf(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDriverLicenseCode(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUserVehicleRequestById(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    listApprovalsIds(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    listUserVehicleRequestsIds(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    userRegistration(
      driverLicenseCode: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
