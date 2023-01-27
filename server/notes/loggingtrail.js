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
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { response, request } = require('../app');
const logRouter = require('express').Router();
const User = require('../Schemas/mongo');
logRouter.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, name, password } = req.body;
    const saltRounds = 10;
    const passwordHash = yield bcrypt.hash(password, saltRounds);
    const user = new User({
        userName,
        name,
        passwordHash,
    });
    try {
        const savedUser = yield user.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// {"content":"Hello build guys",
//  "data":"important",
//  "important":true
//  }
// {
//   "userName":"Abhishek",
//   "password":"abhishek@78"
// }
logRouter.post('/userLogin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    const user = yield User.findOne({ userName });
    const passwordCorrect = yield bcrypt.compare(password, user.passwordHash);
    if (!(user && passwordCorrect)) {
        return res.status(401).json({ error: 'Invalid password' });
    }
    const userForToken = {
        username: user.userName,
        id: user._id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 60 * 600,
    });
    console.log(token);
    res.status(200).send({ token, userName: user.userName, name: user.name });
}));
logRouter.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedUser = yield User.find({});
        res.status(200).json(savedUser);
    }
    catch (error) {
        res.status(400).send();
    }
}));
module.exports = logRouter;
