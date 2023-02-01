/* eslint-disable camelcase */
/* eslint-disable no-undef */
const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')


chai.use(chaiHttp)
const app = require('../app')

const http = chai.request.agent(app)

describe('Authentication test', () => {
	it('Should authenticate a user', (done) => {
		http.post('/auth/login')
			.send({
				email: 'john@example.com',
				password: 'password',
			}).then((res) => {
				expect(res.status).equals(200)
				done()
			})
			.catch((e) => {
				done(e)
			})
	})
})



describe('End session', () => {
	it('Logout user', (done) => {
		http.post('/auth/logout')
			.then((res) => {
				expect(res.status).equals(200)
				done()
			})
			.catch((e) => {
				done(e)
			})
	})
})
