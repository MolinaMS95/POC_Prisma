import joi from "joi";
import { Rent } from "../protocols/Rent";

export const rentSchema: joi.ObjectSchema<Rent> = joi.object({
  phone: joi
    .string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  password: joi.string().required(),
  room: joi.number().min(1).max(4).required(),
  startDate: joi.date().required(),
  endDate: joi.date().greater(joi.ref("startDate")).required(),
});
