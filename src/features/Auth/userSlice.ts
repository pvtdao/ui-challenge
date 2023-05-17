import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserLogin, UserRegister } from '../../schema/user'
import { login, register } from '../../services/user'

export const handleRegister = createAsyncThunk(
	'user/register',
	async (payload: UserRegister, thunkAPI) => {
		const response = await register(payload)

		return response.data
	}
)

export const handleLogin = createAsyncThunk(
	'user/login',
	async (payload: UserLogin) => {
		const data = await login(payload)

		return data.user
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState: {
		current: JSON.parse(localStorage.getItem('@user') || 'null')
	},
	reducers: {
		setUser(state, action) {
			state.current = action.payload
		},
		logout(state) {
			localStorage.removeItem('guestToken')
			localStorage.removeItem('@user')
			state.current = null
		}
	},
	extraReducers: {
		'user/login/fulfilled': (state, action) => {
			state.current = action.payload
		}
	}
})

const { reducer, actions } = userSlice
export const { setUser, logout } = actions
export default reducer
