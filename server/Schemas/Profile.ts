// const { default: mongoose } = require('mongoose')
import mongoose from 'mongoose'

const Profile = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'signupuser',
	},
	// userDetails:{
	//  type:mongoose.Schema.Types.ObjectId,
	//  ref:'profiledetails',
	// },

	// posts:{
	//  type:mongoose.Schema.Types.ObjectId,
	//  ref:'useruploads',
	// },
	// followers:{
	//  type:mongoose.Schema.Types.ObjectId,
	//  ref:'following'
	// },
	// following:{
	//       type:mongoose.Schema.Types.ObjectId,
	//       ref:'following'
	//  },
	//  profile
	//    posts:{
	//     type:Map,

	//    },
	//    requests:[
	//       {
	//          type:mongoose.Schema.Types.ObjectId,
	//          ref:'profile',
	//          select:false
	//       },
	//    ]
})

Profile.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject._v
	},
})

export default mongoose.model('profile', Profile)
