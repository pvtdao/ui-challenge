import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { RootState } from '../../app/store'
import Button from '../../components/common/Button'
import TextField from '../../components/hook-form/TextField'
import { setUser } from '../../features/Auth/userSlice'
import { UserUpdateSchema } from '../../schema/user'
import { editUser } from '../../services/user'

function UserEditPage() {
	const user = useSelector((state: RootState) => state.user)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const schema = yup.object({
		email: yup
			.string()
			.required('Email là bắt buộc.')
			.email('Email không hợp lệ.'),
		username: yup.string().required('Username là bắt buộc.')
	})

	const methods = useForm<UserUpdateSchema>({
		defaultValues: {
			email: user.current.email,
			bio: user.current.bio || '',
			username: user.current.username || '',
			image: user.current.image
		},
		resolver: yupResolver(schema)
	})

	async function handleEditUser(values: UserUpdateSchema) {
		try {
			await editUser(values)

			const action = setUser({ ...user.current, ...values })
			dispatch(action)

			localStorage.setItem(
				'@user',
				JSON.stringify({ ...user.current, ...values })
			)
			navigate('/users')
		} catch (error) {
			console.error('Failed to update user: ', error)
		}
	}

	function handleChangeImage(e: any) {
		const image = e.target.files[0]

		let reader = new FileReader()
		if (image) {
			const prefix = image.type.split('/')

			if (prefix[0] === 'image') {
				reader.readAsDataURL(e.target.files[0])
				reader.onload = (e) => {
					if (e.target && e.target.result) {
						methods.setValue('image', e.target?.result)
					}
				}
				e.target.value = null
			}
		}
	}

	return (
		<div className='mx-auto container px-2 sm:px-6 lg:px-8 mt-32 min-h-[60vh]'>
			<h1 className='line-clamp-1 mt-4 text-xl text-center leading-[27px] font-semibold lg:text-2xl'>
				Update user
			</h1>
			<FormProvider {...methods}>
				<form
					className='mt-5 max-w-[400px] mx-auto flex flex-col gap-3 p-4'
					onSubmit={methods.handleSubmit(handleEditUser)}
				>
					<div className='flex flex-col gap-1.5'>
						<label className='text-secondary' htmlFor='email'>
							Email
						</label>
						<TextField name='email' id='email' />
					</div>
					<div className='flex flex-col gap-1.5'>
						<label className='text-secondary' htmlFor='username'>
							Username
						</label>
						<TextField name='username' id='username' />
					</div>
					<div className='flex flex-col gap-1.5'>
						<label className='text-secondary' htmlFor='bio'>
							Bio
						</label>
						<TextField name='bio' id='bio' />
					</div>
					<div className='flex flex-col gap-1.5'>
						<label className='text-secondary' htmlFor='image'>
							Image
						</label>
						<input
							onChange={(e) => handleChangeImage(e)}
							type='file'
							accept='image/*'
							defaultValue=''
							name='image'
						/>
					</div>
					<div className='flex justify-center gap-2'>
						<Button
							onClick={() => navigate(`/users/${user.current.username}`)}
							className='text-sm rounded bg-black text-white py-2 mt-10 px-5'
						>
							Back
						</Button>

						<Button
							type='submit'
							className='text-sm rounded bg-black text-white py-2 mt-10 px-5'
						>
							Save
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}

export default UserEditPage
