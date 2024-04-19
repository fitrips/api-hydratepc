import Joi from "joi";

const createArtikelValidation = Joi.object({
  judul: Joi.string().max(100).required(),
  poin: Joi.string().max(100).required(),
  konten: Joi.string().max(150).required(),
  image_url: Joi.string().max(255).required(),
});

const getArtikelValidation = Joi.string().required();

const updateArtikelValidation = Joi.object({
  judul: Joi.string().max(100).required(),
  poin: Joi.string().max(100).required(),
  konten: Joi.string().max(150).required(),
  image_url: Joi.string().max(255).required(),
});

export {
  createArtikelValidation,
  getArtikelValidation,
  updateArtikelValidation,
};