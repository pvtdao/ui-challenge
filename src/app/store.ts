import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/Auth/userSlice'

const rootReducer = {
	user: userReducer
}

const store = configureStore({
	reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store
