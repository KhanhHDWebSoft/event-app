import { eventRoutes } from './routes/event.route';
import { server } from './server'; 
import { Route } from './types/common';

export const initRoutes = () => {
  if (server) {

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });
    const combineRoutes = [...eventRoutes];
    console.log('111')
    // init route
    combineRoutes.forEach((route: Route) => {
      server.route(route);
    });

  }
}