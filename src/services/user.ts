import axios from 'axios'
import {
	UserLogin,
	UserRegister,
	UserSchema,
	UserUpdateSchema
} from '../schema/user'

const endpoint = '/users'

export const register = async (payload: UserRegister) => {
	return axios.post(`${endpoint}`, payload)
}

export const login = async (
	payload: UserLogin
): Promise<{ user: UserSchema }> => {
	return axios.post('/login', payload).then((res) => res.data)
}

export const getAllUser = async (): Promise<UserSchema[]> => {
	return axios.get(`${endpoint}`).then((res) => res.data)
}

export const deleteUserByEmail = async (email: string) => {
	return axios.delete(`${endpoint}/${email}`)
}

export const editUser = async (payload: UserUpdateSchema) => {
	return axios.put(`/user`, payload)
}
