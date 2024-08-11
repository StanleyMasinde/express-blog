/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
	knex.schema.createTable('tags', (table) => {
		table.bigIncrements('id')
		table.string('name').unique().notNullable()
		table.string('slug').unique().notNullable()
	})

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('tags')
