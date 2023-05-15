import axios from 'axios'

const isServer = typeof window === 'undefined'

export const initiateAxios = () => {
	axios.defaults.baseURL = 'http://localhost:3000/api'
	axios.defaults.timeout = 60000
	// axios.defaults.withCredentials = true

	if (!isServer) {
		axios.interceptors.request.use(
			async function (config) {
				let token = localStorage.getItem('guestToken')

				if (token && config.headers) {
					config.headers['Authorization'] = `Bearer ${token}`
				}

				return config
			},
			function (error) {
				return Promise.reject(error)
			}
		)
		axios.interceptors.response.use(
			function (response) {
				return response
			},
			function (error) {
				return Promise.reject(error)
			}
		)
	}
}
