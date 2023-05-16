import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../app/store'
import avataPlaceholder from '../../asset/images/avatar-placeholder.png'
import Button from '../../components/common/Button'
import { UserDetailSchema } from '../../schema/user'
import { getDetailByUsername } from '../../services/profile'

function UserDetailPage() {
	const userState = useSelector((state: RootState) => state.user)
	const navigate = useNavigate()
	const params = useParams()
	const { username } = params
	const [user, setUser] = useState<UserDetailSchema>()

	async function fetchUserDetail() {
		if (!username) return
		try {
			const data = await getDetailByUsername(username)
			setUser(data.profile)
		} catch (error) {
			console.error('Failed to fetch user detail: ', error)
		}
	}

	useEffect(() => {
		fetchUserDetail()
	}, [username])

	return (
		<div className='mx-auto container px-2 sm:px-6 lg:px-8 mt-32 min-h-[60vh]'>
			{user ? (
				<div className='flex flex-col md:flex-row gap-10'>
					<div className='w-full md:max-w-[300px] flex flex-col justify-center items-center self-start'>
						<div className='rounded-full w-[120px] h-[120px]'>
							<img
								className='rounded-full'
								src={user?.image || avataPlaceholder}
								alt={user?.username}
							/>
						</div>
						<h1 className='line-clamp-1 mt-4 text-xl text-center leading-[27px] font-semibold lg:text-2xl'>
							{user?.username}
						</h1>
					</div>
					<div className='text-left'>
						{user?.bio ? <p> {user.bio} </p> : <p>No bio yet</p>}
					</div>
				</div>
			) : (
				<h1 className='text-center text-2xl font-medium'>Không có dữ liệu</h1>
			)}

			<div className='flex justify-center md:justify-start gap-2'>
				<Button
					onClick={() => navigate('/users')}
					className='text-sm rounded bg-black text-white py-2 mt-10 px-5'
				>
					Back
				</Button>
				{user?.username === userState.current.username && (
					<Button
						onClick={() => navigate(`/users/${username}/edit`)}
						className='text-sm rounded bg-black text-white py-2 mt-10 px-5'
					>
						Edit
					</Button>
				)}
			</div>
		</div>
	)
}

export default UserDetailPage
