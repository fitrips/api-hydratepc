import { validate } from "../validations/validation.js";
import {
  createArtikelValidation,
  updateArtikelValidation,
} from "../validations/artikel-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response-error.js";
import { v4 as uuidv4 } from "uuid";

const create = async (user, request) => {
  const artikel = validate(createArtikelValidation, request);
  artikel.id = uuidv4();

  return prismaClient.artikel.create({
    data: {
      ...artikel,
    },
    select: {
      id: true,
      judul: true,
      poin: true,
      konten: true,
      image_url: true
    },
  });
};

const get = async (user) => {
  const artikel = await prismaClient.artikel.findMany({
    select: {
      id: true,
      judul: true,
      poin: true,
      konten: true,
      image_url: true
    },
  });

  return artikel;
};

const update = async (user, artikelId, request) => {
  const artikelData = validate(updateArtikelValidation, request);

  if (!artikelData) {
    throw new ResponseError(404, "Invalid Artikel Data");
  }

  const existingArtikel = await prismaClient.artikel.findUnique({
    where: {
      id: artikelId,
    },
  });

  if (!existingArtikel) {
    throw new ResponseError(404, "Artikel not found");
  }

  return prismaClient.artikel.update({
    where: {
      id: artikelId,
    },
    data: {
      judul: artikelData.judul,
      poin: artikelData.poin,
      konten: artikelData.konten,
      image_url: artikelData.image_url
    },
    select: {
      id: true,
      judul: true,
      poin: true,
      konten: true,
      image_url: true
    },
  });
};

const remove = async (user, artikelId) => {
  const existingArtikel = await prismaClient.artikel.findUnique({
    where: {
      id: artikelId,
    },
  });

  if (!existingArtikel) {
    throw new ResponseError(404, "Artikel not found");
  }

  await prismaClient.artikel.delete({
    where: {
      id: artikelId,
    },
  });
};

export default {
  create,
  get,
  update,
  remove,
};
