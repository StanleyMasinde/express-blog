/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
	knex.schema.createTable('post_tag', (table) => {
		table.bigIncrements('id')
		table
			.bigInteger('post_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('posts')
		table
			.bigInteger('tag_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('tags')
	})

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('post_tag')
