import axios from 'axios'
import {
	UserRegister,
	UserLogin,
	UserSchema,
	UserDetailSchema
} from '../schema/user'

const endpoint = '/profiles'

export const getDetailByUsername = async (
	username: string
): Promise<{ profile: UserDetailSchema }> => {
	return axios.get(`${endpoint}/${username}`).then((res) => res.data)
}
