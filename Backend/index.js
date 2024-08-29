const express = require("express");
const cors = require("cors");
const { getConnection } = require("./DB/connection");
const app = express();
app.use(cors());
app.use(express.json());

const routerProduct = require('./Route/productDetails');
app.use(routerProduct);
app.use("/reg", require("./Route/registration"));
app.use("/child", require("./Route/childThings"));
app.use("", require("./Route/TherapyThings"));
app.use("", require("./Route/DocThings"));
app.use("/therapy", require("./Route/TherapyThings"));
app.use("/booking", require("./Route/BookingTherapy"));
app.use("", require("./Route/BookingDoc"));
app.use("/dash", require("./Route/Dashboard"));
app.use("", require("./Route/Suggest"));  




app.post("/login", async (req, res) => {     
    const { email, password, type } = req.body;
    const connection = await getConnection();
    if (!connection) {
        throw new Error("Database connection not established");
    }

    const result = await connection.execute(
        `SELECT *
            FROM LOG_IN, ${type}
            WHERE LOG_IN.EMAIL = LOWER(:email)
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
    console.log(`Database connect with '${process.env.USER}' user and '${process.env.PASS}' password.`);

});

