import detailService from "../services/detail-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await detailService.createDetail(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
    try {
      const user = req.user;
      const result = await detailService.get(user);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  };

export default {
  create,
  get
};