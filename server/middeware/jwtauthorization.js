"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getTokenFrom = (request) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.split(' ')[1];
    }
    return null;
};
const userAuthentication = (req, res, next) => {
    const token = getTokenFrom(req);
    // console.log(token)
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
    // console.log('decoded', decodedToken)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid token' });
    }
    if (!req.body) {
        return res.status(400).json({ error: 'content missing' });
    }
    req['auth'] = {
        userId: decodedToken.id,
    };
    next();
};
exports.default = userAuthentication;
