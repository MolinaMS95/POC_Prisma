import { rentSchema } from "../models/rent.model.js";
import { NextFunction, Request, Response } from "express";
import { Rent } from "../protocols/Rent.js";

export function rentSchemaValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const rent = req.body as Rent;
  
    const { error } = rentSchema.validate(rent, { abortEarly: false });
  
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
  
    res.locals.rent = rent;
  
    next();
  }