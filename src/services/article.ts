import axios from 'axios'

const endpoint = '/articles'

export const getAllArticles = async () => {
	return axios.get(`${endpoint}`)
}
