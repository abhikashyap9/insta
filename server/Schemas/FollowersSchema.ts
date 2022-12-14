const mongoose = require('mongoose')

const Followers = new mongoose.Schema({
	// user:{
	//     type:mongoose.Schema.Types.ObjectId,
	//     ref:'signupuser',
	//    },
	profile: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'profile',
	},
	followers: {
		type: Map,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'signupuser',
		},
	},
})

Followers.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

process.setMaxListeners(0)

module.exports = mongoose.model('followers', Followers)
