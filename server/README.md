# E-commerce REST API
A Node/Express API to manage e-commerce functionality like user registration and sessions, products and stock handling, as well as shopping cart and orders processing.

It uses **PostgreSQL** for database management, so it must be installed and configured in the server to work properly. With your **Postgres** server running, you have to create your target database and then use the included setup helper script by typing `'npm run setup-db'` on Terminal, to configure your database tables accordingly.

Sensitive information like DB access keys and session encryption secrets are stored in and retrieved from environment variables. To run locally, these information should be put in a `.env` file in the root directory. An `example.env` file is provided as reference.

This API part of a Portfolio Project on Codecademy's **Full Stack Engineer** career path.

Thanks for visiting! Comments or suggestions are more than welcome!

---
![Static Badge](https://img.shields.io/badge/Version-1.0.7-blue?style=plastic)
![Static Badge](https://img.shields.io/badge/OpenAPI-v._3.0-green?style=plastic)

The API was developed according to OpenAPI directives, and once running, its documentation can be accessed on the following endpoit:

`http://localhost:<your-port>/api-docs`

## ENDPOINTS

### PRODUCTS
- `GET` /products
- `GET` /products?category=categoryId
- `GET` /products/:productId
- `POST` /products
- `PUT` /products/:productId
- `DELETE` /products/:productId

### USERS
- `POST` /user/register
- `POST` /user/login
- `POST` /user/logout
- `GET` /user
- `GET` /user/verify-session
- `GET` /user/google
- `GET` /user/google/callback
- `GET` /user/facebook
- `GET` /user/facebook/callback
- `PUT` /user
- `DELETE` /user

### CHECKOUT
- `POST` /cart/:cartId/checkout

### CART
- `GET` /cart
- `POST` /cart
- `POST` /cart/:cartId
- `GET` /cart/:cartId
- `PUT` /cart/:cartId
- `DELETE` /cart/:cartId
- `DELETE` /cart

### ORDERS
- `GET` /order
- `POST` /order/create-payment-intent
- `GET` /order/:orderId
- `PUT` /order/:orderId
- `DELETE` /order/:orderId

### HEALTH & SESSION
- `GET` /health - Health check endpoint
- `GET` /test-session - Session testing endpoint
