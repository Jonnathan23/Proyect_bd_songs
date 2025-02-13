import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ISong } from "./Songs.model";

export interface ISong_genres extends Document { 
    son_gen_name: string;
    son_gen_songs: PopulatedDoc<ISong & Document>[]
}

const Songs_genresSchema: Schema = new Schema({
    son_gen_name: {
        type: String,
        required: true,
        trim: true
    },
    son_gen_songs: [
        {
            type: Types.ObjectId,
            ref: "Songs",
        }
    ]
}, { timestamps: false })

const Songs_genres = mongoose.model<ISong_genres>("Song_genres", Songs_genresSchema);
export default Songs_genres