import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ISinger } from "./Singers.model";

export interface IGenre extends Document {
    gen_name: string
    gen_singers: PopulatedDoc<ISinger & Document>[]
}

const GenresSchema: Schema = new Schema({
    gen_name: {
        type: String,
        required: true,
        trim: true
    },
    gen_singers: [
        {
            type: Types.ObjectId,
            ref: "Singers",
        }
    ]
}, { timestamps: false })

const Genres = mongoose.model<IGenre>("Genres", GenresSchema);
export default Genres