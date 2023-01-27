"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const requestLogger = (req, res, next) => {
    logger_1.default.info('Method', req.method);
    logger_1.default.info('Path', req.path);
    logger_1.default.info('Body:', req.body);
    logger_1.default.info('....');
    next();
};
const unknownendPoints = (request, response, next) => {
    response.status(404).send({ error: 'unknown endpoints' });
};
const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    if (error.name === 'Validation Error') {
        return response.status(400).json({ error: error.message, numb: '' });
    }
    if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message });
    }
    // if(error.name ==='TokenExpiredError'){
    //     return response.status(401).json({ error: error.message });
    // }
    next(error);
};
exports.default = { errorHandler, unknownendPoints, requestLogger };
