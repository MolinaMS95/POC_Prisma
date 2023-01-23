import { Request, Response } from "express";
import { User } from "../protocols/User";
import {
  insertUser,
  getUserHistory,
  alterPassword,
  removeUser,
} from "../services/users.services.js";

export async function registerUser(req: Request, res: Response) {
  const { name, password, phone } = res.locals.user as User;

  try {
    await insertUser(name, phone, password);
    res.sendStatus(201);
  } catch (error) {
    if (error.type === "error_user_exists") {
      return res.status(409).send({ message: error.message });
    }
    res.status(500).send(error.message);
  }
}

export async function getHistory(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const userHistory: {
      id: number;
      name: string;
      phone: string;
      NumberOfRents: number;
      rents: { id: number; room: number; startDate: Date; endDate: Date }[];
    } = await getUserHistory(id);
    res.status(200).send(userHistory);
  } catch (error) {
    if (error.type === "error_user_notfound") {
      return res.status(404).send({ message: error.message });
    }
    res.status(500).send(error.message);
  }
}

export async function changePassword(req: Request, res: Response) {
  const { id } = req.params;
  const { password, newPassword }: { password: string; newPassword: string } =
    req.body;

  try {
    await alterPassword(id, password, newPassword);
    res.sendStatus(200);
  } catch (error) {
    if (error.type === "error_user_notfound") {
      return res.status(404).send({ message: error.message });
    }
    if (error.type === "error_user_unauthorized") {
      return res.status(401).send({ message: error.message });
    }
    res.status(500).send(error.message);
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  const { authorization } = req.headers;

  try {
    await removeUser(id, authorization);
    res.sendStatus(204);
  } catch (error) {
    if (error.type === "error_user_notfound") {
      return res.status(404).send({ message: error.message });
    }
    if (error.type === "error_user_unauthorized") {
      return res.status(401).send({ message: error.message });
    }
    res.status(500).send(error.message);
  }
}
