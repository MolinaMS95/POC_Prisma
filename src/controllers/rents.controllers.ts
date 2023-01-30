import { Request, Response } from "express";
import { Rent } from "../protocols/Rent";
import { insertRent } from "../services/rents.services.js";

export async function rentRoom(req: Request, res: Response) {
  const { phone, password, room, startDate, endDate } = res.locals.rent as Rent;

  try {
    await insertRent(phone, password, room, new Date(startDate), new Date(endDate));
    res.sendStatus(201);
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