# Crud-Express-MySql

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Irenaeus-XVI/Crud-Express-MySql/blob/master/LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2012-brightgreen)](https://nodejs.org/)
[![Express.js Version](https://img.shields.io/badge/express-%5E4.17.1-yellow)](https://www.npmjs.com/package/express)
[![MySQL Version](https://img.shields.io/badge/mysql-%5E2.18.1-orange)](https://www.npmjs.com/package/mysql)

Crud-Express-MySql is a simple CRUD (Create, Read, Update, Delete) application built with Node.js, Express.js, and MySQL. It provides a basic HTTP interface to interact with a MySQL database and perform CRUD operations on the data.

## Features

- Create new items
- Read existing items
- Update existing items
- Delete items
- MySQL database integration
- RESTful API design
- Easy to use and extend

## Installation

1. Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Clone this repository: `git clone https://github.com/Irenaeus-XVI/Crud-Express-MySql.git`
3. Navigate to the project directory: `cd Crud-Express-MySql`
4. Install the dependencies: `npm install`

## Database Configuration

1. Make sure you have MySQL installed and running.
2. Create a new database for this application.
3. Configure the database connection in `to all js files`.

## Usage

1. Start the server: `npm start`
2. The API will be accessible at: `http://localhost:3000`

## API Endpoints

- `GET /` - Get all products
- `GET /searchProduct` - Get a specific item
- `POST /addProduct` - Create a new item (JSON payload required)
- `PUT /updateProduct` - Update an existing item (JSON payload required)
- `DELETE /deleteProduct` - Delete an item

## Contributing

Contributions are welcome! If you find any issues or have suggestions, please feel free to open an issue or create a pull request.

## License

This project is licensed under the [MIT License](https://github.com/Irenaeus-XVI/Crud-Express-MySql/blob/master/LICENSE).
