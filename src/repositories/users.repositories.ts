import { connection } from "../database/db.js";

export function getUserByPhone(phone: string) {
  return connection.query("SELECT * FROM users WHERE phone=$1;", [phone]);
}

export function insertUserDB(
  name: string,
  phone: string,
  hashPassword: string
) {
  return connection.query(
    "INSERT INTO users (name, phone, password) VALUES ($1, $2, $3);",
    [name, phone, hashPassword]
  );
}

export function getUserById(id: string) {
  return connection.query("SELECT * FROM users WHERE id=$1;", [id]);
}

export function getRentalsByUser(id: string) {
  return connection.query(
    `SELECT users.id, users.name, users.phone, COUNT(rents.id) AS "NumberOfRents",
            JSON_AGG(JSON_BUILD_OBJECT('id', rents.id,
                                       'room', rents.room,
                                       'startDate', rents."startDate",
                                       'endDate', rents."endDate")) AS rents
    FROM users LEFT JOIN rents ON users.id = rents.user_id
    WHERE users.id = $1
    GROUP BY users.id;`,
    [id]
  );
}

export function updatePassword(id: string, newPassword: string) {
  return connection.query("UPDATE users SET password=$1 WHERE id=$2;", [
    newPassword,
    id,
  ]);
}

export function deleteUserDB(id: string) {
  return connection.query("DELETE FROM users WHERE id=$1;", [id]);
}
