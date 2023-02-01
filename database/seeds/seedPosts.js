/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('posts').del()
	await knex('posts').insert([
		{
			title: 'This is a post',
			slug: 'this-is-a-post',
			description: 'A new post',
			body: 'This is a body',
			'is_published': 1
		},
	])
}
