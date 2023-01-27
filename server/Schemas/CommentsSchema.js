"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Comments = new mongoose_1.default.Schema({
    commentedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'signupuser',
    },
    postId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'useruploads',
    },
    comment: {
        type: String,
        ref: 'signupuser',
    },
    likedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'signupuser',
    },
    reply: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'signupuser',
    },
});
Comments.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
process.setMaxListeners(0);
exports.default = mongoose_1.default.model('comments', Comments);
