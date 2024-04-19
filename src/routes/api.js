import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import artikelController from "../controllers/artikel-controller.js";
import userController from "../controllers/user-controller.js";
import detailController from "../controllers/detail-controller.js";

const userRouter = new  express.Router();
userRouter.use(authMiddleware);
userRouter.post("/api/artikel", artikelController.createArtikel);
userRouter.get("/api/artikel", artikelController.getArtikel);
userRouter.put("/api/artikel/:artikelId", artikelController.updateArtikel);
userRouter.delete("/api/artikel/:artikelId", artikelController.removeArtikel);

userRouter.get("/api/users/current", userController.get);
userRouter.delete("/api/users/logout", userController.logout);

userRouter.post("/api/question", detailController.create);
userRouter.get("/api/question", detailController.get);

export { userRouter }; 