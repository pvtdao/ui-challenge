import * as yup from 'yup'

const REGEX = {
	PASSWORD: /[!@#_.\-`$%^&*()+=\[\]{};':"\\|,<>\/?~]/,
	SPACE_AT_START_END: /^\s+|\s+$/g,
	NON_ASCII: /[^\u0000-\u007F]+/,
	CHARACTER: /[a-zA-Z]/,
	NUMBER: /[0-9]/
}

export const passwordSchemaFactory = () => {
	return yup
		.string()
		.required('Mật khẩu là bắt buộc.')
		.min(
			8,
			'Mật khẩu phải có 8-40 ký tự bao gồm chữ cái (a-Z), số (0-9) và ký tự đặc biệt.'
		)
		.max(
			40,
			'Mật khẩu phải có 8-40 ký tự bao gồm chữ cái (a-Z), số (0-9) và ký tự đặc biệt.'
		)
		.test(
			'Have space at start/end',
			'Mật khẩu không được chứa khoảng trắng.',
			(value) => !value?.match(REGEX.SPACE_AT_START_END) && !value?.match(/[ ]/)
		)
		.test(
			'Password rule',
			'Mật khẩu phải có 8-40 ký tự bao gồm chữ cái (a-Z), số (0-9) và ký tự đặc biệt.',
			(value) =>
				!value?.match(REGEX.NON_ASCII) && !!value?.match(REGEX.CHARACTER)
		)
		.matches(
			REGEX.NUMBER,
			'Mật khẩu phải có 8-40 ký tự bao gồm chữ cái (a-Z), số (0-9) và ký tự đặc biệt.'
		)
		.matches(
			REGEX.PASSWORD,
			'Mật khẩu phải có 8-40 ký tự bao gồm chữ cái (a-Z), số (0-9) và ký tự đặc biệt.'
		)
}
