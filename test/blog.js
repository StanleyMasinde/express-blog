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
                console.log(res.body);
                expect(res.status).equals(200)
                done()
            })
            .catch(e => {
                done(e)
            })
    })
})