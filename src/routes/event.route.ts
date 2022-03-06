import { getEvents } from "../controllers/eventControllers"
import { Route } from '../types/common';

export const eventRoutes: Route[] = [
  {
    method: 'GET',
    path: '/api/events',
    handler: getEvents
  }
]