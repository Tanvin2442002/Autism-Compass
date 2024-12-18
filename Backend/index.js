const express = require("express");
const cors = require("cors");
require('dotenv').config();
const sql = require('./DB/supabase');

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
app.use("/remove", require("./Route/DeleteUser"));



app.post("/login", async (req, res) => {
    try {
        const { email, password, type } = req.body;
        console.log(`User login request: ${email}, ${password}, ${type}`);

        // Query the database for user
        const result = await sql`
            SELECT *
            FROM LOG_IN
            WHERE LOG_IN.EMAIL = LOWER(${email})
            AND LOG_IN.PASSWORD = ${password}
            AND LOG_IN.TYPE = ${type};
        `;

        // Validate 'type' to prevent SQL injection
        const validTypes = ["PARENT", "CHILD", "TEACHER", "HEALTH_PROFESSIONAL"];  // Add more valid types if applicable
        if (!validTypes.includes(type)) {
            return res.status(400).send({ message: "Invalid user type specified" });
        }

        let userId;
        if(type === "PARENT"){
            userId = await sql`
            SELECT P_ID
            FROM PARENT
            WHERE PARENT.EMAIL = LOWER(${email});
        `;
        }
        else if(type === "CHILD"){
            userId = await sql`
            SELECT C_ID
            FROM CHILD
            WHERE CHILD.EMAIL = LOWER(${email});
        `;
        }
        else if(type === "TEACHER"){
            userId = await sql`
            SELECT T_ID
            FROM TEACHER
            WHERE TEACHER.EMAIL = LOWER(${email});
        `;
        }
        else if(type === "HEALTH_PROFESSIONAL"){
            userId = await sql`
            SELECT H_ID
            FROM HEALTH_PROFESSIONAL
            WHERE HEALTH_PROFESSIONAL.EMAIL = LOWER(${email});
        `;
        }

        // result will only contain userId and type
        result[0].ID = userId[0][Object.keys(userId[0])[0]];
        result[0].TYPE = type;


        console.log(`User ID: ${JSON.stringify(userId)}`);
        if (result.length > 0) {
            res.status(200).send(result[0]);
            console.log(`User logged in: ${email}`);
        } else {
            res.status(404).send({ result: "No user found!" });
        }

        console.log("Request processed");
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send({ message: "Error during login", error: err.message });
    }
});


app.get("/", (req, res) => {
    res.send("Welcome to the Autism Compass API!");
});


const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



app.get("/ai", async (req, res) => {
    const prompt = "Explain how AI works";
    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        res.status(200).send(result.response.text());
        console.log("AI response sent");
    } catch (err) {
        console.error("Error during AI generation:", err);
        res.status(500).send({ message: "Error during AI generation", error: err.message });
    }
});


app.listen(5000, async (req, resp) => {
    // console.log(sql);
    console.log("Server is running on port 5000...");
    console.log(`Database connect with '${process.env.USER}' user and '${process.env.PASS}' password.`);

});

