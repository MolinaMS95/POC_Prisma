import { getUserByPhone } from "../repositories/users.repositories.js";
import { insertRentDB } from "../repositories/rents.repositories.js";
import bcrypt from "bcrypt";
import { UserEntity } from "../protocols/User.js";

export async function insertRent(
  phone: string,
  password: string,
  room: number,
  startDate: Date,
  endDate: Date
) {
  const { rows }: { rows: UserEntity[] } = await getUserByPhone(phone);
  if (rows.length === 0)
    throw {
      type: "error_user_notfound",
      message: "User not found",
    };

  const passwordOk = bcrypt.compareSync(password, rows[0].password);
  if (!passwordOk)
    throw {
      type: "error_user_unauthorized",
      message: "User not autthorized",
    };

  await insertRentDB(rows[0].id, room, startDate, endDate);
}
