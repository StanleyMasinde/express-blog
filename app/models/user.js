const { hash } = require('bcryptjs')
const {Model} = require('./model')

class User extends Model {
	/**
     * Register a new user
     * @param {*} details 
     */
	/**
     * Register a new user
     * @param {*} details 
     */
	async register(details = []) {
		const { password } = details
		const p = await hash(password, 10)
		details['password'] = p
		return this.create(details)
	}
}

module.exports = User
