import { Elysia } from "elysia";
import { middleware } from "./middlewares/users.middleware";
import { users } from "./routes/users.route";

const app = new Elysia({ prefix: "/api" })
  .use(middleware)
  .use(users)
  .listen(process.env.PORT as string);

console.log(
  `Users service is running at ${app.server?.hostname}:${app.server?.port}`,
);
