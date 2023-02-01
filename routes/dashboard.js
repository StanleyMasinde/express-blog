const router = require('express').Router()
const { queryBuilder } = require('../app/models/model')

router.get('/', async(req, res) => {
	const postCount = await queryBuilder('posts').count('* as agg')
	res.render('dashboard', {
		postCount: postCount[0].agg
	})
})

module.exports = router