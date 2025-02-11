import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import Countries, { ICountry } from "../models/Countries.model";
import Genres, { IGenre } from "../models/Genres.model";
import Singers, { ISinger } from "../models/Singers.model";
import Awards, { IAwards } from "../models/Awards.model";
import Songs_genres, { ISong_genres } from "../models/Songs_genres.model";
import Songs, { ISong } from "../models/Songs.model";
import Playbacks, { IPlaybacks } from "../models/Playbacks.model";
import Monthly_sales, { IMonthly_sales } from "../models/Monthly_sales.model";
import Song_awards, { ISongs_awards } from "../models/Songs_Awords.model";

declare global {
    namespace Express {
        interface Request {
            country: ICountry
            genre: IGenre
            singer: ISinger
            award: IAwards
            song_genre: ISong_genres
            song: ISong
            playback: IPlaybacks
            monthly_sales: IMonthly_sales
            song_award: ISongs_awards
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

export const song_genreExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { song_genre_id } = req.params
        const findSong_genre = await Songs_genres.findById(song_genre_id)
        if (!findSong_genre) {
            res.status(404).send('Song genre not found')
            return
        }
        req.song_genre = findSong_genre
        next()
    } catch (error) {
        res.status(500).json({ errors: error })
    }
}

export const songExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { song_id } = req.params
        const findSong = await Songs.findById(song_id)
        if (!findSong) {
            res.status(404).send('Song not found')
            return
        }
        req.song = findSong
        next()
    } catch (error) {
        res.status(500).json({ errors: error })
    }
}

export const playbackExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { playback_id } = req.params
        const findPlayback = await Playbacks.findById(playback_id)
        if (!findPlayback) {
            res.status(404).send('Playback not found')
            return
        }
        req.playback = findPlayback
        next()

    } catch (error) {
        res.status(500).json({ errors: error })
    }
}

export const monthly_salesExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { monthly_sales_id } = req.params
        const findMonthly_sales = await Monthly_sales.findById(monthly_sales_id)
        if (!findMonthly_sales) {
            res.status(404).send('Monthly sales not found')
            return
        }
        req.monthly_sales = findMonthly_sales
        next()
    } catch (error) {
        res.status(500).json({ errors: error })
    }
}

export const song_awardExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { song_award_id } = req.params
        const findSong_award = await Song_awards.findById(song_award_id)
        if (!findSong_award) {
            res.status(404).send('Song award not found')
            return
        }
        req.song_award = findSong_award
        next()
    } catch (error) {
        res.status(500).json({ errors: error })
    }
}