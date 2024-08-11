/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
	knex.schema.createTable('subscriptions', (table) => {
		table.bigIncrements('id')
		table
			.bigInteger('user_id')
			.unsigned()
			.unique()
			.references('id')
			.inTable('users')
		table.timestamps(true, true)
	})

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('subscriptions')
