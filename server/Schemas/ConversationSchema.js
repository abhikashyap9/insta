"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_autopopulate_1 = __importDefault(require("mongoose-autopopulate"));
const Conversation = new mongoose_1.default.Schema({
    chatMembers: {
        type: Array,
        userId: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'signupuser',
            autopopulate: true,
        },
        messangerId: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'signupuser',
            autopopulate: true,
        },
    },
    createdBy: {
        type: String,
    },
    messages: {
        type: Array,
        ref: 'conversation',
    },
});
Conversation.plugin(mongoose_autopopulate_1.default);
Conversation.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._vs;
    },
});
exports.default = mongoose_1.default.model('conversation', Conversation);
