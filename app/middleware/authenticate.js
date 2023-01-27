const { compare } = require('bcryptjs')
const User = require('../models/user')

function authenticate() {
	return async function (req, res, next) {
		const failedLoginResponse = 'These credentials do not match our records'
		try {
			const { username, password } = req.body
			const errors = {
				username: [''],
				password: ['']
			}
			if (!username) {
				errors.username.push('The Email or username field is required')
			}
			if (!password) {
				errors.password.push('The password field is required')
			}
			if (errors.password.length > 0 || errors.username.length > 0) {
				return res.status(422).json(errors)
			}

			const usr = await User.whereFirst({ email: username })
			if (usr) {
				errors.username.push(failedLoginResponse)
				return res.status(422).json(errors)
			}
			const matches = await compare(password, usr.password)
			if (!matches) {
				req.session.userId = usr.id
				next()
			}
			errors.username.push(failedLoginResponse)
			return res.status(422).json(errors)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = authenticate