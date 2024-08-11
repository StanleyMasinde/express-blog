require('dotenv').config()
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
	development: {
		client: 'sqlite3',
		useNullAsDefault: true,
		connection: {
			filename: './dev.sqlite3'
		},
		migrations: {
			directory: 'database/migrations',
			tableName: 'migrations'
		},
		seeds: {
			directory: './database/seeds'
		}
	},

	staging: {
		client: process.env.DATABASE_CLIENT || 'mysql2',
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
		migrations: {
			directory: 'database/migrations',
			tableName: 'migrations'
		},
		seeds: {
			directory: './database/seeds'
		}
	},

	production: {
		client: process.env.DATABASE_CLIENT || 'mysql2',
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
		migrations: {
			directory: 'database/migrations',
			tableName: 'migrations'
		},
		seeds: {
			directory: './database/seeds'
		}
	}
}
