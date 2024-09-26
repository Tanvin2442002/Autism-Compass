const express = require("express");
const cors = require("cors");
const { getConnection } = require("./DB/connection");
const app = express();
app.use(cors());
app.use(express.json());

const routerProduct = require('./Route/productDetails');
const { autoCommit } = require("oracledb");
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
    const { email, password, type } = req.body;
    console.log(`User login request: ${email}, ${password}, ${type}`);
    const connection = await getConnection();
    if (!connection) {
        throw new Error("Database connection not established");
    }

    console.log(`Querying database for user: ${email}, ${password}, ${type}`);

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

// app.post("/login", async (req, res) => {     
//     const { email, password, type } = req.body;
//     console.log(`User login request: ${email}, ${password}, ${type}`);
//     const connection = await getConnection();
//     if (!connection) {
//         throw new Error("Database connection not established");
//     }

//     let query = `SELECT LOG_IN.EMAIL, LOG_IN.TYPE`;

//     // If the user type is 'child', include C_ID in the result
//     if (type === 'CHILD') {
//         query += `, CHILD.C_ID`;
//     }
//     else if(type === 'TEACHER')
//     {
//         query += `, TEACHER.T_ID`;
//     }

//     query += `
//         FROM LOG_IN
//         JOIN ${type} ON LOG_IN.EMAIL = ${type}.EMAIL
//         WHERE LOG_IN.EMAIL = LOWER(:email)
//         AND LOG_IN.PASSWORD = :password
//         AND LOG_IN.TYPE = :type`;

//     try {
//         const result = await connection.execute(query, { email, password, type });
//         console.log(`Query result: ${JSON.stringify(result.rows)}`);

//         const rows = result.rows;
//         if (rows.length > 0) {
//             res.send(rows[0]);
//             console.log(`User logged in: ${email}`);
//         } else {
//             res.send({ result: "No user found!" });
//         }
//         console.log("Request processed");
//     } catch (err) {
//         console.error('Error during login:', err);
//         res.status(500).send('Internal Server Error');
//     }
// });


/*app.get('/api/courses', async (req, res) => {
    let connection;
    const { C_ID } = req.body;
//console.log("hello");
    try {
        connection = await getConnection();
        const result = await connection.execute('SELECT c.course_code,c.course_name,t.name AS teacher_name FROM courses c JOIN assigned a ON c.course_code = a.course_code JOIN teacher t ON a.T_ID = t.T_ID WHERE c.course_code NOT IN (SELECT course_code FROM enrolls WHERE c_id = :c_id)'[C_ID]);
        const rows = result.rows;
//console.log(rows);
        if (Array.isArray(rows)) {
           
            res.status(200).send(rows);
        } else {
            res.status(500).send('Unexpected result format');
        }
    } catch (err) {
        console.error('Error fetching courses:', err);
        res.status(500).send('Internal Server Error');
    } 
    
});*/

// GET endpoint to fetch available and enrolled courses for a specific child
app.get('/api/courses/:c_id', async (req, res) => {
    let connection;
    const C_ID = req.params.c_id;
    console.log(C_ID);

    try {
        connection = await getConnection();

        // Fetch all available courses (those not already enrolled by the child)
        const availableCoursesResult = await connection.execute(
            `SELECT c.course_code, c.course_name, t.name AS teacher_name
             FROM courses c
             JOIN assigned a ON c.course_code = a.course_code
             JOIN teacher t ON a.t_id = t.t_id
             WHERE c.course_code NOT IN (
                SELECT e.course_code FROM enrolls e WHERE e.c_id = :c_id
             )`, // This closes the subquery
            [C_ID]
        );
        const rows = availableCoursesResult.rows;
        console.log(rows);

        // Fetch all courses the child is already enrolled in
        const enrolledCoursesResult = await connection.execute(
            `SELECT c.course_code, c.course_name, c.assignment_path, t.name AS teacher_name
             FROM courses c
             JOIN assigned a ON c.course_code = a.course_code
             JOIN teacher t ON a.t_id = t.t_id
             WHERE c.course_code IN (
                SELECT e.course_code FROM enrolls e WHERE e.c_id = :c_id
             )`,
            [C_ID]
        );
        const rowss = enrolledCoursesResult.rows;
        console.log("enrol");
        console.log(rowss);

        const availableCourses = availableCoursesResult.rows;
        const enrolledCourses = enrolledCoursesResult.rows;

        res.status(200).send({ availableCourses, enrolledCourses });
    } catch (err) {
        console.error('Error fetching courses:', err);
        res.status(500).send('Internal Server Error');
    }
});



// POST endpoint to enroll a course
app.post('/api/enroll', async (req, res) => {
    let connection;
    const { COURSE_CODE, C_ID } = req.body;
    console.log(req.body);
    try {
        connection = await getConnection();
       

        // If both checks pass, insert the record into the enrolls table
        const result = await connection.execute(
            //'INSERT INTO ENROLLS (c_id, course_code) SELECT C.C_ID, CO.course_code FROM CHILD C JOIN COURSES CO ON C.C_ID = CO.C_ID');



            'INSERT INTO enrolls (course_code, c_id) VALUES (:course_code, :c_id)',
            {COURSE_CODE, C_ID},{autoCommit:true}
        );
        const rows = result.rows;
        console.log("2 no api");
console.log(rows);

console.log(`Rows affected: ${result.rowsAffected}`);
    console.log(`Last inserted ID: ${result.lastInsertId || 'N/A'}`);
    
    // Optionally log the full result object
    console.log(result);

        if (result.rowsAffected === 1) {
            console.log("yes successful\n");
            res.status(200).send('Enrolled successfully');
        } else {
            console.log("not joy\n");
            res.status(500).send('Failed to enroll');
        }
    } catch (err) {
        console.error('Error enrolling the course:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/unenroll', async (req, res) => {
    let connection;
    const { COURSE_CODE, C_ID } = req.body;
    
    try {
        connection = await getConnection();

        // Delete the enrollment record from the ENROLLS table
        const result = await connection.execute(
            'DELETE FROM enrolls WHERE course_code = :course_code AND c_id = :c_id',
            { COURSE_CODE, C_ID },
            { autoCommit: true }
        );

        if (result.rowsAffected === 1) {
            res.status(200).send('Unenrolled successfully');
        } else {
            res.status(500).send('Failed to unenroll');
        }
    } catch (err) {
        console.error('Error unenrolling from the course:', err);
        res.status(500).send('Internal Server Error');
    }
});



// GET endpoint to fetch courses assigned to a teacher and list of students for each course
app.get('/api/teacher/courses/:t_id', async (req, res) => {
    let connection;
    const T_ID = req.params.t_id;  // Teacher's ID
    console.log(`Fetching courses for Teacher ID: ${T_ID}`);

    try {
        connection = await getConnection();

        // Fetch all courses assigned to the teacher
        const teacherCoursesResult = await connection.execute(
            `SELECT c.course_code, c.course_name
             FROM courses c
             JOIN assigned a ON c.course_code = a.course_code
             WHERE a.t_id = :t_id`,  // Filter by teacher ID
            [T_ID]
        );
        const teacherCourses = teacherCoursesResult.rows;

        // Fetch students enrolled in each course
        const studentsResult = await connection.execute(
            `SELECT e.course_code, e.c_id, ch.name AS student_name
             FROM enrolls e
             JOIN child ch ON e.c_id = ch.c_id
             WHERE e.course_code IN (
                SELECT course_code FROM assigned WHERE t_id = :t_id
             )`,
            [T_ID]
        );
        const enrolledStudents = studentsResult.rows;

        
        console.log("Teacher Courses:", teacherCourses);  // Log teacher courses
        console.log("Enrolled Students:", enrolledStudents);  // Log enrolled students
        

        res.status(200).send({ teacherCourses, enrolledStudents });
    } catch (err) {
        console.error('Error fetching teacher courses or students:', err);
        res.status(500).send('Internal Server Error');
    }
});

// POST endpoint to create a course and assign it to the teacher
app.post('/api/teacher/create-course', async (req, res) => {
    let connection;
    const { T_ID, COURSE_CODE, COURSE_NAME } = req.body;

    try {
        connection = await getConnection();

        // Insert the new course
        const createCourseResult = await connection.execute(
            `INSERT INTO courses (course_code, course_name) VALUES (:course_code, :course_name)`,
            { COURSE_CODE, COURSE_NAME }
        );

        // Assign the course to the teacher
        const assignCourseResult = await connection.execute(
            `INSERT INTO assigned (t_id, course_code) VALUES (:t_id, :course_code)`,
            { T_ID, COURSE_CODE }
        );

        // Commit the transaction
        await connection.commit();

        // Send the created course data back to the frontend
        res.status(200).send({
            message: 'Course created and assigned successfully',
            course: { COURSE_CODE, COURSE_NAME }
        });
    } catch (err) {
        console.error('Error creating course:', err);
        res.status(500).send('Internal Server Error');
    }
});



const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadFolder = path.join(__dirname, 'uploads');
        
        // Ensure the 'uploads' folder exists
        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder);
        }

        cb(null, uploadFolder); // Store files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Create a unique filename
    }
});

const upload = multer({ storage: storage });

// POST endpoint to upload an assignment (PDF) for a course
app.post('/api/teacher/upload-assignment', upload.single('assignment'), async (req, res) => {
    let connection;
    const { COURSE_CODE, T_ID } = req.body;  // Course code and teacher ID
    const assignmentFile = req.file;  // Uploaded file

    if (!assignmentFile) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        connection = await getConnection();

        // Store only the filename (not the full path)
        const filename = assignmentFile.filename;

        // Save the filename in the database
        const result = await connection.execute(
            `UPDATE courses 
             SET assignment_path = :assignment_path 
             WHERE course_code = :course_code 
             AND EXISTS (SELECT 1 FROM assigned WHERE t_id = :t_id AND course_code = :course_code)`,
            {
                assignment_path: filename, // Store only the filename
                course_code: COURSE_CODE,
                t_id: T_ID
            }
        );

        await connection.commit();

        res.status(200).send({
            message: 'Assignment uploaded successfully',
            assignmentFilename: filename
        });
    } catch (err) {
        console.error('Error uploading assignment:', err);
        res.status(500).send('Internal Server Error');
    }
});


//const path = require('path');
//const fs = require('fs');

app.get('/api/download-assignment/:course_code', async (req, res) => {
    let connection;
    console.log("test");
    const { COURSE_CODE } = req.params;
    console.log("Requested Course Code:", COURSE_CODE);

    try {
        connection = await getConnection();

        // Query to get the assignment path for the course
        const result = await connection.execute(
            `SELECT assignment_path FROM courses WHERE course_code = :course_code`,
            { COURSE_CODE }
        );

        if (result.rows.length === 0) {
            console.log("Assignment not found for course code:", COURSE_CODE);
            return res.status(404).send('Assignment not found for this course');
        }

        const assignmentFilename = result.rows[0].ASSIGNMENT_PATH; // This should be the filename only
        const filePath = path.join(__dirname, 'uploads', assignmentFilename); // Ensure full path

        console.log("Resolved File Path:", filePath);

        // Check if the file exists
        if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'application/pdf'); // Explicitly set the Content-Type to PDF
            res.setHeader('Content-Disposition', `attachment; filename=${assignmentFilename}`); // Ensure it's downloaded with the correct name
            return res.download(filePath); // Send the file for download
        } else {
            return res.status(404).send('File not found');
        }
    } catch (err) {
        console.error('Error downloading assignment:', err);
        return res.status(500).send('Internal Server Error');
    } finally {
        if (connection) {
            await connection.close();
        }
    }
});



app.get('/api/enrolled-students/:courseId', (req, res) => {
    const courseId = req.params.courseId;

    const sqlQuery = `
        SELECT c.C_ID, c.STUDENT_NAME, d.type
        FROM CHILD_HAS_DISORDER chd
        JOIN DISORDER d ON chd.DO_ID = d.DO_ID
        JOIN CHILD c ON chd.C_ID = c.C_ID
        WHERE c.C_ID IN (
            SELECT C_ID 
            FROM ENROLLMENT 
            WHERE COURSE_ID = ?
        )
    `;

    db.query(sqlQuery, [courseId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query failed' });
        }

        res.json({ students: results });
    });
});



app.listen(5000, () => {
    console.log("Server is running on port 5000...");
    console.log(`Database connect with '${process.env.USER}' user and '${process.env.PASS}' password.`);

});

