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
        `SELECT THO.THO_ID, THO.NAME, THO.CONTACT_NO, THO.EMAIL, THO.CITY, THO.STREET, THO.POSTAL_CODE
        FROM THERAPY_ORG THO, THERAPY T, THERAPY_HAS_THEAPYORG THT
        WHERE T.TH_ID = THT.TH_ID
        AND THT.THO_ID = THO.THO_ID
        AND T.TH_ID = :therapyType`,
        { therapyType }
    );
    res.status(200).send(result.rows);
    console.log("Request processed");
});

router.get('/therapy/org/search', async (req, res) => {
    const connection = await getConnection();
    const search = req.query.search ? `%${req.query.search.toLowerCase()}%` : '%';
    console.log("Request received");
    console.log(req.query);
    try {
        const result = await connection.execute(
            `SELECT * FROM THERAPY_ORG WHERE LOWER(NAME) LIKE :search`,
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


router.get('/therapy/booking/orgdata', async (req, res) => {
    const connection = await getConnection();
    console.log("Request received");
    console.log(req.query);
    const orgId = req.query.THO_ID;
    let result = await connection.execute(
        `SELECT * FROM THERAPY_ORG WHERE THO_ID = :orgId`,
        { orgId }
    );
    result = JSON.stringify(result.rows);
    res.status(200).send(result);
    console.log("Request processed");
});

router.get('/therapy/booking/therapydata', async (req, res) => {
    const connection = await getConnection();
    console.log("Request received");
    console.log(req.query);
    const therapyId = req.query.TH_ID;
    const result = await connection.execute(
        `SELECT * FROM THERAPY WHERE TH_ID = :therapyId`,
        { therapyId }
    );
    res.status(200).send(result.rows);
    console.log("Request processed");
});

router.get('/therapy/booking/child/data', async (req, res) => {
    const connection = await getConnection();
    console.log("Request received");
    console.log(req.query);
    const P_ID = req.query.P_ID;
    const result = await connection.execute(
        `SELECT C.C_ID, C.NAME AS CHILD_NAME, C.EMAIL AS CHILD_EMAIL,
        P.P_ID, P.NAME AS PARENT_NAME, P.EMAIL AS PARENT_EMAIL
        FROM PARENT_HAS_CHILD PHC, PARENT P, CHILD C
        WHERE PHC.P_ID = P.P_ID
        AND PHC.C_ID = C.C_ID
        AND PHC.P_ID = :P_ID`,
        { P_ID }
    );
    res.status(200).send(result.rows);
    console.log("Child data:", result.rows);
    console.log("Request processed");
});

router.get('/therapy/booking/parent/data', async (req, res) => {
    const connection = await getConnection();
    console.log("Request received");
    console.log(req.query);
    const C_ID = req.query.C_ID;
    const result = await connection.execute(
        `SELECT P.P_ID, C.C_ID, P.NAME AS PARENT_NAME, P.EMAIL AS PARENT_EMAIL, C.NAME AS CHILD_NAME, C.EMAIL AS CHILD_EMAIL
        FROM PARENT_HAS_CHILD PHC, PARENT P, CHILD C
        WHERE PHC.P_ID = P.P_ID
        AND PHC.C_ID = C.C_ID
        AND PHC.C_ID = :C_ID`,
        { C_ID }
    );
    res.status(200).send(result.rows);
    console.log("Request processed");
});


router.post('/therapy/booking', async (req, res) => {

    const connection = await getConnection();
    console.log("Request received");
    console.log(req.body);
    let { TH_ID, THO_ID, P_ID, C_ID, BOOKING_DATE } = req.body;
    try {
        const result = await connection.execute(
            `INSERT INTO BOOKS (TH_ID, THO_ID, P_ID, C_ID, BOOKING_DATE)
            VALUES (:TH_ID, :THO_ID, :P_ID, :C_ID, TO_DATE(:BOOKING_DATE, 'YYYY-MM-DD HH:MI AM'))`,
            { TH_ID, THO_ID, P_ID, C_ID, BOOKING_DATE },
            { autoCommit: true }
        );
        res.status(200).send({ message: 'Booking successful' });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send({ error: 'Database query failed' });
    } finally {
        console.log("Request processed");
    }
});

module.exports = router;
