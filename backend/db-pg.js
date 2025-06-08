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
  user: DATABASE_USER,
  host: DATABASE_HOST,
  database: DATABASE_DATABASE,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;



// https://node-postgres.com