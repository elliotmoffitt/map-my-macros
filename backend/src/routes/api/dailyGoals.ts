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
const { DailyGoals } = db;
const router = require("express").Router();

// const validateDailyGoals = [
//   check("caloriesDaily").notEmpty.withMessage("Calories is required"),
//   check("proteinDaily").notEmpty.withMessage("Protein is required"),
//   check("carbsDaily").notEmpty.withMessage("Carbs is required"),
//   check("fatDaily").notEmpty.withMessage("Fat is required"),
// ];

router.get(
  "/",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      router.use(requireAuth);
      const dailyGoals = await DailyGoals.findAll();
      return res.status(200).json(dailyGoals);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      router.use(requireAuth);
      const { caloriesDaily, proteinDaily, carbsDaily, fatDaily } = req.body;
      const dailyGoals = await DailyGoals.create({
        caloriesDaily,
        proteinDaily,
        carbsDaily,
        fatDaily,
      });
      return res.status(200).json(dailyGoals);
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/:dailyGoalId",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      router.use(requireAuth);
      const {
        caloriesDaily,
        proteinDaily,
        carbsDaily,
        fatDaily,
        caloriesToday,
        proteinToday,
        carbsToday,
        fatToday,
      } = req.body;
      const dailyGoal = await DailyGoals.findByPk(req.params.dailyGoalId);
      if (!dailyGoal) {
        return res.status(404).json({ error: "Daily goal not found" });
      }
      await dailyGoal.update({
        caloriesDaily,
        proteinDaily,
        carbsDaily,
        fatDaily,
        caloriesToday,
        proteinToday,
        carbsToday,
        fatToday,
      });
      return res.status(200).json(dailyGoal);
    } catch (e) {
      next(e);
    }
  }
);

export = router;
