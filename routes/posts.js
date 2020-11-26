// eslint-disable-next-line new-cap
const router = require('express').Router()
const Post = require('../app/models/post')

router.use((req, res, next) => {
	req.user === undefined ? res.status(401).json('Unauthenticated') : next()
})

router.get('/', async (req, res) => {
	try {
		const posts = await new Post().all()
		res.json(posts)
	} catch (error) {
		res.status(500).json({ error })
	}
})

router.post('/', async (req, res) => {
	try {
		res.status(201).json(await new Post().create(req.body))
	} catch (error) {
		res.status(500).json(error)
	}
})

router.get('/:id', async (req, res) => {
	try {
		const post = await new Post().find(req.params.id)
		res.json(post)
	} catch (error) {
		res.status(500).json(error)
	}
})

router.put('/:id', async (req, res) => {
	try {
		const { message, status } = new Post().update(req.body, req.params.id)
		res.status(status || 201).json(message)
	} catch (error) {
		res.status(500).json(error)
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const { message, status } = new Post().delete(req.params.id)

		res.status(200 || status).json(message)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router
