const { Client } = require("pg");

const client = new Client({
  user: "postgres", //"gen_user",
  host: "127.0.0.1", //"93.183.83.23",
  database: "postgres", //"default_db",
  password: "11659gry", //"A}#UpIk1mb,r*#",
  port: 5432,
});

const insertUser = async (name, tgId) => {
  try {
    await client.connect();
    await client.query(
      `
            INSERT INTO users (username, tgId)
            VALUES ($1, $2)`,
      [name, tgId]
    );
  } catch (err) {
    console.error("Some error occurred ", err);
  } finally {
    await client.end();
  }
};

const selectUser = async (tgId) => {
  try {
    await client.connect();
    const user = await client.query(
      `
            SELECT * FROM users WHERE tgId = $1`,
      [tgId]
    );
    return user.rows;
  } catch (err) {
    await console.error("Some error occurred ", err.message);
  } finally {
    await client.end();
  }
};

module.exports = { selectUser };
