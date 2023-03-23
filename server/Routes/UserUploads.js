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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const UserUploadSchema_1 = __importDefault(require("../Schemas/UserUploadSchema"));
const jwtauthorization_1 = __importDefault(require("../middeware/jwtauthorization"));
const useruploadsrouter = express_1.default.Router({
    strict: true,
});
// const Profile =require('../Schemas/Signupschema')
const fileStorageEngine = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Routes/image');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: fileStorageEngine });
const getTokenFrom = (request) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.split(' ')[1];
    }
    return null;
};
useruploadsrouter.post('/single', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { caption, location } = req.body;
    const token = getTokenFrom(req);
    console.log(token);
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
    console.log('decoded', decodedToken);
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid token' });
    }
    if (!req.body) {
        return res.status(400).json({ error: 'content missing' });
    }
    const useruploads = new UserUploadSchema_1.default({
        userId: decodedToken.id,
        caption: caption,
        location: location,
        image: (_a = req['file']) === null || _a === void 0 ? void 0 : _a.path,
    });
    try {
        let savedUser = yield useruploads.save();
        res.status(201).json(savedUser).end();
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }
}));
useruploadsrouter.get('/userpost', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let uploads = yield UserUploadSchema_1.default.find()
        .populate('userId', 'userName profilePicture')
        .populate("comment.postedBy")
        .populate("likedBy")
        .populate("comment.replies.postedBy");
    // 
    console.log(uploads);
    //    .populate('commentedBy')
    //    .exec()
    // let profileImage = await UserUploads.aggregate([
    //     {$lookup:{
    //     from:'userprofilepicture',
    //     localField:'userId',
    //     foreignField:'userId',
    //     as:'anything'
    // }}])
    // console.log(profileImage)
    //    .populate()
    //    .populate('profilePicture','image')
    // let userId = await UserProfilePicture.findById()
    if (uploads) {
        console.log(uploads);
        res.json(uploads).status(200);
    }
    else {
        res.status(400).json('error');
    }
}));
useruploadsrouter.put('/likedby/:id', jwtauthorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    console.log(id);
    let userId = (_b = req['auth']) === null || _b === void 0 ? void 0 : _b.userId;
    console.log(userId);
    try {
        let post = yield UserUploadSchema_1.default.findByIdAndUpdate(id, { $push: { likedBy: userId } }, { new: true });
        res.status(201).json(post).end();
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
}));
useruploadsrouter.put('/unlikedby/:id', jwtauthorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { id } = req.params;
    console.log(id);
    let userId = (_c = req['auth']) === null || _c === void 0 ? void 0 : _c.userId;
    console.log(userId);
    try {
        let post = yield UserUploadSchema_1.default.findByIdAndUpdate(id, { $pull: { likedBy: userId } }, { new: true });
        res.status(204).json(post).end();
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
}));
useruploadsrouter.put('/addcomment/:id', jwtauthorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { id } = req.params;
    console.log(id);
    let userId = (_d = req['auth']) === null || _d === void 0 ? void 0 : _d.userId;
    console.log(userId);
    const { comment } = req.body;
    console.log(comment);
    let comments = {
        comments: comment,
        postedBy: userId,
    };
    try {
        let posted = yield UserUploadSchema_1.default.findByIdAndUpdate(id, { $push: { comment: comments } }, { new: true })
            .populate('comment.postedBy', '_id userName profilePicture')
            .exec();
        console.log('post', posted);
        res.json(posted).end();
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
}));
useruploadsrouter.put('/addcommentreply/:id', jwtauthorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const { id } = req.params;
    console.log(id);
    let userId = (_e = req['auth']) === null || _e === void 0 ? void 0 : _e.userId;
    console.log(userId);
    const { comment, postId } = req.body;
    console.log('BBBB', comment);
    const generateMongoObjectId = () => {
        const thousand = 1000;
        const sixteen = 16;
        const timestamp = ((new Date().getTime() / thousand) | 0).toString(sixteen);
        return (timestamp +
            "xxxxxxxxxxxxxxxx"
                .replace(/[x]/g, function () {
                return ((Math.random() * sixteen) | 0).toString(sixteen);
            })
                .toLowerCase());
    };
    let uniqueId = generateMongoObjectId();
    let commentreplies = {
        reply: comment,
        postedBy: userId,
        id: uniqueId
    };
    try {
        let posted = yield UserUploadSchema_1.default.updateOne({
            id: postId,
            "comment._id": id
        }, {
            $push: {
                "comment.$.replies": commentreplies
            }
        }, { new: true });
        // .populate('comment.postedBy', '_id userName profilePicture')
        console.log('post', posted);
        return res.status(200).json(posted);
    }
    catch (err) {
        return res.status(400).json({ error: err });
    }
}));
useruploadsrouter.delete('/deleteComment/:id', jwtauthorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const { id } = req.params;
    const { postId } = req.query;
    console.log('id', id);
    let userId = (_f = req['auth']) === null || _f === void 0 ? void 0 : _f.userId;
    console.log('userId', userId);
    console.log('postId', postId);
    try {
        let deleted = yield UserUploadSchema_1.default.updateOne({
            "_id": postId
        }, {
            $pull: {
                "comment": {
                    "_id": id
                }
            }
        });
        console.log(deleted);
        return res.status(204).json(deleted);
    }
    catch (err) {
        return res.status(404).json({ error: err });
    }
}));
useruploadsrouter.delete('/deleteCommentReply/:id', jwtauthorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const { id } = req.params;
    const { postId } = req.query;
    console.log('id', id);
    let userId = (_g = req['auth']) === null || _g === void 0 ? void 0 : _g.userId;
    console.log('userId', userId);
    console.log('postId', postId);
    try {
        let deleted = yield UserUploadSchema_1.default.findOneAndUpdate({ 'comment': { $elemMatch: { 'replies.id': id } } }, { $pull: { 'comment.$.replies': { id: id } } });
        console.log(deleted);
        return res.status(204).json(deleted);
    }
    catch (err) {
        return res.status(404).json({ error: err });
    }
}));
useruploadsrouter.get('/userPosts', jwtauthorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    let userId = (_h = req['auth']) === null || _h === void 0 ? void 0 : _h.userId;
    let uploads = yield UserUploadSchema_1.default.find({ "userId": userId })
        .populate('userId', 'userName profilePicture')
        .populate("comment.postedBy")
        .populate("likedBy")
        .populate("comment.replies.postedBy");
    // 
    console.log(uploads);
    //    .populate('commentedBy')
    //    .exec()
    // let profileImage = await UserUploads.aggregate([
    //     {$lookup:{
    //     from:'userprofilepicture',
    //     localField:'userId',
    //     foreignField:'userId',
    //     as:'anything'
    // }}])
    // console.log(profileImage)
    //    .populate()
    //    .populate('profilePicture','image')
    // let userId = await UserProfilePicture.findById()
    if (uploads) {
        console.log(uploads);
        res.json(uploads).status(200);
    }
    else {
        res.status(400).json('error');
    }
}));
exports.default = useruploadsrouter;
