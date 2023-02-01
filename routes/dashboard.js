const router = require('express').Router()
const auth = require('../app/middleware/auth')
const { queryBuilder } = require('../app/models/model')

router.get('/', auth(), async (req, res, next) => {
	try {
		const postCount = await queryBuilder('posts').count('* as agg')
		res.render('dashboard', {
			postCount: postCount[0].agg
		})
	} catch (error) {
		next(error)
	}
})

router.get('/posts', auth(), async (req, res, next) => {
	try {
		const posts = queryBuilder('posts').select()
		res.render('posts', {
			posts
		})
	} catch (error) {
		next(error)
	}
})

router.get('/profile', auth(), async (req, res, next) => {
	try {
		const user = await queryBuilder('users').where({ id: req.session.userId }).first()
		res.render('profile', {
			user
		})
	} catch (error) {
		next(error)
	}
})

module.exports = router