import artikelService from "../services/artikel-service.js";
import { logger } from "../application/logging.js";

const createArtikel = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await artikelService.create(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getArtikel = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await artikelService.get(user);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateArtikel = async (req, res, next) => {
  try {
    const user = req.user;
    const artikelId = req.params.artikelId;
    const request = req.body;

    const result = await artikelService.update(user, artikelId, request); 
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const removeArtikel = async (req, res, next) => {
    try {
      const user = req.user;
      const artikelId = req.params.artikelId;
  
      await artikelService.remove(user, artikelId);
      res.status(200).json({
        data: "Berhasil Menghapus",
      });
    } catch (e) {
      next(e);
    }
  };

export default {
  createArtikel,
  getArtikel,
  updateArtikel,
  removeArtikel
};
