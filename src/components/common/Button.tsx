import React, { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
	children: ReactNode | string
	type?: string
	fullWidth?: boolean
}

const Button = React.memo(
	(props: ButtonProps & Partial<ButtonHTMLAttributes<HTMLButtonElement>>) => {
		const {
			children,
			fullWidth = false,
			className = '',
			type = 'button',
			...rest
		} = props
		return (
			<button
				{...rest}
				className={`select-none curos-pointer ${
					fullWidth && 'w-full'
				}  ${className}`}
				type={type}
			>
				{children}
			</button>
		)
	}
)

type ButtonHoverProps = {
	text: string
	type?: string
	fullWidth?: boolean
	active?: boolean
}

export const ButtonHover = React.memo(
	(
		props: ButtonHoverProps &
			Partial<ButtonHTMLAttributes<HTMLButtonElement>> & {
				childClassName?: string
			}
	) => {
		const {
			text,
			fullWidth = false,
			className = '',
			childClassName = '',
			disabled = false,
			active,
			type = 'button',
			...rest
		} = props
		return (
			<button
				{...rest}
				className={`select-none curos-pointer group relative  ${
					!disabled
						? 'hover:ring-1 hover:ring-offset-2 hover:ring-primary hover:bg-primary'
						: 'cursor-not-allowed opacity-[.35] pointer-events-none'
				}  ${
					active ? 'bg-primary hover:ring-[1] hover:ring-offset-[unset]' : ''
				} transition-all ease-out duration-300  ${
					fullWidth && 'w-full'
				}  ${className}`}
				type={type}
			>
				<span
					className={` relative  transition duration-300 group-hover:text-white ease ${childClassName} ${
						active && 'text-[#fff]'
					}`}
				>
					{text}
				</span>
			</button>
		)
	}
)

export default Button
