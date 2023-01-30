import prisma from "../database/db.js";

export function getUserByPhone(phone: string) {
  return prisma.users.findFirst({ where: { phone } });
}

export function insertUserDB(
  name: string,
  phone: string,
  hashPassword: string
) {
  return prisma.users.create({
    data: { name, phone, password: hashPassword },
  });
}

export function getUserById(id: number) {
  return prisma.users.findFirst({ where: { id } });
}

export function getRentalsByUser(id: number) {
  return prisma.users.findFirst({
    where: { id },
    include: { _count: { select: { rents: true } }, rents: true },
  });
}

export function updatePassword(id: number, newPassword: string) {
  return prisma.users.update({
    where: { id },
    data: { password: newPassword },
  });
}

export function deleteUserDB(id: number) {
  return prisma.users.delete({
    where: { id },
  });
}
