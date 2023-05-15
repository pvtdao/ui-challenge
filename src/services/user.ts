import axios from 'axios'
import { UserRegister, UserLogin } from '../schema/user'

const endpoint = '/users'

export const register = async (payload: UserRegister) => {
	return axios.post(`${endpoint}`, payload)
}

export const login = async (payload: UserLogin) => {
	return axios.post('/login', payload)
}

export const getAllUser = async () => {
	return axios.get(`${endpoint}`)
}

export const deleteUserByEmail = async (email: string) => {
	return axios.delete(`${endpoint}/${email}`)
}
