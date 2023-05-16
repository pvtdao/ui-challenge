import { useEffect, useState } from 'react'
import CardUser from '../../components/common/CardUser'
import { UserSchema } from '../../schema/user'
import { deleteUserByEmail, getAllUser } from '../../services/user'

function UserPage() {
	const [userList, setUserList] = useState<UserSchema[]>([])

	async function fetchUser() {
		try {
			const data = await getAllUser()
			setUserList(data)
		} catch (error) {
			console.error('Fail to fetch all user: ', error)
		}
	}

	async function handleDeleteUser(email: string) {
		try {
			await deleteUserByEmail(email)
			fetchUser()
		} catch (error) {
			console.error('Fail to delete user: ', error)
		}
	}

	useEffect(() => {
		fetchUser()
	}, [])

	return (
		<div className='mx-auto container px-2 sm:px-6 lg:px-8 mt-32'>
			<h1 className='text-center text-2xl font-medium'>User</h1>

			<div className='py-10 grid sm:grid-cols-2 md:grid-cols-3 place-items-center gap-3'>
				{userList.map((user) => {
					return (
						<CardUser
							key={user.id}
							user={user}
							handleDeleteUser={(email: string) => handleDeleteUser(email)}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default UserPage
