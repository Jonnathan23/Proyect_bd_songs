import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ISong } from "./Songs.model";

export interface IAwards extends Document {
    aw_name: string;
    aw_songs: PopulatedDoc<ISong & Document>[] //Lists
}

const AwardsSchema: Schema = new Schema({
    aw_name: {
        type: String,
        required: true,
        trim: true
    },
    aw_songs: [
        {
            type: Types.ObjectId,
            ref: "Songs",
        }
    ]

}, { timestamps: true })

const Awards = mongoose.model<IAwards>("Awards", AwardsSchema);
export default Awards