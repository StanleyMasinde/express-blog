exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.bigIncrements('id')
        table.string('name')
        table.string('email').unique()
        table.text('password')
    })
};

exports.down = function (knex) {
   return knex.schema.dropTableIfExists('users')
};
