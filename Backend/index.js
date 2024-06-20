const express = require("express");
const cors = require("cors");
const { getConnection } = require("./DB/connection");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const connection = await getConnection();
    if (!connection) {
      throw new Error("Database connection not established");
    }
    // Log incoming request data
    console.log(`Login attempt with email: ${email}`);
    const result = await connection.execute(
      `SELECT *
             FROM USERS
             WHERE EMAIL = :email
             AND PASSWORD = :password`,
      { email, password }
    );

    // Log query result
    console.log(`Query result: ${JSON.stringify(result)}`);

    const rows = result.rows;

    if (rows.length > 0) {
      res.send(rows[0]);
      console.log(`User logged in: ${email}`);
    } else {
      // res.status(401).send("Invalid credentials");
      res.send({ result: "No user found!" });
    }
  } catch (err) {
    // console.error("Error during /login request:", err);
    // res.status(500).send("Internal Server Error");
    res.send({ result: "No user found!" });
  }
  console.log("Request processed");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
