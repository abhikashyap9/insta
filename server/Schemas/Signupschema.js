"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Signupuser = new mongoose_1.default.Schema({
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'signupuser',
        },
    ],
    followers: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
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
        // default: false,
    },
});
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
const Profile = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Profile',
            },
        },
        default: {},
    },
    following: {
        type: Number,
        of: {
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Profile',
            },
        },
        default: {},
    },
    posts: {
        type: Map,
    },
    requests: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Profile',
            select: false,
        },
    ],
});
Profile.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    },
});
Signupuser.set('toJSON', {
    transform: (document, returnedObject) => {
        var _a;
        returnedObject.id = (_a = returnedObject === null || returnedObject === void 0 ? void 0 : returnedObject._id) === null || _a === void 0 ? void 0 : _a.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});
process.setMaxListeners(0);
exports.default = mongoose_1.default.model('signupuser', Signupuser);
// module.exports=mongoose.model('useruploads',UserUploads)
