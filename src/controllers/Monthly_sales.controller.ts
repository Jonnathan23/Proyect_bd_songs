import { Request, Response } from "express";
import Monthly_sales from "../models/Monthly_sales.model";
import Playbacks from "../models/Playbacks.model";
import { getDaysMonth } from "../utils/utils";

export class Monthly_salesController {

    static getMonthly_sales = async (req: Request, res: Response) => {
        try {
            const monthly_sales = await Monthly_sales.find()
            res.status(200).send(monthly_sales)
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static getMonthly_salesById = async (req: Request, res: Response) => {
        try {
            const monthly_sales = req.monthly_sales
            res.status(200).send(monthly_sales)
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }


    static createMonthly_sales = async (req: Request, res: Response) => {
        try {
            const { mont_date, mont_unit_payment } = req.body
            const { startDate, endDate } = getDaysMonth(mont_date)
            const song = req.song
            
            const mont_total_playbacks = await Playbacks.countDocuments({
                play_date: { $gte: startDate, $lte: endDate },
                play_song: song._id
            })

            const mont_collected = mont_total_playbacks * mont_unit_payment           

            const existingRecord = await Monthly_sales.findOne({ song, mont_date: startDate });
            if (existingRecord) {
                res.status(400).json({ message: "Ya existe un registro de ventas para este mes y esta canción." });
                return
            }

            const monthly_sales = new Monthly_sales({
                mont_collected,
                mont_date,
                mont_song: song._id,
                mont_unit_payment,
                mont_total_playbacks
            })

            await monthly_sales.save()

            song.son_month_sales.push(monthly_sales)
            await song.save()
            res.status(200).send('Monthly sales created successfully')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }
}