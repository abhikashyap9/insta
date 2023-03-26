"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAIL_SETTINGS = void 0;
exports.MAIL_SETTINGS = {
    allowedOrigins: ['http://localhost:3000/'],
    SERVER_PORT: process.env.PORT || 3000,
    SERVER_DB_URI: process.env.DB_URI,
    JWT_SECRET: 'thisIsASimpleTest',
    OTP_LENGTH: 10,
    OTP_CONFIG: {
        upperCaseAlphabets: false,
        specialChars: false,
    },
    MAIL_SETTINGS: {
        service: 'gmail',
        auth: {
            user: process.env.MAIL_EMAIL,
            pass: process.env.MAIL_PASSWORD,
        },
    },
};
