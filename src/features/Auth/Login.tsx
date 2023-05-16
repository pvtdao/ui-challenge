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
import { UserLogin } from '../../schema/user'
import { handleLogin } from './userSlice'

function LoginPage() {
	const dispatch = useDispatch<AppDispatch>()

	const schema = yup.object({
		email: yup
			.string()
			.required('Email là bắt buộc.')
			.email('Email không hợp lệ.'),
		password: yup.string().required('Xác nhận mật khẩu là bắt buộc.')
	})

	const methods = useForm<UserLogin>({
		defaultValues: {
			email: '',
			password: ''
		},
		resolver: yupResolver(schema)
	})

	async function handleSubmit(values: UserLogin) {
		try {
			const action = handleLogin(values)
			const resultLogin = await dispatch(action)
			const user = unwrapResult(resultLogin)

			localStorage.setItem('guestToken', user.token)
			localStorage.setItem('@user', JSON.stringify(user))
		} catch (error) {
			console.error('Fail to login: ', error)
		}
	}

	return (
		<section className='mx-auto container px-2 sm:px-6 lg:px-8 mt-20 md:mt-32 min-h-[60vh]'>
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

					<Button
						type='submit'
						className='text-sm rounded bg-black text-white py-2 mt-3 uppercase'
					>
						Login
					</Button>
				</form>
			</FormProvider>
		</section>
	)
}

export default LoginPage
