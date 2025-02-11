import { Request, Response } from "express"
import Songs from "../models/Songs.model"
import { convertToObject } from "typescript"
import Monthly_sales from "../models/Monthly_sales.model"

export class SongsController {

    static getSongs = async (req: Request, res: Response) => {
        try {
            const songs = await Songs.find()
            res.status(200).send(songs)
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static getSongById = async (req: Request, res: Response) => {
        try {
            const song = req.song
            res.status(200).send(song)
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    /**
     * @description Get songs by genre
     * @param req 
     * @param res 
     */
    static getSongsByGenre = async (req: Request, res: Response) => {
        try {
            const genre = req.song_genre
            const songs = await Songs.find({ son_genre: genre })

            res.status(200).json({ Canciones_por_genero: { genero: genre.son_gen_name, songs } })
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    /**
     * @description Get songs by release date
     * @param req 
     * @param res 
     * @returns 
     */
    static getSongReleaseDate = async (req: Request, res: Response) => {
        try {
            const { startDate, endDate } = req.params;
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);

            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);

            const songs = await Songs.find({
                $expr: {
                    $and: [
                        { $gte: [{ $dateFromString: { dateString: "$son_release_date" } }, start] },
                        { $lte: [{ $dateFromString: { dateString: "$son_release_date" } }, end] }
                    ]
                }
            });

            if (songs.length === 0) {
                res.status(200).json({ data: { message: "No songs found", songs } });
                return;
            }

            res.status(200).json({ Canciones_por_periodo_de_tiempo: songs });

        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    /**
     * @description Get songs by singer
     * @param req 
     * @param res 
     */
    static getSongsBySinger = async (req: Request, res: Response) => {
        try {
            const singer = req.singer
            const songs = await Songs.find({ son_singer: singer })

            res.status(200).json({ Canciones_por_artista: { artista: singer.sin_name, songs } })
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    /**
     * @description Get songs by increased collection
     * @param req 
     * @param res 
     * @returns 
     */
    static getSongByIncreasedCollection = async (req: Request, res: Response) => {
        try {
            // Obtener las canciones ordenadas por mayor recaudación
            const increasedCollections = await Monthly_sales.find()
                .sort({ mont_collected: -1 })
                .limit(3)
                .populate("mont_song", "son_name")
                .select("-__v -mont_date");

            if (increasedCollections.length === 0) {
                res.status(200).json({ message: "No songs found with collection data", increasedCollections });
                return
            }

            const songsDailts = increasedCollections.map((collection) => ({
                song_id: collection.mont_song._id.toString(),
                song_collection: collection.mont_collected,
                song_unit_payment: collection.mont_unit_payment
            }));

            const songIds = songsDailts.map(song => song.song_id);
            const songs = await Songs.find({ _id: { $in: songIds } })
                .populate("son_genre", "son_gen_name")
                .populate("son_singer", "sin_name")
                .select("-__v -son_month_sales -son_playbacks -son_awards");

            const songsMap = new Map(songs.map(song => [song._id.toString(), song.toObject()]));

            const mergedSongs = songsDailts.map(detail => ({
                ...songsMap.get(detail.song_id), // Obtener el objeto `song` correcto
                ...detail // Agregar detalles de recaudación
            }));


            res.status(200).json({ Canciones_con_mayor_recaudación: mergedSongs });

        } catch (error) {
            console.error(error);
            res.status(500).json({ errors: error.message });
        }
    };



    static updateSong = async (req: Request, res: Response) => {
        try {
            const song = req.song
            await song.updateOne(req.body)
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static createSong = async (req: Request, res: Response) => {
        try {
            const song = new Songs(req.body)
            song.son_singer = req.singer
            song.son_genre = req.song_genre
            await song.save()

            req.song_genre.son_gen_songs.push(song)
            req.singer.sin_songs.push(song)
            await Promise.allSettled([req.song_genre.save(), req.singer.save()])

            res.status(200).send('Song created successfully')
        } catch (error) {
            console.log(error)
            res.status(500).json({ errors: error })
        }
    }

    static deleteSong = async (req: Request, res: Response) => {
        try {
            const song = req.song
            await song.deleteOne()
            res.status(200).send('Song deleted successfully')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }
}