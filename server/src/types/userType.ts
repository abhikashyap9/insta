export interface UserType {
	email?: String
	fullName?: String
	userName?: String
	password?: String
	id?: String
}

export type ReqAuthType = {auth: {userId: string}}
