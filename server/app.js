"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const middleware_1 = __importDefault(require("./utils/middleware"));
const fs_1 = __importDefault(require("fs"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const Signup_1 = __importDefault(require("./Routes/Signup"));
const Userprofile_1 = __importDefault(require("./Routes/Userprofile"));
const UserUploads_1 = __importDefault(require("./Routes/UserUploads"));
const Conversation_1 = __importDefault(require("./Routes/Conversation"));
const VideoUploads_1 = __importDefault(require("./Routes/VideoUploads"));
// const bodyParser = require('body-parser');
// import config from "./utils/config";
// import initMongodb from "./utils/initMongodb";
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use(fileUpload({useTimeFiles:true}))
// .........This is a middleware to parse cors........
app.use((0, cors_1.default)());
var accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, 'access.log'), { flags: 'a' });
console.log('accessLogStream', accessLogStream);
app.use(express_1.default.static('build'));
// app.use(express.static(path.join(__dirname,'../client/build')))
// app.get('*',function(req,res){
//     res.sendFile(path.join(__dirname,'../client/build/index.html'))
// })
app.use('/Routes', express_1.default.static('Routes'));
app.use(middleware_1.default.requestLogger);
app.use(middleware_1.default.errorHandler);
app.use((0, morgan_1.default)('combined', { stream: accessLogStream }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use('', Signup_1.default);
app.use('', Userprofile_1.default);
app.use('', UserUploads_1.default);
app.use('', Conversation_1.default);
app.use('', VideoUploads_1.default);
exports.default = app;
