"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
let PORT = 3001 || process.env.PORT;
let MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI;
// if (!PORT) throw new Error('Please set PORT environment variable.')
if (!MONGODB_URI)
    throw new Error('Please set MONGODB_URI or MONGODB_URI_TEST environment variable.');
exports.default = { MONGODB_URI, PORT };
