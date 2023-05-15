import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function SwitchLoginRegister() {
	const router = useLocation()
	return (
		<div className='mx-auto max-w-[400px] w-full p-2.5'>
			<h1 className='text-center text-xl mb-5 font-semibold'>
				Login or create new account
			</h1>

			<div className='rounded p-1 flex justify-between gap-2 bg-[#EFEFEF]'>
				<Link
					className={`p-2 rounded w-full text-center  ${
						router.pathname === '/login' &&
						'bg-white pointer-events-none select-none'
					}`}
					to='/login'
				>
					Login
				</Link>
				<Link
					className={`p-2 rounded w-full text-center  ${
						router.pathname === '/register' &&
						'bg-white pointer-events-none select-none'
					}`}
					to='/register'
				>
					Register
				</Link>
			</div>
		</div>
	)
}

export default SwitchLoginRegister
