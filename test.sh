set -e

npx knex migrate:rollback
npx knex migrate:latest
npm test
