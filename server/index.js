const { Pool } = require("pg");

// Create a pool
const pool = new Pool({
  user: "postgres", // "gen_user",
  host: "127.0.0.1", // "93.183.83.23",
  database: "postgres", // "default_db",
  password: "11659gry", // "A}#UpIk1mb,r*#",
  port: 5432,
});

const insertUser = async (name, tgId) => {
  try {
    await pool.query(`INSERT INTO users (username, tgId) VALUES ($1, $2)`, [
      name,
      tgId,
    ]);
  } catch (err) {
    console.error("Some error occurred during inserting ", err.message);
  }
};

const selectUser = async (tgId) => {
  try {
    const user = await pool.query(`SELECT * FROM users WHERE tgId = $1`, [
      tgId,
    ]);
    return user.rows;
  } catch (err) {
    console.error("Some error occurred during selecting", err.message);
  }
};

// When you are done with the pool
process.on("exit", () => {
  pool.end();
});

module.exports = { selectUser, insertUser };
