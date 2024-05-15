import mongoose, { ObjectIdExpression } from 'mongoose';
import nanoid from '../libraries/mongoose-nanoid'

export interface IComment extends mongoose.Document {
    commentId: string,
    content: string,
    tag : Object,
    reply : string,
    emotios : [],
    user : string,
    media : [string],
    accomodation : string,
    created_at: string,
    updated_at: string,
}

const Schema = mongoose.Schema;

const commentSchema = new Schema<IComment>(
    {
        commentId : {
            type : String,
            required : true,
        },

        content : {
            type :  String,
            required : true,
        },

        tag : {
            type : Object,
            required : true,
        },

        reply : {
            type : String,
            required : true,
        },

        emotios : {
            type : [],
            required : true,
        },

        user : {
            type : String,
            ref : "User",
            required : true,
        },

        media : {
            type : [String],
            required : false,
        },

        accomodation : {
            type : String,
            ref : "Accommodation",
            required : true,
        },


    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        collection: 'Comments',
    }
)

commentSchema.plugin(nanoid, {
    length: 12,
    charset: '0123456789',
    fieldName: 'commentId',
});

export default mongoose.model('Comment', commentSchema);