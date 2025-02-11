import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ISinger } from "./Singers.model";

export interface ICountry extends Document {
    coun_name: string;
    coun_singers: PopulatedDoc<ISinger & Document>[]
}

const CountriesSchema: Schema = new Schema({
    coun_name: {
        type: String,
        required: true,
        trim: true
    },
    coun_singers: [
        {
            type: Types.ObjectId,
            ref: "Singers",            
        }
    ]

},{ timestamps: false })

const Countries = mongoose.model<ICountry>("Countries", CountriesSchema);
export default Countries