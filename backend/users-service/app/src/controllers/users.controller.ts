import { CreateUserBody, UpdateUserBody } from "../models/user.model";
import { create, read, remove, update } from "../services/users.service";

export const del = ({ params: { id } }: { params: { id: string } }) =>
  remove(id);

export const get = ({ params: { id } }: { params: { id: string } }) => read(id);
// TODO: Implement role validation
export const post = ({ body }: { body: CreateUserBody }) => create(body);

export const put = ({
  body,
  params: { id },
}: {
  body: UpdateUserBody;
  params: { id: string };
}) => update(id, body);
