import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ISong } from "./Songs.model";

export interface IMonthly_sales extends Document {
    mont_collected: number,
    mont_date: string
    mont_unit_payment: number
    mont_song: PopulatedDoc<ISong & Document> //FK
}

const Monthly_salesSchema: Schema = new Schema({
    mont_collected: {
        type: Number,
        required: true,
        trim: true
    },
    mont_song: {
        type: Types.ObjectId,
        ref: "Songs",
        required: true
    },
    mont_unit_payment: {
        type: Number,
        required: true,
        trim: true
    },
    mont_total_playbacks: {
        type: Number,
        required: true,
        trim: true
    }
}, {
    timestamps: {
        createdAt: "mont_date",
        updatedAt: false
    }
})

const Monthly_sales = mongoose.model<IMonthly_sales>("Monthly_sales", Monthly_salesSchema);
export default Monthly_sales