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
const conditional = require('conditional-middleware');
const UserVideosSchema_1 = __importDefault(require("../Schemas/UserVideosSchema"));
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const cloudinary = require("cloudinary");
const path = require("path");
const videouploadrouter = express_1.default.Router({
    strict: true,
});
const jwtauthorization_1 = __importDefault(require("../middeware/jwtauthorization"));
const fs = require("fs");
cloudinary.config({
    cloud_name: "duloaclhy",
    api_key: "667899696778733",
    api_secret: "awaxW2o-F2QVCLMwDkDVmTtkKpA"
});
const fileStorageEngine = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        console.log('files1', file);
        if (!fs.existsSync("public")) {
            fs.mkdirSync("public");
        }
        if (!fs.existsSync("public/uploads")) {
            fs.mkdirSync("public/uploads");
        }
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    },
});
const upload = (0, multer_1.default)({
    storage: fileStorageEngine,
    fileFilter: function (req, file, cb) {
        console.log('files2', file);
        var ext = path.extname(file.originalname);
        if (ext !== ".mkv" && ext !== ".mp4") {
            return cb(new Error("Only videos are allowed!"));
        }
        cb(null, true);
    }
});
const trimmed = (req, res, next) => {
    var _a, _b;
    // req.body= JSON.parse(JSON.stringify(req.body))
    const { startTime, endTime } = JSON.parse(JSON.stringify(req.body));
    console.log('startTime', startTime, endTime);
    const video = (_a = req['file']) === null || _a === void 0 ? void 0 : _a.path;
    const videosPath = (_b = req['file']) === null || _b === void 0 ? void 0 : _b.path;
    console.log(req['file'].originalname);
    let parseStartTime = Number(startTime);
    let parseEndTime = Number(endTime);
    let duration = parseEndTime - parseStartTime;
    const fileSaved = `./public/uploads/trimmed/${Date.now()} ${req['file'].originalname}`;
    ffmpeg({ source: video })
        .setStartTime(parseStartTime)
        .duration(duration)
        .on('start', function () {
        console.log('process Started');
    })
        .on('error', function (err) {
        console.log('err', +err);
    })
        .on('end', (err) => {
        console.log('finished');
        next();
    }).saveToFile(fileSaved)
        .run();
    req.trimmed = fileSaved;
    // ,upload.single('video')
};
const cloudinaryMiddleware = (req, res, next) => {
    let trimmedVideo = req.trimmed;
    cloudinary.v2.uploader.upload(trimmedVideo, { resource_type: "video" }, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let myResult = yield result;
            console.log('myResult', myResult);
            // console.log(Object.keys(result).includes('url'))
            if (Object.keys(result).includes('url')) {
                req.cloudinaryMiddleware = result;
                eventEmitter.emit('start');
                next();
            }
        }
        catch (error) {
            //  return res.status(500)
            console.log(error);
        }
    }));
};
const getClodinaryUrl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    eventEmitter.on('start', () => {
        console.log('started');
        next();
    });
});
videouploadrouter.post('/singleVideo', jwtauthorization_1.default, upload.single('video'), trimmed, cloudinaryMiddleware, getClodinaryUrl, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let trimmedVideo = req.cloudinaryMiddleware;
    console.log('three', trimmedVideo.url);
    const uservideos = new UserVideosSchema_1.default({
        userId: (_a = req['auth']) === null || _a === void 0 ? void 0 : _a.userId,
        video: trimmedVideo.url,
    });
    try {
        const video = yield uservideos.save();
        console.log(video);
        return res.status(201).json([video]);
        //
    }
    catch (err) {
        console.log(err.code === 'ERR_HTTP_HEADERS_SENT');
        console.log(err);
        // return res.status(400).json({ err })
    }
}));
// videouploadrouter.post('/singleImage',userAuthentication,upload.single('image'),async (req:any, res:any) => {
// })
// videouploadrouter.get('/singleVideo',userAuthentication,async(req:any,res:any)=>{
//     let uploads=await 
// })
exports.default = videouploadrouter;
