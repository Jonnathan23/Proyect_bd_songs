import { Request, Response } from "express";
import Playbacks from "../models/Playbacks.model";

export class PlaybacksController {

    static getPlaybacks = async (req: Request, res: Response) => {
        try {
            const playbacks = await Playbacks.find()
            res.status(200).send(playbacks)
        } catch(error) {
            res.status(500).json({ errors: error })
        }
    }

    static deletePlayback = async (req: Request, res: Response) => {
        try {
            const playback = req.playback
            await playback.deleteOne()
            res.status(200).send('Playback deleted successfully')
        } catch(error) {
            res.status(500).json({ errors: error })
        }
    }
}
