exports.up = function (knex) {
    return knex.schema.createTable('posts', (table) => {
        table.bigIncrements('id')
        table.string('title')
        table.text('body')
        table.date('date')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('posts')
};
