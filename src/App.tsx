import { Route, Routes } from 'react-router-dom'
import './App.css'
import { initiateAxios } from './api/initAxios'
import Footer from './components/Footer'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './features/Auth/Login'
import RegisterPage from './features/Auth/Register'
import ArticlePage from './pages/Article'
import ArticleDetail from './pages/Article/ArticleDetail'
import UserPage from './pages/User'
import UserDetailPage from './pages/User/UserDetail'
import UserEditPage from './pages/User/UserEdit'

initiateAxios()

function App() {
	return (
		<div className='App'>
			<Header />
			<div className='mt-16'>
				<Routes>
					<Route
						path='/register'
						element={
							<ProtectedRoute>
								<RegisterPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/login'
						element={
							<ProtectedRoute>
								<LoginPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/users'
						element={
							<ProtectedRoute>
								<UserPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/users/:username'
						element={
							<ProtectedRoute>
								<UserDetailPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/users/:username/edit'
						element={
							<ProtectedRoute>
								<UserEditPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/articles/:slug'
						element={
							<ProtectedRoute>
								<ArticleDetail />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/articles/:slug/update'
						element={
							<ProtectedRoute>
								<ArticleDetail />
							</ProtectedRoute>
						}
					/>
					<Route path='/articles' element={<ArticlePage />} />
				</Routes>
			</div>
			<Footer />
		</div>
	)
}

export default App
