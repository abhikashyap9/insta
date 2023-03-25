import mongoose from 'mongoose'

const Signupuser = new mongoose.Schema({
	email: {
		type: String,
		minLength: 6,
		required: true,
	},
	fullName: {
		type: String,
		minLength: 6,
		required: true,
	},
	userName: {
		type: String,
		minLength: 6,
		required: true,
	},
	password: {
		type: String,
		minLength: 8,
		required: true,
	},
	following: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'signupuser',
		},
	],
	followers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'signupuser',
		},
	],
	profilePicture: [
		{
			type: String,
			ref: 'signupuser',
		},
	],
	isStorie: {
		type: Boolean,
		default: false,
	},
})
// const UserUploads=new mongoose.Schema({
//     userId:{

//         type:mongoose.Schema.Types.ObjectId,
//         ref:'Signupuser'
//     },
//     image:{
//        type:String,
//     },
//     caption:{
//         type:String
//     },
//     location:{
//         type:String,
//     },
// })

// const mongoose = require('mongoose')

const Profile = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	bio: {
		type: String,
		trim: true,
	},
	website: {
		type: String,
	},
	email: {
		type: String,
	},
	phoneNumber: {
		type: Number,
		minLength: 5,
	},
	gender: {
		type: String,
		select: false,
	},
	birthday: {
		type: Date,
		select: false,
	},

	followers: {
		type: Map,
		of: {
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Profile',
			},
		},
		default: {},
	},
	following: {
		type: Number,
		of: {
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Profile',
			},
		},
		default: {},
	},
	posts: {
		type: Map,
	},
	token: {
		type: String,
	},
	requests: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Profile',
			select: false,
		},
	],
})

Profile.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject._v
	},
})

Signupuser.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject?._id?.toString()
		delete returnedObject._id
		delete returnedObject.__v

		delete returnedObject.passwordHash
	},
})

process.setMaxListeners(0)

export default mongoose.model('signupuser', Signupuser)
// module.exports=mongoose.model('useruploads',UserUploads)
