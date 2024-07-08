const oracle = require("oracledb");
const dotenv = require("dotenv");

oracle.outFormat = oracle.OUT_FORMAT_OBJECT;

dotenv.config();

let connection;

console.log(process.env.USER);
console.log(process.env.PASS);

async function initializeConnection() {
  try {
    connection = await oracle.getConnection({
      user: process.env.USER,
      password: process.env.PASS,
      connectString: process.env.CONNECT_STRING
    });
    console.log("Database connected successfully.");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}

async function getConnection() {
  if (!connection) {
    await initializeConnection();
  }
  return connection;
}

module.exports = { getConnection };
