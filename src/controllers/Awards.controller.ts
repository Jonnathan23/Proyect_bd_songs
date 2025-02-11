import { Request, Response } from "express";
import Awards from "../models/Awards.model";

export class AwardsController {
    
    static getAwards = async (req: Request, res: Response) => {
        try {
            const awards = await Awards.find()
            res.status(200).send(awards)
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static createAward = async (req: Request, res: Response) => {
        try {
            const award = await Awards.create(req.body)
            res.status(200).send('Award created successfully')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static updateAward = async (req: Request, res: Response) => {
        try {
            const award = req.award
            await award.updateOne(req.body)
            res.status(200).send('Award updated successfully')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static deleteAward = async (req: Request, res: Response) => {
        try {
            const award = req.award
            await award.deleteOne()
            res.status(200).send('Award deleted successfully')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }
}