const mongoose = require('mongoose')
// const Signupusers=require('./Signupschema')

const StoriesImages = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'signupuser',
	},
	image: [
		{
			type: String,
			required: [true, 'Please enter a image'],
		},
	],

	createdAt: {
		type: Date,
		default: Date.now(),
	},
})

StoriesImages.set('toJSON', {
	transform: (document: any, returnedObject: any) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject._v
	},
})
export default mongoose.model('StoriesImages', StoriesImages)
