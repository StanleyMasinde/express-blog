function validatePost() {
	return function (req, res, next) {
		try {
			const errors = {
				title: [],
				body: []
			}
			const { title, body } = req.body
			if (!title) {
				errors.title.push('The title is required.')
			}
			if (!body) {
				errors.body.push('The body is required.')
			}
			if (errors.title.length > 0 || errors.body.length > 0) {
				return res.render('dashboard/posts/create', {
					errors
				})
			}
			return next()
		} catch (error) {
			return next(error)
		}
	}
}

module.exports = validatePost