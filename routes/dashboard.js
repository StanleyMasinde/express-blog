const router = require('express').Router()
const { queryBuilder } = require('../app/models/model')

router.get('/', async (req, res, next) => {
	try {
		const postCount = await queryBuilder('posts').count('* as agg')
		res.render('dashboard', {
			postCount: postCount[0].agg
		})
	} catch (error) {
		next(error)
	}
})

router.get('/posts', async (req, res, next) => {
	try {
		const posts = queryBuilder('posts').select()
		res.render('posts', {
			posts
		})
	} catch (error) {
		next(error)
	}
})

module.exports = router