const jwt = require('jsonwebtoken')
const notesRouter = require('express').Router()
const e = require('express')
const {response} = require('../app')
const Note = require('../Schemas/mongo')
const User = require('../Schemas/mongo')

notesRouter.delete('/:id', (request, response, next) => {
	let id = request.params.id
	console.log(id)
	Note.findByIdAndRemove(request.params.id)
		.then((result) => {
			response.status(200).send('no content fn')
		})
		.catch((error) => next(error))
})

notesRouter.get('/user', async (req, res) => {
	const user = await User.find({}).populate('notes', {content: 1, date: 1})
	// res.json({}).populate('notes');
	res.json(user)
})

notesRouter.get('/:id', (request, response, next) => {
	let id = request.params.id
	console.log(request.params)

	console.log(id)
	Note.findById(request.params.id)
		.then((note) => {
			if (note) {
				response.json(note)
			} else {
				console.log('response')
				response.status(404).end()
			}
		})
		.catch((error) => {
			console.log(error)

			next(error)
		})
})

const getTokenFrom = (request) => {
	const authorization = request.get('authorization')
	console.log('auth', authorization)
	if (authorization && authorization.toLowerCase().startsWith('Bearer ')) {
		return authorization.split(' ')[1]
	}
	return null
}

// malformed Token-i created new token just by login again
notesRouter.post('/p', async (req, res, next) => {
	const body = req.body

	const token = getTokenFrom(req)
	console.log('token', token)
	const decodedToken = jwt.verify(token, process.env.SECRET)
	console.log('decodedToken', decodedToken)

	if (!decodedToken.id) {
		response.status(401).json({error: 'token missing or invalid Token'})
	}

	if (!body.content) {
		return res.status(400).json({error: 'content Misssing'})
	}

	const user = await User.findById(decodedToken.id)

	let note = new Note({
		content: body.content,
		data: body.data,
		important: body.important === undefined ? false : body.important,
		date: new Date(),
		user: user._id,
	})

	const savedNote = await note.save()

	user.notes = user.notes.concat(savedNote._id)

	await user.save()
	res.json(savedNote)
})

notesRouter.put('/:id', (req, res, next) => {
	const {content, data, important} = req.body
	console.log(content, data, important)
	Note.findById(req.params.id, {content, important, data}, {new: true, runValidators: true, context: 'query'})
		.then((data) => res.json(data))
		.catch((err) => next(err))
})

// .getCollectionNames()
module.exports = notesRouter
