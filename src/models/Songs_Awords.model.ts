import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { IAwards } from "./Awards.model";
import { ISong } from "./Songs.model";

export interface ISongs_awards extends Document {
    son_aw_award: PopulatedDoc<IAwards & Document> //FK
    son_aw_song: PopulatedDoc<ISong & Document> //FK
    son_aw_date: string
}

const Song_awardsSchema: Schema = new Schema({
    son_aw_award: {
        type: Types.ObjectId,
        ref: "Awards",
        required: true
    },
    son_aw_song: {
        type: Types.ObjectId,
        ref: "Songs",
        required: true
    }
}, {
    timestamps: {
        createdAt: "son_aw_date",
        updatedAt: false
    }
})

const Song_awards = mongoose.model<ISongs_awards>("Songs_awards", Song_awardsSchema);
export default Song_awards