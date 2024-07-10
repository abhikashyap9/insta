import {beforeAll, describe, expect, test, afterAll} from 'vitest'
import {math} from './math'
import {UserType} from '../types/userType'
import request from 'supertest'
import app from '../../app'
import mongoose from 'mongoose'


test('math.sqrt()', () => {
	expect(math.sqrt(4)).toBe(2)
	expect(math.sqrt(144)).toBe(12)
	expect(math.sqrt(2)).toBe(math.SQRT2)
})
beforeAll(async () => {
	// await initMongodb.connect()
	await mongoose.connect(
		'mongodb+srv://abhishek:abhishek%4078@insta.bpmz0tv.mongodb.net/?retryWrites=true&w=majority'
	)
})

afterAll(async () => {
await mongoose.disconnect();
});
describe('validate missing params', () => {
test('should throw error when any key is missing',async()=>{
	let userData: UserType = {
		email: 'newEmail@gmail.com',
		fullName: 'abhishek909',
		password: 'Abhishek',
	}
	const response = await request(app).post('/sign/up').send(userData)
	expect(response.status).to.equal(400)
	expect(response.body).toMatchObject({error:"missing params"})
})
})

describe('validate input field', () => {
	test('should not login when user name is short', async () => {
		let userData: UserType = {
			email: 'newEmail@gmail.com',
			fullName: 'abhishek909',
			userName: 'abhi',
			password: 'Abhishek',
		}
		const response = await request(app).post('/sign/up').send(userData)
		expect(response.status).to.equal(400)
		expect(response.body).toMatchObject({error:"user name is short"})
	})

	test('should not login when full name is short', async () => {
		let userData: UserType = {
			email: 'newEmail@gmail.com',
			fullName: 'abhi',
			userName: 'abhishek89',
			password: 'Abhishek',
		}
		const response = await request(app).post('/sign/up').send(userData)
		expect(response.status).to.equal(400)
		expect(response.body).toMatchObject({error:"full name is short"})
	})

  test('should not login when email existed', async () => {
	let userData: UserType = {
		email: 'abhishek87657@gmail.com',
		fullName: 'abhishek',
		userName: 'abhishek',
		password: 'Abhishek',
	}
		const response = await request(app).post('/sign/up').send(userData)
		expect(response.status).to.equal(409)
		expect(response.body).toMatchObject({error:"User Email Already Exist"})
	})

  test('should not login when name existed', async () => {
	let userData: UserType = {
		email: 'newEmail@gmail.com',
		fullName: 'abhishek9909',
		userName: 'abhishek9091',
		password: 'Abhishek',
	}
		const response = await request(app).post('/sign/up').send(userData)
		expect(response.status).to.equal(409)
		expect(response.body).toMatchObject({error:"User Name Already Exist"})
	})


})

describe('Success', () => {
	test('it should login when all key are present ',async()=>{
		let userData: UserType = {
			email: 'NewEmail99099@gmail.com',
			fullName: 'NewTestUser9',
			userName:'NewTestUser99',
			password: 'TestUser@789',
		}
		const response = await request(app).post('/sign/up').send(userData)
		expect(response.status).to.equal(201)
		expect(response.body).toMatchObject({message:"User created"})
	})
	})