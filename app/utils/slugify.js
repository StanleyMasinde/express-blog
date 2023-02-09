/* eslint-disable no-useless-escape */
/**
 * Convert a text into a slug string
 * @param {*} text 
 */
const slugify = (text = '') => {
	return text.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '')
}

module.exports = slugify
