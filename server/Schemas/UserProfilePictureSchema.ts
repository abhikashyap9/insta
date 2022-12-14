import mongoose from 'mongoose'

const UserProfilePicture = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'signupuser',
	},
	image: {
		type: String,
	},
})

UserProfilePicture.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject._v
	},
})

export default mongoose.model('userprofilepicture', UserProfilePicture)
