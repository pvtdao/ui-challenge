import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserLogin, UserRegister } from '../../schema/user'
import { login, register } from '../../services/user'

export const handleRegister = createAsyncThunk(
	'user/register',
	async (payload: UserRegister, thunkAPI) => {
		// Sử dụng thunkAPI để dispatch action khác, ví dụ như loading
		// Call API
		const response = await register(payload)
		console.log('🚀 ~ file: userSlice.ts:11 ~ response:', response)

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
			console.log('🚀 payload:', action)
			console.log('🚀 state:', state)
			state.current = action.payload
		},
		logout(state) {
			localStorage.removeItem('guestToken')
			localStorage.removeItem('@user')
			state.current = null
		}
	},
	extraReducers: {
		'user/register/fulfilled': (state, action) => {
			// state là state hiện tại, action là thông tin action
			// hàm handleRegister ở trên return ra gì thì action.payload sẽ nhận được cái đó
			state.current = action.payload
		},
		'user/login/fulfilled': (state, action) => {
			state.current = action.payload
		}
	}
})

const { reducer, actions } = userSlice
export const { setUser, logout } = actions
export default reducer
