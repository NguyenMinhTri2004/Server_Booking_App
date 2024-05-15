import mongoose, { ObjectIdExpression } from 'mongoose';
import nanoid from '../libraries/mongoose-nanoid'


export interface INotify extends mongoose.Document {
    notifyId: string,
    recipients : [string],
    url: string,
    text : string,
    content : string,
    media : [string],
    isRead : boolean,
    created_at: string,
    updated_at: string,
}

const Schema = mongoose.Schema;

const notifySchema = new Schema<INotify>({

    notifyId : {
        type: String,
        require: true,
    },

    recipients : {
        type : [String],
        require: false,
    },

    url : {
        type: String,
        require: true,
    },

    text : {
        type: String,
        require: true,
    },

    content : {
        type: String,
        require: true,
    },

    media : {
        type : [String],
        require: false,
    },

    isRead : {
        type : Boolean,
        default : false
    }

} , {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'Notifys',

})


notifySchema.plugin(nanoid, {
    length: 12,
    charset: '0123456789',
    fieldName: 'notifyId',
});

export default mongoose.model('Notify', notifySchema);