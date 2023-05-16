import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { RootState } from '../../app/store'

const AUTH_PATH = ['/login', '/register']
const PRIVATE_PATH = ['/users']
const USER_PATH = '/users'

function ProtectedRoute({ children }: { children: React.ReactElement }) {
	const user = useSelector((state: RootState) => state.user)
	const location = useLocation()
	const isLoggedIn = user.current === null ? false : true
	const params = useParams()

	if (isLoggedIn && AUTH_PATH.includes(location.pathname)) {
		return <Navigate to='/' state={{ from: location }} />
	} else if (
		isLoggedIn &&
		user.current.username !== params.username &&
		location.pathname.includes('edit')
	) {
		return <Navigate to='/users' state={{ from: location }} />
	} else if (
		!isLoggedIn &&
		(PRIVATE_PATH.includes(location.pathname) ||
			location.pathname.startsWith(USER_PATH))
	) {
		return <Navigate to='/login' state={{ from: location }} />
	}
	return children
}

export default ProtectedRoute
