import joi from "joi";
import { User } from "../protocols/User";

export const userSchema: joi.ObjectSchema<User> = joi.object({
  name: joi.string().required().min(3),
  password: joi.string().required(),
  phone: joi
    .string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
});
