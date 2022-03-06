import { initRoutes } from "./routes";
import { init, start } from "./server";

init().then(() => 
  { 
    initRoutes();
    start()
  }
);