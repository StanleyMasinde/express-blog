const router = require('express').Router()
const auth = require('../app/middleware/auth')
const DB = require('../app/db')
const validatePost = require('../app/middleware/validatePost')
const slugify = require('../app/utils/slugify')

router.get('/', auth(), async (req, res, next) => {
	try {
		const postCount = await DB('posts').count('* as agg')
		res.render('dashboard', {
			postCount: postCount[0].agg
		})
	} catch (error) {
		next(error)
	}
})

router.get('/posts', auth(), async (req, res, next) => {
	try {
		const posts = DB('posts').select()
		res.render('posts', {
			posts
		})
	} catch (error) {
		next(error)
	}
})

router.get('/posts/create', auth(), (req, res, next) => {
	try {
		res.render('dashboard/posts/create')
	} catch (error) {
		next(error)
	}
})

router.post('/posts/create', auth(), validatePost(), async (req, res, next) => {
	const { title, body } = req.body
	try {
		await DB('posts').insert({
			slug: slugify(title),
			title,
			body
		})

		return res.render('dashboard/posts/create', {
			success: 'Post published'
		})
	} catch (error) {
		next(error)
	}
})

router.get('/profile', auth(), async (req, res, next) => {
	try {
		const user = await DB('users').where({ id: req.session.userId }).first()
		res.render('profile', {
			user
		})
	} catch (error) {
		next(error)
	}
})

module.exports = router