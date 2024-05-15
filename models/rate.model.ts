import mongoose, { ObjectIdExpression } from 'mongoose';
import nanoid from '../libraries/mongoose-nanoid'

export interface IRate extends mongoose.Document {
    ratetId: string,
    start: number,
    user : string,
    accomodation : string,
    comment : string,
    created_at: string,
    updated_at: string,
}

const Schema = mongoose.Schema;

const rateSchema = new Schema<IRate>(
    {
      
        ratetId : {
            type: String,
            required: true,
        },
        start : {
            type: Number,
            required: true,
        },
        user : {
            type: String,
            ref : 'User',
            required: true,
        },
        accomodation : {
            type: String,
            ref : 'Commodation',
            required: true,
        },
        comment : {
            type: String,
            ref : 'Commodation',
            required: false,
        }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        collection: 'Rates',
    }
)

rateSchema.plugin(nanoid, {
    length: 12,
    charset: '0123456789',
    fieldName: 'ratetId',
});

export default mongoose.model('Rate', rateSchema);