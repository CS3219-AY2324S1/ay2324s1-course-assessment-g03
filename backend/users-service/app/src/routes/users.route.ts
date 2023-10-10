import Elysia from "elysia";
import { del, get, post, put } from "../controllers/users.controller";
import { UserModel } from "../models/user.model";

export const users = new Elysia({ prefix: "/users" })
  .use(UserModel)
  .get("/:id", get)
  .post("/", post, { body: "CreateUserBody" })
  .put("/:id", put, { body: "UpdateUserBody" })
  .delete("/:id", del);
