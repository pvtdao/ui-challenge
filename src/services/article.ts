import axios from 'axios'
import { ArticelSchema, CreateArticle } from '../schema/article'

const endpoint = '/articles'

export const getAllArticles = async (): Promise<{
	articles: ArticelSchema[]
	articlesCount: number
}> => {
	return axios.get(`${endpoint}`).then((res) => res.data)
}

export const getArticleBySlug = async (
	slug: string
): Promise<{
	article: ArticelSchema
}> => {
	return axios.get(`${endpoint}/${slug}`).then((res) => res.data)
}

export const updateArticleBySlug = async (
	slug: string,
	payload: CreateArticle
): Promise<{
	article: ArticelSchema
}> => {
	return axios.put(`${endpoint}/${slug}`, payload).then((res) => res.data)
}

export const createArticle = async (payload: CreateArticle) => {
	return axios.post(`${endpoint}`, payload)
}

export const deleteArticleBySlug = async (slug: string) => {
	return axios.delete(`${endpoint}/${slug}`)
}

export const createComment = async (
	slug: string,
	payload: { body: string }
): Promise<{ article: ArticelSchema }> => {
	return axios
		.post(`${endpoint}/${slug}/comments`, payload)
		.then((res) => res.data)
}

export const deleteCommentById = async (
	slug: string,
	id: number
): Promise<{ article: ArticelSchema }> => {
	return axios
		.delete(`${endpoint}/${slug}/comments/${id}`)
		.then((res) => res.data)
}

export const updateCommentById = async (
	slug: string,
	id: number,
	payload: { body: string }
): Promise<{ article: ArticelSchema }> => {
	return axios
		.put(`${endpoint}/${slug}/comments/${id}`, payload)
		.then((res) => res.data)
}
