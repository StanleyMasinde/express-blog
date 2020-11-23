//const knexx = require('knex')()
exports.up = function (knex) {
    return knex.schema.createTable('posts', (table) => {
        table.bigIncrements('id')
        table.bigInteger('user_id').unsigned()
        table.string('title')
        table.text('body')
        table.date('published_at')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('posts')
};
