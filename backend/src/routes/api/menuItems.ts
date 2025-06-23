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
const { MenuItem } = db;
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
      const menuItems = await MenuItem.findAll();
      return res.status(200).json(menuItems);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/today",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      router.use(requireAuth);
      const startToday = new Date();
      startToday.setHours(0, 0, 0, 0);
      const endToday = new Date();
      endToday.setHours(23, 59, 59, 999);
      const menuItems = await MenuItem.findAll({
        where: {
          createdAt: { [Op.between]: [startToday, endToday] },
        },
      });
      return res.status(200).json(menuItems);
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
      const { restaurantName, name, imageUrl, calories, carbs, protein, fat } =
        req.body;
      const menuItem = await MenuItem.create({
        restaurantName,
        name,
        imageUrl,
        calories,
        carbs,
        protein,
        fat,
      });
      return res.status(200).json(menuItem);
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/:menuItemId",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      router.use(requireAuth);
      const { restaurantName, name, imageUrl, calories, carbs, protein, fat } =
        req.body;
      // const { menuItemId } = req.params;
      const menuItem = await MenuItem.findByPk(req.params.menuItemId);
      if (!menuItem) {
        return res.status(404).json({ error: "Menu item not found" });
      }
      await menuItem.update({
        restaurantName,
        name,
        imageUrl,
        calories,
        carbs,
        protein,
        fat,
      });
      return res.status(200).json(menuItem);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/:menuItemId",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { menuItemId } = req.params;
      const menuItem = await MenuItem.findByPk(menuItemId);

      if (!menuItem) {
        return res.status(404).json({ message: "Menu item couldn't be found" });
      }
      await menuItem.destroy();
      return res.status(200).json({ message: "Successfully deleted" });
    } catch (e) {
      next(e);
    }
  }
);

export = router;

// router.get(
//   "/favorites",
//   requireAuth,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       router.use(requireAuth);
//       const favoritesMenuItems = await MenuItem.findAll();
//       return res.status(200).json(favoritesMenuItems);
//     } catch (e) {
//       next(e);
//     }
//   }
// );

// router.post(
//   "/favorites",
//   requireAuth,
//   // validateMenuItem,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       router.use(requireAuth);
//       const {
//         restaurantName,
//         menuItemName,
//         imageUrl,
//         calories,
//         carbs,
//         protein,
//         fat,
//       } = req.body;
//       const menuItem = await MenuItem.create({
//         restaurantName,
//         menuItemName,
//         imageUrl,
//         calories,
//         carbs,
//         protein,
//         fat,
//       });
//       return res.status(200).json(menuItem);
//     } catch (e) {
//       next(e);
//     }
//   }
// );

// router.delete(
//   "/favorites/:menuItemId",
//   requireAuth,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { menuItemId } = req.params;
//       const menuItem = await MenuItem.findByPk(menuItemId);

//       if (!menuItem) {
//         return res.status(404).json({ message: "Menu item couldn't be found" });
//       }
//       await menuItem.destroy();
//       return res.status(200).json({ message: "Successfully deleted" });
//     } catch (e) {
//       next(e);
//     }
//   }
// );

// export = router;
