"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
// const Signupusers=require('./Signupschema')
const UserUploads = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'signupuser',
    },
    // profilePicture:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'userprofilepicture'
    // },
    image: {
        type: String,
    },
    caption: {
        type: String,
    },
    location: {
        type: String,
    },
    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'signupuser',
        },
    ],
    comment: [
        {
            comments: { type: String },
            postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'signupuser' },
        },
    ],
});
// [899811,[comment]]
UserUploads.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    },
});
exports.default = mongoose.model('useruploads', UserUploads);
