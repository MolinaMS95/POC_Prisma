import { getUserByPhone } from "../repositories/users.repositories.js";
import { insertRentDB } from "../repositories/rents.repositories.js";
import bcrypt from "bcrypt";

export async function insertRent(
  phone: string,
  password: string,
  room: number,
  startDate: Date,
  endDate: Date
) {
  const user = await getUserByPhone(phone);
  if (!user)
    throw {
      type: "error_user_notfound",
      message: "User not found",
    };

  const passwordOk = bcrypt.compareSync(password, user.password);
  if (!passwordOk)
    throw {
      type: "error_user_unauthorized",
      message: "User not autthorized",
    };

  await insertRentDB(user.id, room, startDate, endDate);
}
