function auth() {
	return function (req, res, next) {
		try {
			if (!req.session.userId) {
				return res.redirect('/auth/login')
			}
			return next()
		} catch (error) {
			return next(error)
		}
	}
}

module.exports = auth