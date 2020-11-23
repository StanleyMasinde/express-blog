exports.up = function (knex) {
    return knex.schema.createTable('post_tags', (table) => {
        table.bigIncrements('id')
        table.string('title')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('post_tags')
};
