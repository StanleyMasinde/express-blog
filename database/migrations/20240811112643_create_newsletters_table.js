/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
	knex.schema.createTable('newsletters', (table) => {
		table.bigIncrements('id')
		table.string('title').notNullable()
		table.text('content').notNullable()
		table.enum('status', ['draft', 'published', 'archived']).defaultTo('draft')
		table.timestamp('schedule_send_date')
		table.timestamp('sent_at')
		table.timestamps(true, true)
	})

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('newsletters')
