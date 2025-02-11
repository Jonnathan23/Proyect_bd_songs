import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ISong_genres } from "./Songs_genres.model";
import { ISinger } from "./Singers.model";
import { IAwards } from "./Awards.model";
import { IMonthly_sales } from "./Monthly_sales.model";
import { IPlaybacks } from "./Playbacks.model";

export interface ISong {
    son_name: string;
    son_release_date: string;

    son_genre: PopulatedDoc<ISong_genres & Document>; //FK
    son_singer: PopulatedDoc<ISinger & Document>;//FK

    son_awards: PopulatedDoc<IAwards & Document>[]; //Lists
    son_month_sales: PopulatedDoc<IMonthly_sales & Document>[] //Lists
    son_playbacks: PopulatedDoc<IPlaybacks & Document>[] //Lists
}

const SongsSchema: Schema = new Schema({
    son_name: {
        type: String,
        required: true,
        trim: true
    },
    son_release_date: {
        type: String,
        required: true,
        trim: true
    },
    son_genre: {
        type: Types.ObjectId,
        ref: "Song_genres",
        required: true
    },
    son_singer: {
        type: Types.ObjectId,
        ref: "Singers",
        required: true
    },
    son_awards: [
        {
            type: Types.ObjectId,
            ref: "Awards",
        }
    ],
    son_month_sales: [
        {
            type: Types.ObjectId,
            ref: "Monthly_sales",
        }
    ],
    son_playbacks: [
        {
            type: Types.ObjectId,
            ref: "Playbacks",
        }
    ]
}, { timestamps: false })

const Songs = mongoose.model<ISong>("Songs", SongsSchema);
export default Songs