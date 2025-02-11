import { Request, Response } from "express";
import Songs_genres from "../models/Songs_genres.model";

export class Songs_genresController {
    static getSongs_genres = async (req: Request, res: Response) => {
        try {
            const songs_genres = await Songs_genres.find()
            res.status(200).send(songs_genres)
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static creteSong_genre = async (req: Request, res: Response) => {
        try {
            await Songs_genres.create(req.body)
            res.status(200).send('Song genre created successfully')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static updateSong_genreById = async (req: Request, res: Response) => {
        try {
            const song_genre = req.song_genre
            await song_genre.updateOne(req.body)
            res.status(200).send('Song genre updated successfully')
        } catch(error) {
            res.status(500).json({ errors: error })
        }
    }

    static deleteSong_genre = async (req: Request, res: Response) => {
        try {
            const song_genre = req.song_genre
            await song_genre.deleteOne()
            res.status(200).send('Song genre deleted successfully')
        } catch(error) {
            res.status(500).json({ errors: error })
        }
    }
}