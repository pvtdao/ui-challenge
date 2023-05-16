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
