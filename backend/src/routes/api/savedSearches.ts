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
const { User, UserImage, SavedSearch } = db;
const router = require("express").Router();

const validateSavedSearch = [
  check("name").notEmpty().withMessage("Name is required."),
  check("minCalories").isInt().withMessage("minCalories must be an integer."),
  check("maxCalories").isInt().withMessage("maxCalories must be an integer."),
  check("minProtein").isInt().withMessage("minProtein must be an integer."),
  check("maxProtein").isInt().withMessage("maxProtein must be an integer."),
  check("minCarbs").isInt().withMessage("minCarbs must be an integer."),
  check("maxCarbs").isInt().withMessage("maxCarbs must be an integer."),
  check("minFat").isInt().withMessage("minFat must be an integer."),
  check("maxFat").isInt().withMessage("maxFat must be an integer."),
];

router.get(
  "/",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      router.use(requireAuth);
      const savedSearches = await SavedSearch.findAll();
      return res.status(200).json(savedSearches);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/",
  requireAuth,
  validateSavedSearch,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      router.use(requireAuth);
      const {
        name,
        food,
        minCalories,
        maxCalories,
        minProtein,
        maxProtein,
        minCarbs,
        maxCarbs,
        minFat,
        maxFat,
      } = req.body;
      const savedSearch = await SavedSearch.create({
        name,
        food,
        minCalories,
        maxCalories,
        minProtein,
        maxProtein,
        minCarbs,
        maxCarbs,
        minFat,
        maxFat,
      });
      return res.status(200).json(savedSearch);
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/:savedSearchId",
  requireAuth,
  validateSavedSearch,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      router.use(requireAuth);
      const {
        name,
        food,
        minCalories,
        maxCalories,
        minProtein,
        maxProtein,
        minCarbs,
        maxCarbs,
        minFat,
        maxFat,
      } = req.body;

      const savedSearch = await SavedSearch.findByPk(req.params.savedSearchId);

      if (!savedSearch) {
        return res.status(404).json({ error: "Saved search not found" });
      }

      await savedSearch.update({
        name,
        food,
        minCalories,
        maxCalories,
        minProtein,
        maxProtein,
        minCarbs,
        maxCarbs,
        minFat,
        maxFat,
      });

      return res.status(200).json(savedSearch);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/:savedSearchId",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { savedSearchId } = req.params;
      const savedSearch = await SavedSearch.findByPk(savedSearchId);

      if (!savedSearch) {
        return res
          .status(404)
          .json({ message: "Saved search couldn't be found" });
      }
      await savedSearch.destroy();
      return res.status(200).json({ message: "Successfully deleted" });
    } catch (e) {
      next(e);
    }
  }
);

export = router;
