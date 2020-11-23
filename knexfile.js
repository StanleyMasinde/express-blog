module.exports = {

	development: {
		client: 'sqlite3',
		connection: {
			filename: './dev.sqlite',
		},
		useNullAsDefault: true,
	},

	staging: {
		client: process.env.DB_CLIENT || 'mysql',
		connection: {
			database: process.env.DB_DATABASE || 'express_blog',
			user: process.env.DB_USER || 'username',
			password: process.env.DB_PASSWORD || 'password',
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'migrations',
		},
	},

	production: {
		client: process.env.DB_CLIENT || 'mysql',
		connection: {
			database: process.env.DB_CLIENT || 'my_db',
			user: process.env.DB_USER || 'username',
			password: process.env.DB_PASSWORD || 'password',
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'migrations',
		},
	},

}
