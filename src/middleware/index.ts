import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import Countries, { ICountry } from "../models/Countries.model";
import Genres, { IGenre } from "../models/Genres.model";
import Singers, { ISinger } from "../models/Singers.model";
import { readConfigFile } from "typescript";
import Awards, { IAwards } from "../models/Awards.model";

declare global {
    namespace Express {
        interface Request {
            country: ICountry
            genre: IGenre
            singer: ISinger
            award: IAwards

        }
    }
}

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return
    }

    next();
}


export const countryExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { country_id } = req.params
        const findCountry = await Countries.findById(country_id)
        if (!findCountry) {
            res.status(404).send('Country not found')
            return
        }
        req.country = findCountry
        next()
    } catch (error) {
        res.status(500).json({ errors: error })
    }
}

export const genreExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { genre_id } = req.params
        const findGenre = await Genres.findById(genre_id)
        if (!findGenre) {
            res.status(404).send('Genre not found')
            return
        }
        req.genre = findGenre
        next()
    } catch (error) {
        res.status(500).json({ errors: error })
    }
}

export const singerExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { singer_id } = req.params
        const findSinger = await Singers.findById(singer_id)
        if (!findSinger) {
            res.status(404).send('Singer not found')
            return
        }
        req.singer = findSinger
        next()
    } catch (error) {
        res.status(500).json({ errors: error })
    }
}

export const awardExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { award_id } = req.params
        const findAward = await Awards.findById(award_id)
        if (!findAward) {
            res.status(404).send('Award not found')
            return
        }
        req.award = findAward
        next()
    } catch (error) {
        res.status(500).json({ errors: error })
    }
}