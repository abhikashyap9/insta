import mongoose from "mongoose";
import autopopulate from 'mongoose-autopopulate'
const Conversation = new mongoose.Schema({
  chatMembers: {
    type:Array,
    userId:{
    type: mongoose.Schema.Types.ObjectId,
		ref: 'signupuser',
    autopopulate: true
    },
    messangerId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'signupuser',
      autopopulate: true
    }
  },
  createdBy: {
    type: String,
  },
  messages: {
    type: Array,
    ref: "conversation",
  },
});
Conversation.plugin(autopopulate);


Conversation.set("toJSON", {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._vs;
  },
});
export default mongoose.model("conversation", Conversation);
