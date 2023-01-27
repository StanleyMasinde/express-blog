const plurarize = require('pluralize')
// eslint-disable-next-line max-len
const { development, production } = require('../../knexfile')
const queryBuilder = require('knex')(process.env.NODE_ENV === 'development' ? development : production)

class Model {
	/**
	 *
	 * @param {String} table
	 */
	constructor(table = '') {
		this.table = table
		this.limit = 15
	}

	/**
	 * Get the table name for the current model
	 *
	 * @return String
	 */
	tableName() {
		return plurarize(this.constructor.name.toLowerCase())
	}

	/**
	 * Returns all records of the current model
	 * @return Promise
	 */
	async all() {
		try {
			return await queryBuilder(this.tableName()).select('*')
		} catch (error) {
			return error
		}
	}

	/**
	 * Create a new Model
	 * @param {Array} attributes
	 */
	async create(attributes = []) {
		try {
			const res = await queryBuilder.table(this.tableName()).insert(attributes)
			return { status: 200, message: res }
		} catch (error) {
			return { status: 500, message: error }
		}
	}

	/**
	 * Update a model in the database
	 * @param {Array} attributes
	 * @param {Number} id
	 */
	async update(attributes = [], id) {
		try {
			await queryBuilder.table(this.tableName()).where({ id }).update(attributes)
			return { status: 200, message: await this.find(id) }
		} catch (error) {
			return { status: 500, message: error }
		}
	}

	/**
	 * Delete a model from the database
	 * @param {Number} id
	 */
	async delete(id) {
		try {
			const res = await queryBuilder.table(this.tableName()).where({ id }).delete()
			return { status: 200, message: res }
		} catch (error) {
			return { status: 500, message: error }
		}
	}

	/**
	 * Get the first record
	 * @return Promise
	 */
	first() {
		try {
			return queryBuilder(this.tableName()).select('*').first()
		} catch (error) {
			return error
		}
	}

	/**
	 * Find a model by database ID
	 * @param {Number} id
	 * @return Object
	 */
	find(id = 1) {
		try {
			return queryBuilder(this.tableName()).where('id', id).select('*').first()
		} catch (error) {
			return error
		}
	}

	/**
	 * ========================================
	 * ========Static Methods==================
	 */

	/**
	 * Get the first Model that matches the given conditions
	 * @param {*} conditions 
	 * @returns 
	 */
	static async whereFirst(conditions = {}) {
		try {
			return await queryBuilder(this.tableName()).where(conditions).select('*').first()
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = {Model, queryBuilder}
