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
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./logger"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = {
    mongoose: mongoose_1.default,
    connect: () => __awaiter(void 0, void 0, void 0, function* () {
        mongoose_1.default.Promise = Promise;
        logger_1.default.info('connecting to ', config_1.default.MONGODB_URI);
        try {
            yield mongoose_1.default.connect(config_1.default.MONGODB_URI);
            logger_1.default.info('connected to Mongodb');
        }
        catch (error) {
            logger_1.default.info('error connecting to MongoDb', error.message);
            throw new Error('APP ERRORS: CONNECTION TO MONGODB FAILED');
        }
    }),
    disconnect: (done) => {
        mongoose_1.default.disconnect(done);
    },
};
