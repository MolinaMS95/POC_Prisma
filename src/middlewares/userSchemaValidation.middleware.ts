import { userSchema } from "../models/user.model.js";
import { NextFunction, Request, Response } from "express";
import { User } from "../protocols/User.js";

export function userSchemaValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.body as User;

  const { error } = userSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  res.locals.user = user;

  next();
}
