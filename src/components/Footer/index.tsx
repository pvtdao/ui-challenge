import React from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { FaDiscord, FaFacebookF } from 'react-icons/fa'

function Footer() {
	return (
		<footer className='relative mt-4 md:mt-0 sm:fixed bg-white bottom-0 w-full'>
			<div className='pb-5 md:pb-10 pt-5 mx-auto container px-2 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center md:items-end gap-2 md:gap-[2rem] h-full '>
				<p className='font-semibold'>
					Design & Develop by <span>PVTD</span>
				</p>
				<p className='font-semibold'>&copy; Copyright - 2023</p>
				<ul className='flex'>
					<li className='p-4 pb-0'>
						<a href='https://github.com/pvtdao' target='_blank'>
							<AiFillGithub className='text-2xl md:text-3xl' />
						</a>
					</li>
					<li className='p-4 pb-0'>
						<a href='https://www.facebook.com/PhanVuThanhDao' target='_blank'>
							<FaFacebookF className='text-2xl md:text-3xl' />
						</a>
					</li>
					<li className='p-4 pb-0'>
						<a
							href='https://discordapp.com/users/968331004064432168'
							target='_blank'
						>
							<FaDiscord className='text-2xl md:text-3xl' />
						</a>
					</li>
				</ul>
			</div>
		</footer>
	)
}

export default Footer
