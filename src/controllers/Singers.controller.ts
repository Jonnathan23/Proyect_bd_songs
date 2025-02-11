import { Request, Response } from "express";
import Singers from "../models/Singers.model";
import { convertToObject } from "typescript";

export class SingersController {
    static getSingers = async (req: Request, res: Response) => {
        try {
            const singers = await Singers.find()
            res.status(200).send(singers)
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static getSingerById = async (req: Request, res: Response) => {
        try {
            const singer = req.singer
            res.status(200).send(singer)
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static createSinger = async (req: Request, res: Response) => {
        try {
            const singer = new Singers(req.body)
            singer.sin_country = req.country
            singer.sin_genre = req.genre
            await singer.save()

            req.genre.gen_singers.push(singer)
            req.country.coun_singers.push(singer)            
            
            await Promise.allSettled([req.genre.save(), req.country.save()])
            res.status(200).send('Singer created successfully')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static updateSinger = async (req: Request, res: Response) => {
        try {
            const singer = req.singer
            await singer.updateOne(req.body)
            res.status(200).send('Singer updated successfully')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static deleteSinger = async (req: Request, res: Response) => {
        try {
            const singer = req.singer
            await singer.deleteOne()
            res.status(200).send('Singer deleted successfully')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }
}