"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const { default: mongoose } = require('mongoose')
const mongoose_1 = __importDefault(require("mongoose"));
const Profile = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
});
Profile.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    },
});
exports.default = mongoose_1.default.model('profile', Profile);
