"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.conversationRouter = express_1.default.Router({
    strict: true,
});
const jwtauthorization_1 = __importDefault(require("../middeware/jwtauthorization"));
const ConversationSchema_1 = __importDefault(require("../Models/ConversationSchema"));
const Signupschema_1 = __importDefault(require("../Models/Signupschema"));
exports.conversationRouter.post("/createConversation/:id", jwtauthorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params; //otheruser
    let senderId = (_a = req["auth"]) === null || _a === void 0 ? void 0 : _a.userId; // person who uses id auth
    let user = yield Signupschema_1.default.findById(senderId);
    console.log('Signupuser', user);
    let conversation = new ConversationSchema_1.default({
        chatMembers: [{ userId: id, messangerId: senderId }],
        createdBy: `${user === null || user === void 0 ? void 0 : user.userName} created this chat`,
    });
    try {
        let userRoomExits = yield ConversationSchema_1.default.find({
            chatMembers: {
                $elemMatch: {
                    userId: id,
                    messangerId: senderId
                },
            },
        });
        let userChatExits = yield ConversationSchema_1.default.find({
            chatMembers: {
                $elemMatch: {
                    userId: senderId,
                    messangerId: id
                },
            },
        });
        console.log(userRoomExits);
        console.log(userChatExits);
        // let userChatRoom =await Conversation.find({
        //   chatMembers: {
        //     $elemMatch: {
        //       userId: senderId,
        //     },
        //   },
        // });
        if (userRoomExits.length > 0) {
            return res.status(401).json(userRoomExits);
        }
        if (userChatExits.length > 0) {
            return res.status(401).json(userRoomExits);
        }
        let savedConversation = yield conversation.save();
        res.status(201).json(savedConversation);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
}));
exports.conversationRouter.get("/getConversation/:id", jwtauthorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    let senderId = (_b = req["auth"]) === null || _b === void 0 ? void 0 : _b.userId;
    try {
        // let savedConversation = await Conversation.find({
        //   "chatMembers.userId": id,
        // })
        let userRoomExits = yield ConversationSchema_1.default.find({
            chatMembers: {
                $elemMatch: {
                    userId: id,
                    messangerId: senderId //auth
                },
            },
        }).populate({ path: 'chatMembers',
            populate: {
                path: 'userId',
                model: 'signupuser'
            } }).exec();
        let userChatExits = yield ConversationSchema_1.default.find({
            chatMembers: {
                $elemMatch: {
                    userId: senderId,
                    messangerId: id //otheruser
                },
            },
        }).populate({ path: 'chatMembers',
            populate: {
                path: 'messangerId',
                model: 'signupuser'
            } }).exec();
        // let savedConversation1 = await Conversation.find({
        //   "chatMembers.messangerId": id,
        // });
        // console.log('SavedConversation',savedConversation)
        // console.log('SavedConversation1',savedConversation1)
        if (userRoomExits.length > 0) {
            return res.status(200).json(userRoomExits);
        }
        if (userChatExits.length > 0) {
            return res.status(200).json(userChatExits);
        }
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
}));
exports.conversationRouter.get('/getUserRoom', jwtauthorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    let userId = (_c = req['auth']) === null || _c === void 0 ? void 0 : _c.userId;
    try {
        let savedConversation = yield ConversationSchema_1.default.find({
            chatMembers: {
                $elemMatch: {
                    messangerId: userId,
                }
            }
        }).populate({ path: 'chatMembers',
            populate: {
                path: 'userId',
                model: 'signupuser'
            } }).exec();
        let savedConversation1 = yield ConversationSchema_1.default.find({
            chatMembers: {
                $elemMatch: {
                    userId: userId
                }
            }
        }).populate({ path: 'chatMembers',
            populate: {
                path: 'messangerId',
                model: 'signupuser'
            } }).exec();
        let allConversation = savedConversation.concat(savedConversation1);
        if (savedConversation) {
            return res.status(200).json(allConversation);
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }
}));
exports.conversationRouter.post("/savedMessages/:id", jwtauthorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { messageData } = req.body; //otheruser
    console.log(req.body);
    const { id } = req.params;
    console.log("my", messageData);
    try {
        let userRoomExits = yield ConversationSchema_1.default.findByIdAndUpdate(id, { $push: { messages: messageData } }, { new: true });
        // console.log("userrrooommmm", userRoomExits);
        res.status(201).json(userRoomExits);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
}));
exports.conversationRouter.get("/getMessages/:id", jwtauthorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let conversation = yield ConversationSchema_1.default.findById(id).populate("userId");
        res.status(200).json(conversation);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
}));
exports.default = exports.conversationRouter;
