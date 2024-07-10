import * as fs from 'fs'
import Handlebars from 'handlebars'
import nodemailer from 'nodemailer'

const logincontent = fs.readFileSync('OtpEmail.html', 'utf8')

export const signupConfirmation = async (name: string, email: string, signup_otp: string) => {
	const template = Handlebars.compile(logincontent)

	var replacements = {
		name: name,
		otp: signup_otp,
	}

	var htmlToSend = template(replacements)

	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: config.emailUser,
				pass: config.emailPassword,
			},
			debug: false,
			logger: false,
		})
		const info = await transporter.sendMail({
			from: process.env.EMAIL,
			to: email,
			subject: 'For Login',
			text: `Hi ${name}`,
			html: htmlToSend,
		})
		return info
	} catch (err) {
		console.log('err', err)
	}
}

interface config {
	secret_jwt: String
	emailUser: String
	emailPassword: String
}

const config = {
	secret_jwt: 'Thisismysecretkey',
	emailUser: 'abhikashyap9909@gmail.com',
	emailPassword: 'jgeosrekezhhecib',
}