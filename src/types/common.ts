import { Request, ResponseToolkit } from "@hapi/hapi";

export interface Route { 
  path: string;
  method: string;
  handler: (req: Request, h: ResponseToolkit) => void | string;
}