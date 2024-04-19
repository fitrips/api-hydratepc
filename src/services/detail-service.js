import { validate } from "../validations/validation.js";
import { createDetailValidation } from "../validations/detail-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response-error.js";
import { v4 as uuidv4 } from "uuid";

const calculateHydrationNeeded = (berat) => {
  let kebutuhanAir = 0;

  if (berat <= 10) {
    kebutuhanAir = berat * 1000;
  } else if (berat <= 20) {
    kebutuhanAir = 1000 + (berat - 10) * 500;
  } else {
    kebutuhanAir = 1500 + (berat - 20) * 20;
  }

  return kebutuhanAir;
};

const createDetail = async (user, request) => {
  const detail = validate(createDetailValidation, request);
  detail.id = uuidv4();

  if (!detail) {
    throw new ResponseError(400, "Isi semua fields")
  }

  const result = calculateHydrationNeeded(detail.berat_badan);

  return prismaClient.detailUser.create({
    data: {
      ...detail,
      kebutuhanAir: result,
      userId: user.id,
    },
    select: {
      id: true,
      berat_badan: true,
      jenis_kelamin: true,
      cuaca: true,
      kebutuhanAir: true,
    },
  });
};

const get = async (user) => {
  const detail = await prismaClient.detailUser.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      berat_badan: true,
      jenis_kelamin: true,
      cuaca: true,
      kebutuhanAir: true,
    },
  });

  return detail;
};

export default {
  createDetail,
  get
};
