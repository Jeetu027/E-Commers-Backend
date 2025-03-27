import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "123456789",
  database: "foodwebsite",
  port: 5432,
});

export { pool };
