require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {response, request} = require('../app')
const logRouter = require('express').Router()
const User = require('../Schemas/mongo')

logRouter.post('/user', async (req, res) => {
	const {userName, name, password} = req.body
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		userName,
		name,
		passwordHash,
	})

	try {
		const savedUser = await user.save()
		res.status(201).json(savedUser)
	} catch (error) {
		res.status(400).send(error)
	}
})

// {"content":"Hello build guys",
//  "data":"important",
//  "important":true
//  }

// {
//   "userName":"Abhishek",
//   "password":"abhishek@78"
// }

logRouter.post('/userLogin', async (req, res) => {
	const {userName, password} = req.body

	const user = await User.findOne({userName})
	const passwordCorrect = await bcrypt.compare(password, user.passwordHash)

	if (!(user && passwordCorrect)) {
		return res.status(401).json({error: 'Invalid password'})
	}

	const userForToken = {
		username: user.userName,
		id: user._id,
	}

	const token = jwt.sign(userForToken, process.env.SECRET, {
		expiresIn: 60 * 600,
	})
	console.log(token)
	res.status(200).send({token, userName: user.userName, name: user.name})
})

logRouter.post('/user', async (req, res) => {
	try {
		const savedUser = await User.find({})
		res.status(200).json(savedUser)
	} catch (error) {
		res.status(400).send()
	}
})

module.exports = logRouter
