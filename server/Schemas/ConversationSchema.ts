import mongoose from 'mongoose';

const Conversation =new mongoose.Schema({
    chatMembers:{
	type:Array,
	ref:'signupuser'
	},
	createdBy:{
		type:String
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
