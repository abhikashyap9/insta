const mongoose = require('mongoose')

const ProfileDetails = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'signupuser',
	},
	bio: {
		type: String,
		trim: true,
	},
	website: {
		type: String,
		trim: true,
	},
	phoneNumber: {
		type: Number,
		minLength: 8,
	},
	gender: {
		type: String,
		// enum: [ "Homme", "Femme" ]
	},
	birthday: {
		type: Date,
		select: false,
	},
})

//  posts:{
//    type:Number,
//    ref:'useruploads'
//   },
//   followers:{
//    type:Map,
//    of:{
//      user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'profile',
//      },
//    },
//    default:{}

//   },
//   following:{
//    type:Number,
//    of:{
//      user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'profile'
//      },
//    },
//    default:{},
//   },
//   posts:{
//    type:mongoose.Schema.Types.ObjectId,
//    ref:'useruploads'
//   },
//   requests:[
//      {
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'profile',
//         select:false
//      },
//   ]
// const Follow=new mongoose.Schema({
//     followBy:{
//        type:mongoose.Schema.Types.ObjectId,
//        ref:'signupuser'
//     },
//     followedBy:{
//       type:mongoose.Schema.Types.ObjectId,
//       ref:'signupuser'
//     }
// })

ProfileDetails.set('toJSON', {
	transform: (document: any, returnedObject: any) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject._vs
	},
})

// Follow.set('toJSON',{transform:(document,returnedObject)=>{

//       returnedObject.id=returnedObject._id.toString()
//       delete returnedObject._id
//       delete returnedObject._v

// }})

export default mongoose.model('profiledetails', ProfileDetails)
// module.exports =mongoose.model('follow',Follow);
