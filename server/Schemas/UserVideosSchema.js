"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
// const Signupusers=require('./Signupschema')
const UserVideos = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'signupuser',
    },
    video: [
        {
            type: String,
            // required:[true,'Please enter a video']
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
UserVideos.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    },
});
exports.default = mongoose.model('uservideos', UserVideos);
