import {
  addEvent,
  editTableMe,
  eventMaintain,
  eventRelease,
} from "../controllers/eventControllers";
import { Route } from "../types/common";
import Joi from "joi";
import { ResponseToolkit } from "@hapi/hapi";

export const eventRoutes: Route[] = [
  {
    method: "POST",
    path: "/api/events",
    options: {
      description: "Add event",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          event_name: Joi.string().required(),
          total_voucher: Joi.number(),
        }).options({ stripUnknown: true }),
      },
    },
    handler: addEvent,
  },
  {
    method: "POST",
    path: "/api/events/{event_id}/editable/me",
    options: {
      description: "Check event ediable",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          userId: Joi.string().required,
        }),
        params: Joi.object({
          event_id: Joi.string().required(),
        }).options({ stripUnknown: true }),
      },
    },
    handler: editTableMe,
  },
  {
    method: "POST",
    path: "/api/events/{event_id}/editable/release",
    options: {
      description: "Release event",
      tags: ["api"],
      validate: {
        params: Joi.object({
          event_id: Joi.string().required(),
        }).options({ stripUnknown: true }),
      },
    },
    handler: eventRelease,
  },
  {
    method: "POST",
    path: "/api/events/{event_id}/editable/maintain",
    options: {
      description: "Maintain event ",
      tags: ["api"],
      validate: {
        params: Joi.object({
          event_id: Joi.string().required(),
        }).options({ stripUnknown: true }),
      },
    },
    handler: eventMaintain,
  },
];
