import { Request, Response } from "express";
import Genres from "../models/Genres.model";

export class GenresController {
    static getGenres = async (req: Request, res: Response) => {
        try {
            const genres = await Genres.find()
            res.status(200).send(genres)
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static createGenre = async (req: Request, res: Response) => {
        try {
            const genre = await Genres.create(req.body)
            res.status(200).send('Genre created successfully')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static updateGenreById = async (req: Request, res: Response) => {
        try {
            const genre = req.genre
            await genre.updateOne(req.body)
            res.status(200).send('Genre updated successfully')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static deleteGenre = async (req: Request, res: Response) => {
        try {
           const genre = req.genre
            await genre.deleteOne();
            res.status(200).send('Genre deleted successfully')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }
}