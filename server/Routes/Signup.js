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
exports.signrouter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
exports.signrouter = express_1.default.Router({
    strict: true,
});
const bcrypt_1 = __importDefault(require("bcrypt"));
const Signupschema_1 = __importDefault(require("../Schemas/Signupschema"));
const jwtauthorization_1 = __importDefault(require("../middeware/jwtauthorization"));
exports.signrouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, fullName, userName, password } = req.body;
    console.log('reqBody', req.body);
    const userEmailExist = yield Signupschema_1.default.findOne({ email });
    const userNameExist = yield Signupschema_1.default.findOne({ fullName });
    console.log(userEmailExist);
    console.log(userNameExist);
    if (userEmailExist) {
        return res.status(409).json({ error: 'User Email Already Exist' });
    }
    if (userNameExist) {
        return res.status(409).json({ error: 'User Name Already Exist' });
    }
    const saltRounds = 10;
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    const signupuser = new Signupschema_1.default({
        email: email,
        fullName: fullName,
        userName: userName,
        password: hashedPassword,
    });
    try {
        let savedUser = yield signupuser.save();
        res.status(201).json(savedUser).end();
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
exports.signrouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log('req', req.body);
    const user = yield Signupschema_1.default.findOne({ email });
    console.log('user', user);
    const passwordCorrect = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
    console.log(passwordCorrect);
    if (!(user && passwordCorrect)) {
        return res.status(401).json({ error: 'Invalid Password' });
    }
    const useForToken = {
        username: user.userName,
        id: user._id,
        profilePicture: user.profilePicture,
        isStorie: user.isStorie
    };
    const token = jsonwebtoken_1.default.sign(useForToken, process.env.SECRET, {
        expiresIn: 600 * 600,
    });
    res.status(200).send({
        token,
        username: user.userName,
        userfullname: user.fullName,
        id: user._id,
        isStorie: user === null || user === void 0 ? void 0 : user.isStorie,
        userProfilePicture: user === null || user === void 0 ? void 0 : user.profilePicture
    });
}));
const getTokenFrom = (request) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.split(' ')[1];
    }
    return null;
};
exports.signrouter.get('/userprofile/i', jwtauthorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let decodedToken = (_a = req['auth']) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        let user = yield Signupschema_1.default.findById(decodedToken);
        if (user) {
            return res.status(200).json(user);
        }
    }
    catch (err) {
        // console.log(''merr);
        res.status(400).json({ err: err });
    }
}));
exports.signrouter.get('/otherprofile/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log('id', id);
    try {
        let user = yield Signupschema_1.default.findById(id);
        res.status(200).json(user).end();
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
}));
exports.signrouter.put('/follow/:id', jwtauthorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    let followingId = (_b = req['auth']) === null || _b === void 0 ? void 0 : _b.userId;
    console.log('aryanid', id);
    console.log('rakshitid', followingId);
    try {
        let follower = yield Signupschema_1.default.findByIdAndUpdate(followingId, { $push: { following: id } }, { new: true });
        let following = yield Signupschema_1.default.findByIdAndUpdate(id, { $push: { followers: followingId } }, { new: true });
        res.status(201).json(follower).end();
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
}));
//   declare module "express" {
// 	export interface Request {
// 	  auth: any
// 	}
//   }
exports.signrouter.put('/unfollow/:id', jwtauthorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { id } = req.params;
    let followingId = (_c = req['auth']) === null || _c === void 0 ? void 0 : _c.userId;
    try {
        let follower = yield Signupschema_1.default.findByIdAndUpdate(followingId, { $pull: { following: id } }, { new: true });
        let following = yield Signupschema_1.default.findByIdAndUpdate(id, { $pull: { followers: followingId } }, { new: true });
        res.status(201).json(follower).end();
        console.log('follower', follower);
        console.log('following', following);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
}));
exports.default = exports.signrouter;
