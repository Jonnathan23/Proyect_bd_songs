import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ISong } from "./Songs.model";

export interface IPlaybacks extends Document {
    play_timestamp: string
    play_date: string
    play_song: PopulatedDoc<ISong & Document> //FK
}

const PlaybacksSchema: Schema = new Schema({
    play_timestamp: {
        type: String,
        required: true,
        trim: true
    },
    play_song: {
        type: Types.ObjectId,
        ref: "Songs",
        required: true
    }
}, {
    timestamps: {
        createdAt: "play_date",
        updatedAt: false
    }
})

const Playbacks = mongoose.model<IPlaybacks>("Playbacks", PlaybacksSchema);
export default Playbacks