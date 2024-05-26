"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const phoneSchema = new mongoose_1.default.Schema({
    content: { type: String, minLength: 5, required: true },
    data: { type: Number, minLength: 5, required: true },
    important: Boolean,
});
const blogList = new mongoose_1.default.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});
const userSchema = new mongoose_1.default.Schema({
    userName: { type: String },
    name: String,
    passwordHash: String,
    notes: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Note',
        },
    ],
});
userSchema.plugin(mongoose_unique_validator_1.default, {
    message: 'Error username should be unique',
});
// const noteSchema=new mongoose.Schema({
//     content:{
//         type:String,
//         required:true,
//         minlength:5
//       },
//       date:new Date(),
//       important:Boolean,
//       user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'User'
//       }
// })
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passowordHash;
    },
});
phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    },
});
blogList.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    },
});
process.setMaxListeners(0);
exports.default = {
    NoteModel: mongoose_1.default.model('Note', phoneSchema),
    BlogModel: mongoose_1.default.model('Blog', blogList),
    UsersModel: mongoose_1.default.model('User', userSchema),
};
// const { Schema } = require('mongoose');
// const moongose = require('mongose');
// // const uniqueValidator=require('require');
// const =new Schema.schema({
//     content:
// });
