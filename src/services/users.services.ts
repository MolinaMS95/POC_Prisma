import {
  getUserByPhone,
  insertUserDB,
  getUserById,
  getRentalsByUser,
  updatePassword,
  deleteUserDB
} from "../repositories/users.repositories.js";
import bcrypt from "bcrypt";

export async function insertUser(
  name: string,
  phone: string,
  password: string
) {
  const user = await getUserByPhone(phone);
  if (user)
    throw {
      type: "error_user_exists",
      message: "This phone number already exists",
    };

  const hashPassword = bcrypt.hashSync(password, 10);
  await insertUserDB(name, phone, hashPassword);
}

export async function getUserHistory(id: string) {
  const user = await getUserById(Number(id));
  if (!user)
    throw {
      type: "error_user_notfound",
      message: "User not found",
    };
  const history = await getRentalsByUser(Number(id));
  return history;
}

export async function alterPassword(id: string, password: string, newPassword: string){
  const user = await getUserById(Number(id));
  if (!user)
    throw {
      type: "error_user_notfound",
      message: "User not found",
    };

  const passwordOk = bcrypt.compareSync(password, user.password);
  if (!passwordOk)
    throw {
      type: "error_user_unauthorized",
      message: "User not authorized",
    };

    const newHashPassword = bcrypt.hashSync(newPassword, 10);

    await updatePassword(Number(id), newHashPassword);
}

export async function removeUser(id: string, password: string){
  const user = await getUserById(Number(id));
  if (!user)
    throw {
      type: "error_user_notfound",
      message: "User not found",
    };

  const passwordOk = bcrypt.compareSync(password, user.password);
  if (!passwordOk)
    throw {
      type: "error_user_unauthorized",
      message: "User not authorized",
    };

    await deleteUserDB(Number(id));
}