/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('users').del()
	await knex('users').insert([
		{
			name: 'John Doe',
			email: 'john@example.com',
			password: 'password',
			bio: 'Awesome person'
		},
	])
}
