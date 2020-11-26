# express-blog
![Node.js CI](https://github.com/StanleyMasinde/express-blog/workflows/Node.js%20CI/badge.svg)
> A simple blog project for personal practice

## Installation
1. clone this repo
2. `cd express-blog && npm i`
3. `npm start`

## Routes
### Authentication
|Path            |Method| params              |
|:---------------|:-----|:--------------------|
|`/auth/login`   | POST |`email,password`     |
|`/auth/register`| POST |`name,email,password`|
|`/auth/logout`  | POST | None                |

### Blogs
|Path|Method|params|
|:-----------|:-------|:--------------------|
|`/posts`    | GET    | None                |
|`/posts`    | POST   |`title,body, date`   |
|`/posts/:id`| GET    | None                |
|`/posts/:id`| PUT    |`title,body, date`   |
|`/posts/:id`| DELETE | None                |

## Testing
Run `npm run test` or `yarn test` to run tests
