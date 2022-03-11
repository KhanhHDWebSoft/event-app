import { Route } from "../types/common";
import Joi from "joi";
import { generateVoucher } from "../controllers/voucherController";

export const voucherRoutes: Route[] = [
  {
    method: "GET",
    path: "/api/voucher/{event_id}",
    options: {
      validate: {
        params: Joi.object({
          event_id: Joi.string().required(),
        }).options({ stripUnknown: true }),
      },
    },
    handler: generateVoucher,
  },
];
