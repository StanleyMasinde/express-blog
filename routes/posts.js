const passport = require('passport')
const router = require('express').Router()
const Post = require('../app/models/post')

router.use((req, res, next) => {
    req.user === null ? res.status(401).json('Unauthenticated') : next()
})

router.get('/', async (req, res) => {
    try {
        const posts = await new Post().all()
        res.json(posts)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.post('/', async (req, res) => {
    try {
        res.status(201).json(await new Post().create(req.body))
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:id', (req, res) => {
    res.json('First post')
})

router.put('/:id', (req, res) => {
    res.status(201).json('Hello')
})

router.delete('/:id', (req, res) => {
    res.json('Deleted')
})

module.exports = router