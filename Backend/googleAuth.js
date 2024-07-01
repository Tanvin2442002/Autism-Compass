

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