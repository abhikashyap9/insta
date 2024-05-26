import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const phoneSchema = new mongoose.Schema({
	content: {type: String, minLength: 5, required: true},
	data: {type: Number, minLength: 5, required: true},
	important: Boolean,
})

const blogList = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
})

const userSchema = new mongoose.Schema({
	userName: {type: String},
	name: String,
	passwordHash: String,
	notes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Note',
		},
	],
})
userSchema.plugin(uniqueValidator, {
	message: 'Error username should be unique',
})
// const noteSchema=new mongoose.Schema({
//     content:{
//         type:String,
//         required:true,
//         minlength:5
//       },

//       date:new Date(),
//       important:Boolean,
//       user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'User'
//       }
// })

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v

		delete returnedObject.passowordHash
	},
})

phoneSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject._v
	},
})

blogList.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject._v
	},
})

process.setMaxListeners(0)
export default {
	NoteModel: mongoose.model('Note', phoneSchema),
	BlogModel: mongoose.model('Blog', blogList),
	UsersModel: mongoose.model('User', userSchema),
}

// const { Schema } = require('mongoose');
// const moongose = require('mongose');
// // const uniqueValidator=require('require');

// const =new Schema.schema({
//     content:
// });
