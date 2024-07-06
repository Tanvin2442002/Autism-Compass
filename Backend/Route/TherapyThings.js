const express = require("express");
const { getConnection } = require("../DB/connection");
const router = express.Router();

router.get('/therapies', async (req, res) => {
    const connection = await getConnection();
    console.log("Request received");
    console.log(req.query); // Use req.query instead of req.body
    const result = await connection.execute(
        `SELECT *
        FROM THERAPY`
    );
    console.log(`Query result: ${JSON.stringify(result.rows)}`);
    res.status(200).send(result.rows);
    console.log("Request processed");
});


router.get('/therapy/search', async (req, res) => {
    const connection = await getConnection();
    const search = req.query.search ? `%${req.query.search.toLowerCase()}%` : '%'; // Use '%' to get all therapies if search is not defined
    console.log("Request received");
    console.log(req.query); // Use req.query instead of req.body
    try {
        const result = await connection.execute(
            `SELECT * FROM THERAPY WHERE LOWER(THERAPY_TYPE) LIKE :search`,
            { search }
        );
        console.log(`Query result: ${JSON.stringify(result.rows)}`);
        res.status(200).send(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send({ error: 'Database query failed' });
    } finally {
        console.log("Request processed");
    }
});

module.exports = router;
