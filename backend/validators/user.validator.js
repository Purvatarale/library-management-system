import joi from "joi";

export const createUserSchema = joi.object({
  name: joi.string().required().min(3).max(30),
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
