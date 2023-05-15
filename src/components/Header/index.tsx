import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import avataPlaceholder from '../../asset/images/avatar-placeholder.png'

function Header() {
	const location = useLocation()
	const [isOpen, setIsOpen] = useState(false)

	const navigation = [
		{ name: 'Home', href: '/', current: true },
		{ name: 'Articles', href: '/articles', current: false },
		{ name: 'User', href: '/users', current: false }
	]

	useEffect(() => {
		handleCloseMenu()
	}, [location.pathname])

	function handleOpenMenu() {
		setIsOpen(!isOpen)
	}

	function handleCloseMenu() {
		console.log('Voo')
		setIsOpen(false)
	}

	return (
		<nav className='bg-white shadow fixed top-0 w-full z-10'>
			<div className='mx-auto container px-2 sm:px-6 lg:px-8'>
				<div className='relative flex h-16 bg-white items-center justify-between'>
					<div className='btn-menu-mobile absolute'>
						<button
							onClick={handleOpenMenu}
							type='button'
							className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
							aria-controls='mobile-menu'
							aria-expanded='false'
						>
							{!isOpen ? (
								<svg
									className='sm:hidden h-6 w-6'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
									/>
								</svg>
							) : (
								<svg
									className='sm:hidden h-6 w-6'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							)}
						</button>
					</div>
					<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
						<div className='flex flex-shrink-0 items-center'>
							<Link
								to='/'
								className='text-2xl font-bold block h-8 w-auto lg:hidden'
							>
								<h1>DaoPVT</h1>
							</Link>

							<Link
								to='/'
								className='text-2xl font-bold hidden h-8 w-auto lg:block'
							>
								<h1>DaoPVT</h1>
							</Link>
						</div>
						<div className='hidden sm:ml-6 sm:flex flex-1 justify-center'>
							<div className='flex items-center  space-x-4'>
								{navigation.map((item, idx) => {
									return (
										<Link
											className={`${
												location.pathname === item.href
													? 'bg-primary text-white'
													: 'hover:bg-primary/50 hover:text-black/50'
											} px-4 py-1 rounded-md `}
											to={item.href}
											key={idx}
										>
											{item.name}
										</Link>
									)
								})}
							</div>
						</div>
					</div>
					<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:relative sm:inset-auto sm:ml-6 sm:pr-0'>
						<div className='relative ml-3 group line-after'>
							<div className=''>
								<Link
									to={'/register'}
									className='flex rounded-full bg-gray-800 text-sm'
								>
									<img
										className='h-8 w-8 rounded-full'
										src={avataPlaceholder}
										alt=''
									></img>
								</Link>

								<div className='hidden group-hover:block absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
									<Link
										className='text-right hover:text-white hover:bg-primary block py-2 px-4'
										to='/profile'
									>
										Profile
									</Link>
									<p className='text-right hover:text-white hover:bg-primary py-2 px-4 cursor-pointer'>
										Log out
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				className={`menu-mobile sm:hidden absolute shadow pb-2 ${
					isOpen && 'active'
				} `}
			>
				<div className='space-y-1 px-2 pb 3 pt-2 flex flex-col'>
					{navigation.map((item, idx) => {
						return (
							<Link
								className={`${
									location.pathname === item.href
										? 'bg-primary text-white'
										: 'hover:bg-primary/50 hover:text-black/50'
								} px-4 py-2 rounded-md `}
								to={item.href}
								key={idx}
							>
								{item.name}
							</Link>
						)
					})}
				</div>
			</div>
		</nav>
	)
}

export default Header
