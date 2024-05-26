"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SavedMessages = new mongoose_1.default.Schema({
    messages: {
        type: Array,
    },
    chat: {
        type: String,
    },
});
SavedMessages.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._vs;
    },
});
exports.default = mongoose_1.default.model("savedmessages", SavedMessages);
