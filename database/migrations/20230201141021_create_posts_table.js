/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('posts', (table) => {
		table.bigIncrements('id')
		table.string('slug').unique().index('POST_SLUG').notNullable()
		table.string('title').notNullable()
		table.string('description')
		table.text('body').notNullable()
		table.dateTime('published_at')
		table.boolean('is_published')
		table.timestamps(true, true)
	})
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('poasts')
}
