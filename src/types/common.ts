import {
  Request,
  ResponseObject,
  ResponseToolkit,
  RouteOptions,
} from "@hapi/hapi";

export interface Route {
  path: string;
  method: string;
  options?: RouteOptions;
  handler: (
    req: any | Request,
    h: ResponseToolkit
  ) => Promise<void | ResponseObject>;
}
