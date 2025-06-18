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

const validateDailyGoals = [
  check("calories").notEmpty.withMessage("Calories is required"),
  check("protein").notEmpty.withMessage("Protein is required"),
  check("carbs").notEmpty.withMessage("Carbs is required"),
  check("fat").notEmpty.withMessage("Fat is required"),
];

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
  validateDailyGoals,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      router.use(requireAuth);
      const { calories, protein, carbs, fat } = req.body;
      const dailyGoals = await DailyGoals.create({
        calories,
        protein,
        carbs,
        fat,
      });
      return res.status(200).json(dailyGoals);
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/",
  requireAuth,
  validateDailyGoals,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      router.use(requireAuth);
      const { calories, protein, carbs, fat } = req.body;
      const dailyGoals = await DailyGoals.create({
        calories,
        protein,
        carbs,
        fat,
      });
      return res.status(200).json(dailyGoals);
    } catch (e) {
      next(e);
    }
  }
);
