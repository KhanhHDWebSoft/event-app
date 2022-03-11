import { initRoutes } from "./routes";
import { init, start } from "./server";
import { initDB } from "./db";
import { agenda } from "./agenda";

init().then(async () => {
  initRoutes();
  initDB();
  start();
  await agenda.start();
});
