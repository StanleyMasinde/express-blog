exports.up = function (knex) {
	return knex.schema.createTable('post_comments', (table) => {
		table.bigIncrements('id')
		table.bigInteger('post_id').unsigned()
		table.bigInteger('user_id').unsigned()
		table.string('body')
	})
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('post_comments')
}
