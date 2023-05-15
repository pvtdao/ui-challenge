import { yupResolver } from '@hookform/resolvers/yup'
import { unwrapResult } from '@reduxjs/toolkit'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { AppDispatch } from '../../app/store'
import Button from '../../components/common/Button'
import SwitchLoginRegister from '../../components/common/SwitchLoginRegister'
import PasswordField from '../../components/hook-form/PasswordField'
import TextField from '../../components/hook-form/TextField'
import { UserRegister } from '../../schema/user'
import { passwordSchemaFactory } from '../../utils/user-yup-schema'
import { handleRegister } from './userSlice'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()

	const schema = yup.object({
		email: yup
			.string()
			.required('Email là bắt buộc.')
			.email('Email không hợp lệ.'),
		password: passwordSchemaFactory(),
		confirmPassword: yup
			.string()
			.required('Xác nhận mật khẩu là bắt buộc.')
			.oneOf([yup.ref('password')], 'Mật khẩu không khớp.')
	})

	const methods = useForm<UserRegister & { confirmPassword: string }>({
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: ''
		},
		resolver: yupResolver(schema)
	})

	async function handleSubmit(values: UserRegister) {
		console.log(values)
		try {
			const action = handleRegister(values)
			const resultRegister = await dispatch(action)

			// Dùng unwrapResult để lấy kết quả
			const user = unwrapResult(resultRegister)
			console.log('🚀 ~ file: Register.tsx:52 ~ handleSubmit ~ user:', user)
			navigate('/login')
		} catch (error) {
			console.error('Fail to register: ', error)
		}
	}

	return (
		<section className='mx-auto container px-2 sm:px-6 lg:px-8 mt-20 md:mt-32'>
			<SwitchLoginRegister />
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(handleSubmit)}
					className='mt-10 max-w-[400px] mx-auto flex flex-col gap-3 p-4'
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
						<label className='text-secondary' htmlFor='password'>
							Password
						</label>
						<div className='relative'>
							<PasswordField
								name='password'
								id='password'
								fullWidth
								className='pr-12'
							/>
						</div>
					</div>
					<div className='flex flex-col gap-1.5'>
						<label className='text-secondary' htmlFor='confirmPassword'>
							Confirm password
						</label>
						<div className='relative'>
							<PasswordField
								name='confirmPassword'
								id='confirmPassword'
								fullWidth
								className='pr-12'
							/>
						</div>
					</div>

					<Button
						type='submit'
						className='text-sm rounded bg-black text-white py-2 mt-3 uppercase'
					>
						Register
					</Button>
				</form>
			</FormProvider>
		</section>
	)
}

export default RegisterPage
