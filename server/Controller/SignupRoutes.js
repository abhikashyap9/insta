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
exports.SignUpRoutes = exports.signrouter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const express_1 = __importDefault(require("express"));
exports.signrouter = express_1.default.Router({
    strict: true,
});
const bcrypt_1 = __importDefault(require("bcrypt"));
const Signupschema_1 = __importDefault(require("../Models/Signupschema"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("./config"));
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, fullName, userName, password } = req.body;
    console.log(email);
    const saltRounds = 10;
    try {
        const userEmailExist = yield Signupschema_1.default.findOne({ email });
        const userNameExist = yield Signupschema_1.default.findOne({ fullName });
        if (userEmailExist) {
            return res.status(409).json({ error: 'User Email Already Exist' });
        }
        if (userNameExist) {
            return res.status(409).json({ error: 'User Name Already Exist' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const signupuser = new Signupschema_1.default({
            email: email,
            fullName: fullName,
            userName: userName,
            password: hashedPassword,
        });
        let savedUser = yield signupuser.save();
        console.log(savedUser);
        res.status(201).json(savedUser).end();
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield Signupschema_1.default.findOne({ email });
    if (!(user && passwordCorrect)) {
        return res.status(401).json({ error: 'Invalid Password' });
    }
    const passwordCorrect = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
    const useForToken = {
        username: user.userName,
        id: user._id,
        profilePicture: user.profilePicture,
        isStorie: user.isStorie,
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
        userProfilePicture: user === null || user === void 0 ? void 0 : user.profilePicture,
    });
});
const getTokenFrom = (request) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.split(' ')[1];
    }
    return null;
};
const UserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
const OtherProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log('id', id);
    try {
        let user = yield Signupschema_1.default.findById(id);
        res.status(200).json(user).end();
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
const FollowUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    let followingId = (_b = req['auth']) === null || _b === void 0 ? void 0 : _b.userId;
    try {
        let follower = yield Signupschema_1.default.findByIdAndUpdate(followingId, { $push: { following: id } }, { new: true });
        let following = yield Signupschema_1.default.findByIdAndUpdate(id, { $push: { followers: followingId } }, { new: true });
        res.status(201).json(follower).end();
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
});
const UnfollowUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
const ResetPassowrd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    console.log(token);
    const tokenData = yield Signupschema_1.default.findOne({ password: token });
    console.log(tokenData);
    const { password } = req.body;
    console.log(password);
    console.log('password', req);
    try {
        if (tokenData) {
            const saltRounds = 10;
            const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
            const userData = yield Signupschema_1.default.findByIdAndUpdate({ _id: tokenData === null || tokenData === void 0 ? void 0 : tokenData._id }, { $set: { password: hashedPassword, token: '' } }, { new: true });
            console.log(userData);
            return res.status(200).send({ success: true, msg: "User Password has been reset" });
        }
        else {
            return res.status(400).send({ success: false, msg: "The link has been expired" });
        }
    }
    catch (err) {
        return res.status(400).send({ err });
    }
});
const sendResetPasswordMail = (name, email, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            // requireTLS: true,
            auth: {
                user: config_1.default.emailUser,
                pass: config_1.default.emailPassword, // generated ethereal password
            },
        });
        let info = yield transporter.sendMail({
            from: 'config.emailUser',
            to: email,
            subject: 'For Reset Password',
            text: 'Hello world?',
            html: '<p>Hi ' + name + ' ,Please copy the link <a href="http://localhost:3000/resetPassowrd?token=' + token + '">and reset your password</a></p>',
        });
        transporter.sendMail(info, function (err, info) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Mail has sended');
            }
        });
    }
    catch (err) {
        console.log(err);
    }
    // catch(err:any)=>{
    // // console.log(err)
    // }
});
const ResetEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    console.log('EMail', email);
    const user = yield Signupschema_1.default.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ err: 'Email Does not Exist' });
    }
    if (user) {
        let otp = otp_generator_1.default.generate(6, { upperCaseAlphabets: false, specialChars: false });
        console.log(typeof otp);
        try {
            const user = yield Signupschema_1.default.findOneAndUpdate({
                "email": email
            }, {
                "$set": {
                    "token": otp
                }
            });
            console.log(user);
            sendResetPasswordMail(user === null || user === void 0 ? void 0 : user.userName, user === null || user === void 0 ? void 0 : user.email, user === null || user === void 0 ? void 0 : user.password);
            res.status(200).send({ success: true, msg: 'Please Check your inbox', data: user });
        }
        catch (err) {
            console.log(err);
            res.status(400).send({ success: false, msg: 'Request Failed' });
        }
    }
});
exports.SignUpRoutes = {
    Signup, Login, UserProfile, OtherProfile, FollowUser, UnfollowUser, ResetPassowrd, ResetEmail
};
