import { NextFunction, Request, Response } from 'express';
import { AuthReq } from '../../typings/express';
import { setTokenCookie, requireAuth, restoreUser } from "../../utils/auth";
import { handleValidationErrors } from '../../utils/validation';
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize')
import db from '../../db/models'
import { errors } from '../../typings/errors';
import { NoResourceError } from '../../errors/customErrors';
const { User, UserImage } = db
const { SavedSearch } = require('../../db/models');
const router = require('express').Router();


router.post('/saveSearch', async (req: Request, res: Response, next: NextFunction) => {
    const { name, food,
        minCalories, maxCalories,
        minProtein, maxProtein,
        minCarbs, maxCarbs,
        minFat, maxFat } = req.body;
    const savedSearch = await SavedSearch.create({
        name, food, 
        minCalories, maxCalories, 
        minProtein, maxProtein, 
        minCarbs, maxCarbs, 
        minFat, maxFat
    })
})
