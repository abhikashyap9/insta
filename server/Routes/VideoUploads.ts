import express, {Request, Response} from 'express'
import multer from 'multer'
import UserVideos from '../Schemas/UserVideosSchema'
import Signupuser from '../Schemas/Signupschema'
const EventEmitter = require('events')
const eventEmitter = new EventEmitter()
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)
const cloudinary = require('cloudinary')
const path = require('path')

const videouploadrouter = express.Router({
	strict: true,
})
import userAuthentication from '../middeware/jwtauthorization'
import {head} from 'superagent'
const fs = require('fs')

cloudinary.config({
	cloud_name: 'duloaclhy',
	api_key: '667899696778733',
	api_secret: 'awaxW2o-F2QVCLMwDkDVmTtkKpA',
})

const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log('files1', file)
		if (!fs.existsSync('public')) {
			fs.mkdirSync('public')
		}
		if (!fs.existsSync('public/uploads')) {
			fs.mkdirSync('public/uploads')
		}

		cb(null, './public/uploads')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '--' + file.originalname)
	},
})
const upload = multer({
	storage: fileStorageEngine,
	fileFilter: function (req, file, cb) {
		console.log('files2', file)
		var ext = path.extname(file.originalname)

		if (ext !== '.mkv' && ext !== '.mp4') {
			return cb(new Error('Only videos are allowed!'))
		}

		cb(null, true)
	},
})

export interface RequestAuthType extends Request {
	auth?: {userId?: string}
}

const trimmed = (req: any, res: any, next: any) => {
	// req.body= JSON.parse(JSON.stringify(req.body))
	const {startTime, endTime} = JSON.parse(JSON.stringify(req.body))
	console.log('startTime', startTime, endTime)
	const video = req['file']?.path
	const videosPath = req['file']?.path
	console.log(req['file'].originalname)

	let parseStartTime = Number(startTime)
	let parseEndTime = Number(endTime)
	let duration = parseEndTime - parseStartTime
	const fileSaved = `./public/uploads/trimmed/${Date.now()} ${req['file'].originalname}`
	
	
	ffmpeg({source: video})
		.setStartTime(parseStartTime)
		.duration(duration)
		.on('start', function () {
			console.log('process Started')
		})
		.on('error', function (err: any) {
			console.log('err', +err)
		})
		.on('end', (err: any) => {
			console.log('finished')

			next()
		})
		.saveToFile(fileSaved)
		.run()
	req.trimmed = fileSaved

	// ,upload.single('video')
}
const createThumbnail=async(req:any,res:any,next:any)=>{
	let trimmedVideo = req.trimmed
	console.log(trimmedVideo)
	const outputPath = `./public/uploads/thumbnail/${Date.now()}/${trimmedVideo}`

	ffmpeg(trimmedVideo)
	.seekInput(1)
	.frames(1)
	.output(outputPath)
	.on('end',()=>{
		console.log(outputPath)
	})
	.run()

  req.thumbnail=`./public/uploads/thumbnail/${trimmedVideo}`
  next()
}


const cloudinaryMiddleware = (req: any, res: any, next: any) => {
	let trimmedVideo = req.trimmed

	cloudinary.v2.uploader.upload(trimmedVideo, {resource_type: 'video'}, async (error: any, result: any) => {
		try {
			let myResult = await result
			console.log('myResult', myResult)

			// console.log(Object.keys(result).includes('url'))
			if (Object.keys(result).includes('url')) {
				req.cloudinaryMiddleware = result
				eventEmitter.emit('start')
				next()
			}
		} catch (error) {
			//  return res.status(500)
			console.log(error)
		}
	})
}
const getClodinaryUrl = async (req: any, res: any, next: any) => {
	eventEmitter.on('start', () => {
		console.log('started')

		//

		next()
	})
}


videouploadrouter.post(
	'/singleVideo',
	userAuthentication,
	upload.single('video'),
	trimmed,
	createThumbnail,
	cloudinaryMiddleware,
	getClodinaryUrl,
	async (req: any, res: any) => {
		const userId = req['auth']?.userId
		let trimmedVideo = req.cloudinaryMiddleware
		console.log('three', trimmedVideo.url)
        console.log('req.thumbnail',req.thumbnail)    
		const uservideos = new UserVideos({
			userId: userId,
			storie: [{url:trimmedVideo.url,identifier:'video'}],
		})

		try {
			let savedVideos = await uservideos.save()
			// let storiesAdd = await Signupuser.findByIdAndUpdate(
			// 	userId,
			// 	{
			// 		isStorie: true,
			// 	},
			// 	{new: true}
			// )
			console.log( savedVideos)
			res.status(201)
		} catch (err) {}
	}
)

videouploadrouter.get('/getAllStories', userAuthentication, async (req: any, res: any) => {
	const userId = req['auth']?.userId

	let gettingVideos = await UserVideos.find({}).populate('userId', 'userName')
	console.log(gettingVideos)

	try {
		return res.status(201).json(gettingVideos)
	} catch (err) {
		return res.status(400).json({err: err})
	}
})

videouploadrouter.get('/getVideo/:id', async (req, res) => {
	const videoPath = ``
	const videoStat = fs.statSync(videoPath)
	const fileSize = videoStat.fileSize
	const videoRange = req.headers.range

	if (videoRange) {
		const parts = videoRange.replace(/bytes=/, '').split('-')

		const start = parseInt(parts[0], 10)

		const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1

		const chunksize = end - start + 1

		const file = fs.createReadStream(videoPath, {start, end})

		const header = {
			'Content-Range': `bytes ${start}-${end}/${fileSize}`,

			'Accept-Ranges': 'bytes',

			'Content-Length': chunksize,

			'Content-Type': 'video/mp4',
		}

		res.writeHead(206, header)

		file.pipe(res)
	} else {
		const head = {
			'Content-Length': fileSize,

			'Content-Type': 'video/mp4',
		}

		res.writeHead(200, head)

		fs.createReadStream(videoPath).pipe(res)
	}
})

videouploadrouter.put(
	'/singleVideo',
	userAuthentication,
	
	upload.single('video'),
	trimmed,
	
	cloudinaryMiddleware,
	getClodinaryUrl,
	async (req: any, res: any) => {
		const userId = req['auth']?.userId
		let trimmedVideo = req.cloudinaryMiddleware
		

		const uservideos = new UserVideos({
			userId: userId,
			video: [trimmedVideo.url],
		})

		try {
			// let savedVideos = await uservideos.save()
			let storiesAdd = await uservideos.findByIdAndUpdate(userId, {
				$push: {
					video: trimmedVideo.url,
				},
			})
			console.log(storiesAdd)
			res.status(201)
		} catch (err) {}
	}
)

videouploadrouter.post(
	'/singleImage',
	userAuthentication,
	upload.single('video'),
	trimmed,
	cloudinaryMiddleware,
	getClodinaryUrl,
	async (req: any, res: any) => {
		const userId = req['auth']?.userId
		let trimmedVideo = req.cloudinaryMiddleware
		

		const uservideos = new UserVideos({
			userId: userId,
			video: [trimmedVideo.url],
		})

		try {
			// let savedVideos = await uservideos.save()
			let storiesAdd = await uservideos.findByIdAndUpdate(userId, {
				$push: {
					video: trimmedVideo.url,
				},
			})
			console.log(storiesAdd)
			res.status(201)
		} catch (err) {}
	}
)

// videouploadrouter.post('/singleImage',userAuthentication,upload.single('image'),async (req:any, res:any) => {

// })
// videouploadrouter.get('/singleVideo',userAuthentication,async(req:any,res:any)=>{
//     let uploads=await

// })

export default videouploadrouter
