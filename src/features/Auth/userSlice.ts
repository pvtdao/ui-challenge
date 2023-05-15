import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { register } from '../../services/user'
import { UserRegister } from '../../schema/user'

export const handleRegister = createAsyncThunk(
	'user/register',
	async (payload: UserRegister, thunkAPI) => {
		// Sử dụng thunkAPI để dispatch action khác, ví dụ như loading
		// Call API
		const response = await register(payload)
		console.log('🚀 ~ file: userSlice.ts:11 ~ response:', response)

		// Save data to local storage
		return response.data
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState: {
		current: {}
	},
	reducers: {},
	extraReducers: {
		'user/register/fulfilled': (state, action) => {
			// state là state hiện tại, action là thông tin action
			// hàm handleRegister ở trên return ra gì thì action.payload sẽ nhận được cái đó
			state.current = action.payload
		}
	}
})

const { reducer } = userSlice
export default reducer
