import { NextFunction, Request, Response } from "express";
import { AuthReq } from "../../typings/express";
import { setTokenCookie, requireAuth, restoreUser } from "../../utils/auth";
import { handleValidationErrors } from "../../utils/validation";
const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
import db from "../../db/models";
import { errors } from "../../typings/errors";
import { NoResourceError } from "../../errors/customErrors";
import { resourceLimits } from "worker_threads";
const { History } = db;
const router = require("express").Router();

const validateMenuItem = [
  // check("name").notEmpty().withMessage("Name is required."),
  // check("minCalories").isInt().withMessage("minCalories must be an integer."),
  // check("maxCalories").isInt().withMessage("maxCalories must be an integer."),
  // check("minProtein").isInt().withMessage("minProtein must be an integer."),
  // check("maxProtein").isInt().withMessage("maxProtein must be an integer."),
  // check("minCarbs").isInt().withMessage("minCarbs must be an integer."),
  // check("maxCarbs").isInt().withMessage("maxCarbs must be an integer."),
  // check("minFat").isInt().withMessage("minFat must be an integer."),
  // check("maxFat").isInt().withMessage("maxFat must be an integer."),
];

router.get(
  "/",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      router.use(requireAuth);
      const historyLog = await History.findAll();
      return res.status(200).json(historyLog);
    } catch (e) {
      next(e);
    }
  }
);

// router.get(
//   "/today",
//   requireAuth,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       router.use(requireAuth);
//       const startToday = new Date();
//       startToday.setHours(0, 0, 0, 0);
//       const endToday = new Date();
//       endToday.setHours(23, 59, 59, 999);
//       const menuItems = await MenuItem.findAll({
//         where: {
//           createdAt: { [Op.between]: [startToday, endToday] },
//         },
//       });
//       return res.status(200).json(menuItems);
//     } catch (e) {
//       next(e);
//     }
//   }
// );

router.post(
  "/",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      router.use(requireAuth);
      const { calories, carbs, protein, fat, food } = req.body;
      const historyLog = await History.create({
        calories,
        carbs,
        protein,
        fat,
        food,
      });
      return res.status(200).json(historyLog);
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/:historyLogId",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      router.use(requireAuth);
      const { calories, carbs, protein, fat, food } = req.body;
      const historyLog = await History.findByPk(req.params.historyLogId);
      if (!historyLog) {
        return res.status(404).json({ error: "History log not found" });
      }
      await historyLog.update({
        calories,
        carbs,
        protein,
        fat,
        food,
      });
      return res.status(200).json(historyLog);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/:historyLogId",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { historyLogId } = req.params;
      const historyLog = await History.findByPk(historyLogId);

      if (!historyLog) {
        return res
          .status(404)
          .json({ message: "History log couldn't be found" });
      }
      await historyLog.destroy();
      return res.status(200).json({ message: "Successfully deleted" });
    } catch (e) {
      next(e);
    }
  }
);

export = router;
