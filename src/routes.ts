import { eventRoutes } from "./routes/event.route";
import { voucherRoutes } from "./routes/voucher.route";
import { server } from "./server";
import { Route } from "./types/common";

export const initRoutes = () => {
  if (server) {
    // test router
    server.route({
      method: "GET",
      path: "/",
      handler: (request, h) => {
        return "Hello Training project!";
      },
    });

    const combineRoutes = [...eventRoutes, ...voucherRoutes];
    // init route
    combineRoutes.forEach((route: Route) => {
      server.route(route);
    });
  }
};
