import { initRoutes } from "./routes";
import { init, start } from "./server";
import { initDB } from "./db";
// import { agenda } from "./agenda";

init().then(() => {
  initRoutes();
  initDB();
  start();
});
