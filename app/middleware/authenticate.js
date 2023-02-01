const { compare } = require('bcryptjs')
const DB = require('../db')

function authenticate() {
	return async function (req, res, next) {
		const failedLoginResponse = 'These credentials do not match our records'
		try {
			const { username, password } = req.body
			const errors = {
				username: [],
				password: []
			}
			if (!username) {
				errors.username.push('The Email or username field is required')
			}
			if (!password) {
				errors.password.push('The password field is required')
			}
			if (errors.password.length > 0 || errors.username.length > 0) {
				return res.render('login', {
					errors
				})
			}

			const usr = await DB('users').where({ email: username }).select('*').first()
			if (usr == undefined) {
				errors.username.push(failedLoginResponse)
				return res.render('login', {
					errors
				})
			}
			const matches = await compare(password, usr.password)
			if (!matches) {
				req.session.userId = usr.id
				return res.redirect(302, '/dashboard')
			}
			errors.username.push(failedLoginResponse)
			return res.render('login', {
				errors
			})
		} catch (error) {
			next(error)
		}
	}
}

module.exports = authenticate