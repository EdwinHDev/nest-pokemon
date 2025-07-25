import * as Joi from "joi";

export const JoiValidationSchema = Joi.object({
  MONGO_URI: Joi.required(),
  PORT: Joi.number().default(4500),
  DEFAULT_LIMIT: Joi.number().default(10),
})