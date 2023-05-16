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
	author: Pick<UserSchema, 'bio' | 'email' | 'id' | 'image' | 'username'>
}

export type CreateArticle = {
	title: string
	description: string
	body: string
	tagList: string[]
}
