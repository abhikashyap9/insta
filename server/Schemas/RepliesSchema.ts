import mongoose from 'mongoose';

const CommentReplies = new mongoose.Schema({

        
        reply: {
            type: String,
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'signupuser'
        },

        comment: {
            type: String,
            ref: 'comment'
        },

        
})

CommentReplies.set('toJSON', {
	transform: (document:any, returnedObject:any) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject._v
	},
})
export default mongoose.model('commentreplies', CommentReplies)
