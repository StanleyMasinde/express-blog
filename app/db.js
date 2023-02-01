const DB = require('knex')({
	client: process.env.DATABASE_CLIENT || 'mysql',
	connection: {
		host: process.env.DATABASE_HOST || '127.0.0.1',
		database: process.env.DATABASE_SCHEMA || 'my_blog',
		user: process.env.DATABASE_USER || 'root',
		password: process.env.DATABASE_PASSWORD
	},
	pool: {
		min: 2,
		max: 10
	},
})

module.exports = DB
