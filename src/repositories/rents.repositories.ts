import { connection } from "../database/db.js";

export function insertRentDB(
  user_id: number,
  room: number,
  startDate: Date,
  endDate: Date
) {
  return connection.query(
    `INSERT INTO rents (user_id, room, "startDate", "endDate") VALUES ($1, $2, $3, $4);`,
    [user_id, room, startDate, endDate]
  );
}

export function deleteUserRentals(id: string) {
  return connection.query("DELETE FROM rents WHERE user_id=$1;", [id]);
}
