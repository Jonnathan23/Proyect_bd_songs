import mongoose, { Schema, Document, PopulatedDoc, Types,  } from "mongoose";
import { ICountry } from "./Countries.model";
import { IGenre } from "./Genres.model";
import { ISong } from "./Songs.model";

export interface ISinger extends Document {
    sin_name: string
    sin_date_birth: string
    sin_country: PopulatedDoc<ICountry & Document> // FK
    sin_genre: PopulatedDoc<IGenre & Document> // FK
    sin_songs: PopulatedDoc<ISong & Document>[] //List
}

const SingersSchema: Schema = new Schema({
    sin_name: {
        type: String,
        required: true,
        trim: true
    },
    sin_date_birth: {
        type: String,
        required: true,
        trim: true
    },
    sin_country: {
        type: Types.ObjectId,
        ref: "Countries",
        required: true
    },
    sin_genre: {
        type: Types.ObjectId,
        ref: "Genres",
        required: true
    },
    sin_songs: [
        {
            type: Types.ObjectId,
            ref: "Songs",
        }
    ]
}, { timestamps: false })

const Singers = mongoose.model<ISinger>("Singers", SingersSchema);
export default Singers