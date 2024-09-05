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
    console.log(`User login request: ${email}, ${password}, ${type}`);
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

app.get('/api/courses', async (req, res) => {
    let connection;
console.log("hello");
    try {
        connection = await getConnection();
        const result = await connection.execute('SELECT c.course_code,c.course_name,t.name AS teacher_name FROM courses c JOIN assigned a ON c.course_code = a.course_code JOIN teacher t ON a.T_ID = t.T_ID');
        const rows = result.rows;
console.log(rows);
        if (Array.isArray(rows)) {
            /*res.json(rows.map(row => ({
                course_code: row[0], // Adjust index based on your schema
                course_name: row[1]  // Adjust index based on your schema
            })));*/
            res.status(200).send(rows);
        } else {
            res.status(500).send('Unexpected result format');
        }
    } catch (err) {
        console.error('Error fetching courses:', err);
        res.status(500).send('Internal Server Error');
    } 
    
});



app.listen(5000, () => {
    console.log("Server is running on port 5000...");
    console.log(`Database connect with '${process.env.USER}' user and '${process.env.PASS}' password.`);

});

