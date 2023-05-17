import { CgDetailsMore } from 'react-icons/cg'
import { FiDelete } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import avataPlaceholder from '../../asset/images/avatar-placeholder.png'
import { UserSchema } from '../../schema/user'

type CardUserPropsType = {
	user: UserSchema
	handleDeleteUser: (email: string) => Promise<void>
}

function CardUser({ user, handleDeleteUser }: CardUserPropsType) {
	const navigate = useNavigate()

	return (
		<div
			className='w-full rounded-md px-3 py-2 relative'
			style={{
				border: '.5px solid rgba(0,0,0,.1)'
			}}
		>
			<div className='flex justify-center items-center'>
				<div className='rounded-full w-[120px] h-[120px]'>
					<img
						className='rounded-full w-full h-full object-cover'
						src={user.image || avataPlaceholder}
						alt={user.username}
					/>
				</div>
			</div>
			<h1 className='font-bold mt-2 text-xl text-center line-clamp-1'>
				{user.username}
			</h1>
			<p className='line-clamp-1 w-full mt-5 text-secondary'>
				{user.bio || 'No bio yet'}
			</p>
			<button
				className='absolute top-2.5 right-2.5'
				title='Xem'
				onClick={() => navigate(`/users/${user.username}`)}
			>
				<CgDetailsMore className='text-2xl' />
			</button>
			<button
				className='absolute top-2.5 left-2.5'
				title='Xóa'
				onClick={() => handleDeleteUser(user.email)}
			>
				<FiDelete className='text-2xl rotate-180' />
			</button>
		</div>
	)
}

export default CardUser
