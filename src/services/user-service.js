import { validate } from "../validations/validation.js";
import {
  loginUserValidation,
  registerUserValidation,
} from "../validations/user-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken"

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Email already exists");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      id: true,
      email: true,
      username: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findFirst({
    where: {
      email: loginRequest.email,
    },
    
    select: {
      id: true,
      email: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Username or password wrong");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError(401, "Username or password wrong");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_KEY_SECRET , {expiresIn: '10h'});   
  return prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      id: user.id,
    },
    select: {
      id: true,
      email: true,
      token: true,
    },
  });
};

const get = async (id) => {
  const validatedId = String(id.id);
  console.log(id);

  const user = await prismaClient.user.findUnique({
    where: {
      id: validatedId,
    },
    select: {
      id: true,
      email: true,
      username: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  return user;
};

const logout = async (userId) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  return prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      token: null,
    },
    select: {
      id: true,
    },
  });
};



export default {
  register,
  login,
  get,
  logout,
};
