/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./views/**/*.{pug,js}'],
	theme: {
		extend: {
			colors: {
				primary: '#1EE1C6',
				primaryDark: '#4BE7D1'
			}
		},
	},
	plugins: [
		require('@tailwindcss/forms')
	],
}
