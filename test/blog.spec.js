const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const app = require('../app')
const http = chai.request(app).keepOpen()

describe('Authentication test', () => {
    it('Should create a new user', (done) => {
        http.post('/auth/register')
            .send({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'passowrd'
            })
            .then((res => {
                expect(res.status).equals(200)
                done()
            }))
            .catch((e) => {
                done(e)
            })
    })

    it('Should authenticate a user', (done) => {
        http.post('/auth/login')
            .send({
                email: 'john@example.com',
                password: 'password'
            }).then(res => {
                expect(res.status).equals(200)
                done()
            })
            .catch(e => {
                done(e)
            })
    })
})

describe('Blog posts', () => {
    it('Create a post', (done) => {
        http.post('/posts')
            .send({
                title: 'A blog post',
                body: 'This is a simple post etc',
                published_at: new Date()
            })
            .then(response => {
                console.log(response.body);
                expect(response.status).equals(201)
                done()
            })
            .catch(e => {
                done(e)
            })
    })

    it('Get a post', (done) => {
        http.get('/posts/1')
            .then(res => {
                expect(res.status).equals(200)
                done()
            })
            .catch(e => {
                done(e)
            })
    })

    it('Update the post', (done) => {
        http.put('/posts/1')
            .send({
                title: 'A blog post',
                body: 'This is a simple post etc',
                publised_at: new Date()
            })
            .then(response => {
                expect(response.status).equals(201)
                done()
            })
            .catch(e => {
                done(e)
            })
    })

    it('Delete a post', (done) => {
        http.delete('/posts/1')
            .then(res => {
                expect(res.status).equals(200)
                done()
            })
            .catch(e => {
                done(e)
            })
    })

    it('Get all posts', (done) => {
        http.get('/posts')
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body.length).length.to.equal(1)
                done()
            })
            .catch(e => {
                done(e)
            })
    })
})
