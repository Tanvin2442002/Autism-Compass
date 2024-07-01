const express = require("express");
const cors = require("cors");
const { getConnection } = require("./DB/connection");
const { OAuth2Client } = require("google-auth-library");
const routerProduct = require('./Route/productDetails');
const app = express();
app.use(cors());
app.use(express.json());

const registrationRouter = require("./Route/registration");
app.use("/reg", registrationRouter);
app.use(routerProduct);


// const client = new OAuth2Client('120968135958-a9lj4l0q1n5s33qsu08pvvbevcrg4nsn.apps.googleusercontent.com');

app.post("/login", async (req, res) => {     //app.post("/login", async(req,res)=>{   }) // name age password
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

// app.post("/info", async (req, res) => {
//     const email = req.body.email;
//     const connection = await getConnection();
//     console.log(`Email: ${email}`);
//     let result = await connection.execute(
//         `SELECT *
//            FROM CHILD
//            WHERE EMAIL = :email`,
//         { email }
//     );
//     res.send(result.rows);
//     console.log(`Query result: ${JSON.stringify(result.rows)}`);
// });


// app.post("/auth/google", async (req, res) => {
//     const { token } = req.body;

//     try {
//         const ticket = await client.verifyIdToken({
//             idToken: token,
//             audience: '120968135958-a9lj4l0q1n5s33qsu08pvvbevcrg4nsn.apps.googleusercontent.com',
//         });
//         const payload = ticket.getPayload();
//         const { sub: googleId, email, name } = payload;

//         const connection = await getConnection();
//         if (!connection) {
//             throw new Error("Database connection not established");
//         }

//         let result = await connection.execute(
//             `SELECT * FROM LOG_IN WHERE EMAIL = :email`,
//             { email }
//         );

//         if (result.rows.length === 0) {

//             await connection.execute(
//                 `INSERT INTO LOG_IN (EMAIL, PASSWORD, TYPE)
//                  VALUES (:EMAIL, :PASSWORD, 'google')`,
//                 {
//                     EMAIL: email,
//                     PASSWORD: "", 
//                 },
//                 { autoCommit: true }
//             );
//             await connection.execute(
//                 `INSERT INTO USERS (GOOGLE_ID, EMAIL, NAME)
//                  VALUES (:googleId, :email, :name)`,
//                 {
//                     googleId,
//                     email,
//                     name,
//                 },
//                 { autoCommit: true }
//             );
//         }

//         result = await connection.execute(
//             `SELECT * FROM USERS WHERE EMAIL = :email`,
//             { email }
//         );

//         await connection.close();

//         res.status(200).json({ user: result.rows[0] });
//     } catch (error) {
//         console.error("Error verifying Google token", error);
//         res.status(401).json({ message: "Invalid Google token" });
//     }
// });

app.listen(5000, () => {
    console.log("Server is running on port 5000...");
});

