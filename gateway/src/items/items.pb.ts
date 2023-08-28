/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "items";

export interface Items {
  id: number;
  name: string;
  type: Categories | undefined;
  price: number;
  restaurantId: number;
}

export interface CreateItemsResp {
  status: number;
  error: string[];
  id: number;
}

export interface Categories {
  id: number;
  name: string;
  parentCategory: number;
}

export interface FindRestaurantItemsRequest {
  restaurantId: number;
}

export interface FindRestaurantItemsResponse {
  status: number;
  error: string[];
  response: Items[];
}

export interface ArchiveItemsRequest {
  id: number;
}

export interface ArchiveItemsResponse {
  status: number;
  error: string[];
}

export const ITEMS_PACKAGE_NAME = "items";

export interface ItemsServiceClient {
  createItems(request: Items): Observable<CreateItemsResp>;

  findRestaurantItems(request: FindRestaurantItemsRequest): Observable<FindRestaurantItemsResponse>;

  archiveItems(request: ArchiveItemsRequest): Observable<ArchiveItemsResponse>;
}

export interface ItemsServiceController {
  createItems(request: Items): Promise<CreateItemsResp> | Observable<CreateItemsResp> | CreateItemsResp;

  findRestaurantItems(
    request: FindRestaurantItemsRequest,
  ): Promise<FindRestaurantItemsResponse> | Observable<FindRestaurantItemsResponse> | FindRestaurantItemsResponse;

  archiveItems(
    request: ArchiveItemsRequest,
  ): Promise<ArchiveItemsResponse> | Observable<ArchiveItemsResponse> | ArchiveItemsResponse;
}

export function ItemsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createItems", "findRestaurantItems", "archiveItems"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ItemsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ItemsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ITEMS_SERVICE_NAME = "ItemsService";
