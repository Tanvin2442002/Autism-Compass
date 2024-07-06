const express = require("express");
const cors = require("cors");
const { getConnection } = require("./DB/connection");
const routerProduct = require('./Route/productDetails');
const app = express();
app.use(cors());
app.use(express.json());

const registrationRouter = require("./Route/registration");
app.use("/reg", registrationRouter);
app.use(routerProduct);
app.use("/child", require("./Route/childThings"));


app.post("/login", async (req, res) => {     
    const { email, password, type } = req.body;
    const connection = await getConnection();
    if (!connection) {
        throw new Error("Database connection not established");
    }

    const result = await connection.execute(
        `SELECT *
            FROM LOG_IN, ${type}
            WHERE LOG_IN.EMAIL = :email
            AND LOG_IN.PASSWORD = :password
            AND LOG_IN.TYPE = :type
            AND LOG_IN.EMAIL = ${type}.EMAIL`,
        { email, password, type }
    );
    console.log(`Query result: ${JSON.stringify(result.rows)}`);
    const rows = result.rows;
    if (rows.length > 0) {
        res.send(rows[0]);
        console.log(`User logged in: ${email}`);
    } else res.send({ result: "No user found!" });
    console.log("Request processed");
});


app.listen(5000, () => {
    console.log("Server is running on port 5000...");
});

