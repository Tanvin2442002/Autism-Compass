const express = require("express");
const cors = require("cors");
const { getConnection } = require("./DB/connection");

const app = express();
app.use(cors());
app.use(express.json());

const registrationRouter = require("./Route/registration");
app.use("/reg", registrationRouter);

app.post("/login", async (req, res) => {
    const { email, password, type } = req.body;
    const connection = await getConnection();
    if (!connection) {
        throw new Error("Database connection not established");
    }
    const result = await connection.execute(
        `SELECT *
             FROM LOG_IN
             WHERE EMAIL = :email
             AND PASSWORD = :password
             AND TYPE = :type`,
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

app.post("/info", async (req, res) => {
    const email = req.body.email;
    const connection = await getConnection();
    console.log(`Email: ${email}`);
    let result = await connection.execute(
        `SELECT *
           FROM CHILD
           WHERE EMAIL = :email`,
        { email }
    );
    res.send(result.rows);
    console.log(`Query result: ${JSON.stringify(result.rows)}`);
});

app.post("/childreg", async (req, res) => {
    const connection = await getConnection();
    console.log("Received data:", req.body);

    // Insert statement with autoCommit option
    const resultReg = await connection.execute(
        `INSERT INTO CHILD (C_ID, NAME, DOB, CONTACT_NO, EMAIL, P_EMAIL, CITY, STREET, POSTAL_CODE)
             VALUES (:C_ID, :NAME, TO_DATE(:DOB, 'YYYY-MM-DD'), :CONTACT_NO, :EMAIL, :P_EMAIL, :CITY, :STREET, :POSTAL_CODE)`,
        {
            C_ID: req.body.C_ID,
            NAME: req.body.NAME,
            DOB: req.body.DOB,
            CONTACT_NO: req.body.CONTACT_NO,
            EMAIL: req.body.EMAIL,
            P_EMAIL: req.body.P_EMAIL,
            CITY: req.body.CITY,
            STREET: req.body.STREET,
            POSTAL_CODE: req.body.POSTAL_CODE,
        },
        { autoCommit: true }
    );
    const resultLog = await connection.execute(
        `INSERT INTO LOG_IN (EMAIL, PASSWORD, TYPE)
             VALUES (:EMAIL, :PASSWORD, 'child')`,
        {
            EMAIL: req.body.EMAIL,
            PASSWORD: req.body.PASSWORD,
        },
        { autoCommit: true }
    );
    res
        .status(201)
        .send({ message: "Child registered successfully!", resultReg });

    console.log("Request processed");
});

app.listen(5000, () => {
    console.log("Server is running on port 5000...");
});
