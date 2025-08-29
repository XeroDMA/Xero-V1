import mysql from "mysql2/promise"

const pool = mysql.createPool({
  host: "localhost",
  user: "xerodma_user",
  password: "B1TM0pQqdiffvhGXuBeL",
  database: "xerodma_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool
