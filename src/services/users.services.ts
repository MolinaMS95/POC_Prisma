import {
  getUserByPhone,
  insertUserDB,
  getUserById,
  getRentalsByUser,
  updatePassword,
  deleteUserDB
} from "../repositories/users.repositories.js";
import {deleteUserRentals} from "../repositories/rents.repositories.js"
import bcrypt from "bcrypt";
import { UserEntity } from "../protocols/User";

export async function insertUser(
  name: string,
  phone: string,
  password: string
) {
  const { rows }: { rows: UserEntity[] } = await getUserByPhone(phone);
  if (rows.length !== 0)
    throw {
      type: "error_user_exists",
      message: "This phone number already exists",
    };

  const hashPassword = bcrypt.hashSync(password, 10);
  await insertUserDB(name, phone, hashPassword);
}

export async function getUserHistory(id: string) {
  const { rows }: { rows: UserEntity[] } = await getUserById(id);
  if (rows.length === 0)
    throw {
      type: "error_user_notfound",
      message: "User not found",
    };
  const history = await getRentalsByUser(id);
  return history.rows[0];
}

export async function alterPassword(id: string, password: string, newPassword: string){
  const { rows }: { rows: UserEntity[] } = await getUserById(id);
  if (rows.length === 0)
    throw {
      type: "error_user_notfound",
      message: "User not found",
    };

  const passwordOk = bcrypt.compareSync(password, rows[0].password);
  if (!passwordOk)
    throw {
      type: "error_user_unauthorized",
      message: "User not authorized",
    };

    const newHashPassword = bcrypt.hashSync(newPassword, 10);

    await updatePassword(id, newHashPassword);
}

export async function removeUser(id: string, password: string){
  const { rows }: { rows: UserEntity[] } = await getUserById(id);
  if (rows.length === 0)
    throw {
      type: "error_user_notfound",
      message: "User not found",
    };

  const passwordOk = bcrypt.compareSync(password, rows[0].password);
  if (!passwordOk)
    throw {
      type: "error_user_unauthorized",
      message: "User not authorized",
    };

    await deleteUserRentals(id);
    await deleteUserDB(id);
}