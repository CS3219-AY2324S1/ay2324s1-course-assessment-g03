import { CreateUserBody, UpdateUserBody } from "../models/user.model";
import { create, readUserByEmail, readUserById, remove, update } from "../services/users.service";

export const del = ({ params: { id } }: { params: { id: string } }) =>
  remove(id);

export const getUserById = ({ params: { id } }: { params: { id: string } }) => readUserById(id);

export const getUserByEmail = ({ body: { email } }: { body: { email: string } }) => readUserByEmail(email);
// TODO: Implement role validation
export const post = ({ body }: { body: CreateUserBody }) => create(body);

export const put = ({
  body,
  params: { id },
}: {
  body: UpdateUserBody;
  params: { id: string };
}) => update(id, body);
