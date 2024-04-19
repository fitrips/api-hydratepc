import Joi from "joi";

const createDetailValidation = Joi.object({
  berat_badan: Joi.number().required(),
  jenis_kelamin: Joi.string().required(),
  cuaca: Joi.string().required(),
});

export { createDetailValidation };