export type UserRegister = {
	username: string
	email: string
	password: string
}

export type UserLogin = {
	email: string
	password: string
}

export type UserSchema = {
	id: number
	email: string
	token: string
	username: string
	bio: string
	image: string
}

export type UserDetailSchema = {
	username: string
	bio: string
	image: string
}

export type UserUpdateSchema = {
	email: string
	username: string
	bio: string
	image: string | ArrayBuffer
}
