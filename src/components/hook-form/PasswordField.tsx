import React, { InputHTMLAttributes, useState } from 'react'
import { Control, useController } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

type PropsType = {
	control?: Control | any
	name: string
	fullWidth?: boolean
}

function PasswordField(
	props: PropsType & Partial<InputHTMLAttributes<HTMLInputElement>>
) {
	const [isShow, setIsShow] = useState<boolean>(false)

	const {
		control,
		name,
		className = '',
		fullWidth = false,
		...textFieldProps
	} = props

	const {
		field: { ref: inputRef, ...inputProps },
		fieldState: { error }
	} = useController({ name, control })

	const togglePassword = () => {
		setIsShow(!isShow)
	}

	return (
		<div className={`inline-block ${fullWidth && 'w-full'}`}>
			<div className='relative'>
				<input
					type={isShow ? 'text' : 'password'}
					{...inputProps}
					{...inputRef}
					{...textFieldProps}
					className={`relative border px-2 py-1 rounded outline-none w-full ${className} ${
						error && 'border-[.5px] border-rose-500'
					}`}
				/>
				<div
					onClick={togglePassword}
					className={`absolute right-[5px] cursor-pointer h-full flex items-center  top-0`}
				>
					{!isShow ? (
						<AiOutlineEyeInvisible />
					) : (
						<AiOutlineEye fill='#707070' />
					)}
				</div>
			</div>
			{!!error && (
				<p className='bottom-0 text-[13px] text-error ml-2 mt-1'>
					{error.message}
				</p>
			)}
		</div>
	)
}

export default PasswordField
