import Elysia from "elysia";
import { del, getUserByEmail, getUserById, post, put } from "../controllers/users.controller";
import { UserModel } from "../models/user.model";

export const users = new Elysia({ prefix: "/users" })
  .use(UserModel)
  .get("/:id", getUserById)
  .get("/", getUserByEmail, { body: "ReadUserBody" })
  .post("/", post, { body: "CreateUserBody" })
  .put("/:id", put, { body: "UpdateUserBody" })
  .delete("/:id", del);
