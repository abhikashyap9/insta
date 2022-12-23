import mongoose from 'mongoose';

const Conversation =new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
		ref: 'signupuser',
    },
    reciever:{
        type: mongoose.Schema.Types.ObjectId,
		ref: 'signupuser',
    }
})

Conversation.set('toJSON', {
	transform: (document:any, returnedObject:any) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject._vs
	},
})
export default mongoose.model('conversation', Conversation)
