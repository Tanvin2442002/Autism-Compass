const express = require("express");
const { getConnection } = require("../DB/connection");
const router = express.Router();

// Fetch all doctors
router.get('/doctors', async (req, res) => {
    const connection = await getConnection();
    console.log("Request received for fetching all doctors");
    try {
        const result = await connection.execute(
            `SELECT * FROM HEALTH_PROFESSIONAL`
        );
        res.status(200).send(result.rows);
        console.log("Request processed for fetching all doctors");
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send({ error: 'Database query failed' });
    }
});

// Search doctors by name or specialization
router.get('/doctors/search', async (req, res) => {
    const connection = await getConnection();
    const search = req.query.search ? `%${req.query.search.toLowerCase()}%` : '%';
    console.log("Request received for searching doctors");
    try {
        const result = await connection.execute(
            `SELECT * FROM HEALTH_PROFESSIONAL WHERE LOWER(NAME) LIKE :search OR LOWER(FIELD_OF_SPEC) LIKE :search`,
            { search }
        );
        res.status(200).send(result.rows);
        console.log("Request processed for searching doctors");
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send({ error: 'Database query failed' });
    }
});

// Fetch doctor details by ID
router.get('/doctor/detail', async (req, res) => {
    const connection = await getConnection();
    const doctorId = req.query.id;
    console.log("Request received for fetching doctor details");
    try {
        const result = await connection.execute(
            `SELECT * FROM HEALTH_PROFESSIONAL WHERE H_ID = :doctorId`,
            { doctorId }
        );
        res.status(200).send(result.rows);
        console.log(`Query result: ${JSON.stringify(result.rows)}`);
        console.log("Request processed for fetching doctor details");
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send({ error: 'Database query failed' });
    }
});

// Fetch child IDs associated with a parent
router.get('/parent/children', async (req, res) => {
    const connection = await getConnection();
    const parentId = req.query.id; // Get the parent ID from the query string
    console.log("Request received for fetching children by parent ID:", parentId);
    try {
        const result = await connection.execute(
            `SELECT C_ID FROM CHILD WHERE P_ID = :parentId`, // Query to fetch child IDs by parent ID
            { parentId }
        );
        res.status(200).send(result.rows.map(row => row.C_ID)); // Send back only the child IDs
        console.log("Request processed for fetching children by parent ID");
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send({ error: 'Database query failed' });
    }
});

module.exports = router;
