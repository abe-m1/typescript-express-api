# typescript-express-api

to run the server : npm start
to run tests: npm test

to run you need to create:

- .env file in project root

with the following keys:

- MONGODB_URI
- JWT_SECRET
- FINHUB_KEY

currently using finnhub.io

## Current routes

- POST ‘/api/users/signup’
- POST ‘/api/users/signout’
- POST ‘/api/users/signup’
- GET ‘api/users/currentuser

- GET ‘/api/users’

- PUT ‘/api/users/:id’
- GET ‘/api/stock/:symbol
