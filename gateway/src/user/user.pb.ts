/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface User {
  username: string;
  name: string;
  email: string;
  password: string;
  verified: string;
}

export interface CreateUserResponse {
  id: string;
  user?: User | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAwardRequest {
  user?: User | undefined;
  awardName: string;
  isGlobal: boolean;
  businessEmail: string;
  businessNumber: string;
}

export interface CreateAwardResponse {
  id: string;
  award?: CreateAwardRequest | undefined;
}

export interface CreateRestaurantRequest {
  userInfo?: User | undefined;
  resturantName: string;
  phoneNumber: string;
  businessEmail: string;
  businessNumber: string;
}

export interface CreateRestaurantResponse {
  id: string;
  user?: CreateRestaurantRequest | undefined;
}

export interface CreateCriticRequest {
  user?: User | undefined;
  businessEmail: string;
  businessNumber: string;
}

export interface CreateCriticResponse {
  id: string;
  critic?: CreateCriticRequest | undefined;
}

export const USER_PACKAGE_NAME = "user";

export interface UserSerivceClient {
  createUser(request: User): Observable<CreateUserResponse>;

  createRestaurant(request: CreateRestaurantRequest): Observable<CreateRestaurantResponse>;

  createCritic(request: CreateCriticRequest): Observable<CreateCriticResponse>;

  createAward(request: CreateAwardRequest): Observable<CreateAwardResponse>;
}

export interface UserSerivceController {
  createUser(request: User): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;

  createRestaurant(
    request: CreateRestaurantRequest,
  ): Promise<CreateRestaurantResponse> | Observable<CreateRestaurantResponse> | CreateRestaurantResponse;

  createCritic(
    request: CreateCriticRequest,
  ): Promise<CreateCriticResponse> | Observable<CreateCriticResponse> | CreateCriticResponse;

  createAward(
    request: CreateAwardRequest,
  ): Promise<CreateAwardResponse> | Observable<CreateAwardResponse> | CreateAwardResponse;
}

export function UserSerivceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "createRestaurant", "createCritic", "createAward"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserSerivce", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserSerivce", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERIVCE_SERVICE_NAME = "UserSerivce";
