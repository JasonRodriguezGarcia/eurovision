import pkg from 'pg';
const { Pool } = pkg;

// Create a new connection pool
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'postgres',
//   port: 5432,
//   max: 10,              // Optional: max connections in pool (default 10)
//   idleTimeoutMillis: 30000, // Optional: close idle clients after 30 seconds
// });

// No need to manually connect here, pool manages connections automatically


// ADDED FOR EXTERNAL DEPLOYMENT
// TO BE ADDED TO .ENV FILE ?? DATABASE_URL, DATABASE_HOST, ...
// IN CASE .ENV FILE INDEX.JS TO BE ADDED: 
//      import dotenv from 'dotenv';
//      dotenv.config();

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;



// https://node-postgres.com