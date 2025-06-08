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
  user: 'postgres_37d6_user',
  host: 'dpg-d12ahjs9c44c7384n6r0-a.frankfurt-postgres.render.com',
  database: 'postgres_37d6',
  password: 'czmvMRQVLbx1lKWYnhSj9Ln2WPFNbN3Y',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;



// https://node-postgres.com