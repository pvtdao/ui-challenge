import { Route, Routes } from 'react-router-dom'
import './App.css'
import { initiateAxios } from './api/initAxios'
import Footer from './components/Footer'
import Header from './components/Header'
import LoginPage from './features/Auth/Login'
import RegisterPage from './features/Auth/Register'

initiateAxios()

function App() {
	return (
		<div className='App'>
			<Header />
			<div className='mt-16'>
				<Routes>
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/login' element={<LoginPage />} />
				</Routes>
			</div>
			<Footer />
		</div>
	)
}

export default App
