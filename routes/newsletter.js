const DB = require('../app/db')

const router = require('express').Router()

router.post('/', async (req, res, next) => {
	const errors = {}
	const name = req.body.name
	const email = req.body.email
	let user_id = 0

	if (!name) {
		errors['name'] = 'Name is required'
	}
	if (!email) {
		errors['email'] = 'Email is required'
	}

	if (Object.keys(errors).length > 0) {
		res.render('newsletter-reg', { errors })
		return
	}

	try {
		// Create or get user
		const user = await DB.table('users').where({ email }).first()
		if (!user) {
			const res = await DB('users').insert({ name, email, password: 'foo' })
			user_id = res[0]
		} else {
			user_id = user.id
		}

		// check if the user is sub
		const hasSub = await DB('subscriptions').where({ user_id }).first()
		if (!hasSub) {
			await DB.table('subscriptions').insert({ user_id })
		}

		res.render('newsletter-success')
	} catch (error) {
		next(error)
	}
})

router.get('/', (req, res) => {
	res.render('newsletter-reg')
})

module.exports = router
