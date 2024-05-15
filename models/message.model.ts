import mongoose, { ObjectIdExpression } from 'mongoose';
import nanoid from '../libraries/mongoose-nanoid'


export interface IMessage extends mongoose.Document {
  messageId : string,
  order : string,
  sender : string,
  receiver : string,
  text : string,
  media : [string],
  created_at: string,
  updated_at: string,
}


const Schema = mongoose.Schema;

const messageSchema = new Schema<IMessage>(
  {
      messageId: {
        type: String,
        require: true,
      },
      order: {
        type: String,
        ref : "Order",
        require: true,
      },
      sender: {
        type: String,
        ref : "User",
        require: true,
      },
      receiver: {
        type: String,
        require: true,
      },
      text: {
        type: String,
      },
      media: {
        type: [String],
      },
  },
  {
      timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
      collection: 'Messages',
  }
);

messageSchema.plugin(nanoid, {
  length: 12,
  charset: '0123456789',
  fieldName: 'messageId',
});

export default mongoose.model('Message', messageSchema);
