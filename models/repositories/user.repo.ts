import userModel from "../user.model";

export const CreateUser = async ({ name, email, slug, password, role, avatar }) => {
  const user = await userModel.create({ name, email, slug, password, role, avatar });
  return user;
};
