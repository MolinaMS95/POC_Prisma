import prisma from "../database/db.js";

export function insertRentDB(
  user_id: number,
  room: number,
  startDate: Date,
  endDate: Date
) {
  return prisma.rents.create({
    data: { user_id, room, startDate, endDate },
  });
}
