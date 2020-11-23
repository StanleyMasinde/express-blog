const passport = require('passport')
const router = require('express').Router()

router.get('/', (req, res) => {
    res.json('hello')
})

router.post('/', (req, res) => {
    res.status(201).json('All posts')
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