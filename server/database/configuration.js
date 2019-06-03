require("dotenv").config();

// Require the packages we will use.
// const axios = require("axios");
const {
    Pool
} = require("pg");

// Setup database configuration
const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST
});

// Alert message if connection works.
pool.on("connect", () =>
    console.log(`We have a connection with database: ${process.env.DB_NAME}`)
);

//Establish connection with database
pool.connect();

module.exports = pool;