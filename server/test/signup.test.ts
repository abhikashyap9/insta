import request from 'supertest'
import app from '../app'
import dropCollections from '../utils/dropCollections'
import initMongodb from '../utils/initMongodb'
import mongoose from 'mongoose'
import type {UserType} from '../types/userType'

let userData: UserType = {
	email: 'abhishek8765@gmail.com',
	fullName: 'abhishek',
	userName: 'abhibhadwal',
	password: 'Abhishek',
}

let userDataWithoutPassword = {
	...userData,
}
delete userDataWithoutPassword.password

let userDataLogin = {
	email: userData.email,
	password: userData.password,
}
describe('Test the root path', () => {
	beforeAll(async () => {
		// console.log(initMongodb)
		await initMongodb.connect()
		await dropCollections(initMongodb.mongoose.connection)
	})

	afterAll((done) => {
		mongoose.disconnect(done)
	})
	test('Create New User', async () => {
		const response = await request(app).post('/signup').send(userData)
		expect(response.statusCode).toBe(201)
		expect(response._body).toMatchObject(userDataWithoutPassword)
	})
	test('should not signin with exiting email', async () => {
		const response = await request(app).post('/signup').send(userData)
		expect(response.statusCode).toBe(409)
		expect(response._body).toMatchObject({error: 'User Email Already Exist'})
	})

	test('should not signup with exiting username', async () => {
		const response = await request(app)
			.post('/signup')
			.send({...userData, email: 'any_new_email@gmail.com'})
		expect(response.statusCode).toBe(409)
		console.log('resonse', response._body)
		expect(response._body).toMatchObject({error: 'User Name Already Exist'})
	})

	// test('should not signin with exiting username', async () => {
	//     const response = await request(app).post('/signin').send(userData)
	//     expect(response.statusCode).toBe(409)
	//     expect(response._body).toMatchObject({ "error": "User Name Already Exist", })
	// })

	test('Login Api', async () => {
		const response = await request(app).post('/login').send(userDataLogin)
		expect(typeof response._body.token).toBe('string')
		expect(response._body.username).toBe(userData.fullName)
		expect(response.statusCode).toBe(200)
	})

	test('should not login when bad lpasswrod', async () => {
		const response = await request(app)
			.post('/login')
			.send({...userData, password: 'BAD_PASSWORD'})
		expect(response._body.error).toBe('Invalid Password')
	})

	// todo
	// 1) should not signup user with existing email
	// 2) Should not login when bad lpasswrod
	// 3) should not signup with exiting username
})

// describe("Test the root path", () => {
//     test("It should response the GET method", async () => {
//         const response = await request(app)
//             .get("/")
//         console.log(response.data)
//         console.log(response.statusCode)
//     })
// })
