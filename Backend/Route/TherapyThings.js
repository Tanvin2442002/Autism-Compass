const express = require("express");
const { getConnection } = require("../DB/connection");
const router = express.Router();

router.get('/therapies', async (req, res) => {
    const connection = await getConnection();
    console.log("Request received");
    console.log(req.query);
    const result = await connection.execute(
        `SELECT *
        FROM THERAPY`
    );
    res.status(200).send(result.rows);
    console.log("Request processed");
});


router.get('/therapy/search', async (req, res) => {
    const connection = await getConnection();
    const search = req.query.search ? `%${req.query.search.toLowerCase()}%` : '%';
    console.log("Request received");
    console.log(req.query);
    try {
        const result = await connection.execute(
            `SELECT * FROM THERAPY WHERE LOWER(THERAPY_TYPE) LIKE :search`,
            { search }
        );
        res.status(200).send(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send({ error: 'Database query failed' });
    } finally {
        console.log("Request processed");
    }
});

router.get('/therapy/Detail', async (req, res) => {
    const connection = await getConnection();
    const therapyType = req.query.type;
    console.log("Request received");
    console.log(req.query);
    try {
        const result = await connection.execute(
            `SELECT * FROM THERAPY WHERE TH_ID = :therapyType`,
            { therapyType }
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


router.get('/therapy/orgdata', async (req, res) => {
    const connection = await getConnection();
    console.log("Request received");
    console.log(req.query);
    const result = await connection.execute(
        `SELECT * FROM THERAPY_ORG`
    );
    res.status(200).send(result.rows);
    console.log("Request processed");
});

router.get('/therapy/org', async (req, res) => {
    const connection = await getConnection();
    console.log("Request received");
    console.log(req.query);
    const therapyType = req.query.type;
    const result = await connection.execute(
        `SELECT THO.NAME, THO.CONTACT_NO, THO.EMAIL, THO.CITY, THO.STREET, THO.POSTAL_CODE
        FROM THERAPY_ORG THO, THERAPY T, THERAPY_HAS_THEAPYORG THT
        WHERE T.TH_ID = THT.TH_ID
        AND THT.THO_ID = THO.THO_ID
        AND T.TH_ID = :therapyType`,
        { therapyType }
    );
    res.status(200).send(result.rows);
    console.log("Request processed");
});


module.exports = router;
