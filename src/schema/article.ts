import { UserSchema } from './user'

export type ArticelSchema = {
	id: number
	slug: string
	title: string
	description: string
	body: string
	created: Date
	updated: Date
	tagList: string[]
	favoriteCount: number
	comments: CommentSchema[]
	author: Pick<UserSchema, 'bio' | 'email' | 'id' | 'image' | 'username'>
}

export type CreateArticle = {
	title: string
	description: string
	body: string
	tagList: string[]
}

export type CommentSchema = {
	author: UserSchema
	body: string
	id: number
}
