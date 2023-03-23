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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtauthorization_1 = __importDefault(require("../middeware/jwtauthorization"));
const ProfileDetailSchema_1 = __importDefault(require("../Schemas/ProfileDetailSchema"));
const Profile_1 = __importDefault(require("../Schemas/Profile"));
const Signupschema_1 = __importDefault(require("../Schemas/Signupschema"));
const profilerouter = express_1.default.Router({
    strict: true,
});
profilerouter.post('/userdetails', jwtauthorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { bio, website, phoneNumber, gender, birthday } = req.body;
    let id = (_a = req['auth']) === null || _a === void 0 ? void 0 : _a.userId;
    console.log(bio, website, phoneNumber, gender, birthday);
    const profiledetails = new ProfileDetailSchema_1.default({
        bio: bio,
        website: website,
        phoneNumber: phoneNumber,
        gender: gender,
        birthday: birthday,
        user: id,
    });
    try {
        let savedprofileDetails = yield profiledetails.save();
        console.log('savdedProfile', savedprofileDetails);
        res.status(201).json(savedprofileDetails).end();
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
profilerouter.get('/otherprofiles', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield Profile_1.default.find().populate('user').populate('userDetails');
    console.log(users);
    try {
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400).end();
    }
}));
const fileStorageEngine = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Routes/profileimage');
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
profilerouter.put('/profileimage', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = getTokenFrom(req);
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid token' });
    }
    if (!req.body) {
        return res.status(400).json({ error: 'content missing' });
    }
    const userId = decodedToken.id;
    try {
        let deleteProfilePicture = yield Signupschema_1.default.findByIdAndUpdate(userId, { $set: { profilePicture: [] } });
        console.log('deletd', deleteProfilePicture);
        let profileUpdate = yield Signupschema_1.default.findByIdAndUpdate(userId, { $push: { profilePicture: (_b = req['file']) === null || _b === void 0 ? void 0 : _b.path } }, { new: true });
        res.status(201).json(profileUpdate).end();
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }
}));
profilerouter.get('/searchUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.query;
    console.log(search);
    if (!search) {
        return res.status(400).json({ err: 'No Search Found' });
    }
    try {
        let searchResults = yield Signupschema_1.default.find({ "userName": { $regex: ".*" + search + ".*", $options: "i" } });
        console.log(searchResults);
        return res.status(200).json(searchResults);
    }
    catch (err) {
        return res.status(400).json({ err: 'No User Found' });
    }
}));
exports.default = profilerouter;
