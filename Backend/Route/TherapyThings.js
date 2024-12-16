const express = require('express');
const sql = require('../DB/supabase'); // Assuming you have configured supabase instance here
const router = express.Router();

// Fetch all therapies
router.get('/all', async (req, res) => {
    console.log("Request received to fetch all therapies");

    try {
        const result = await sql`SELECT * FROM THERAPY`;
        res.status(200).send(result || []);
        console.log("Request processed successfully");
    } catch (error) {
        console.error('Error fetching all therapies:', error);
        res.status(500).send({ error: 'Database query failed' });
    }
});

// Search therapies by type
router.get('/search', async (req, res) => {
    const search = req.query.search ? `%${req.query.search.toLowerCase()}%` : '%';
    console.log("Request received to search therapies");

    try {
        const result = await sql`
            SELECT * FROM THERAPY 
            WHERE LOWER(THERAPY_TYPE) LIKE ${search}
        `;
        res.status(200).send(result || []);
        console.log("Request processed successfully");
    } catch (error) {
        console.error('Error searching therapies:', error);
        res.status(500).send({ error: 'Database query failed' });
    }
});

// Fetch therapy details by ID
router.get('/Detail', async (req, res) => {
    const therapyType = req.query.type;
    console.log("Request received to fetch therapy details");

    try {
        const result = await sql`
            SELECT * FROM THERAPY 
            WHERE TH_ID = ${therapyType}
        `;
        res.status(200).send(result || []);
        console.log("Request processed successfully");
    } catch (error) {
        console.error('Error fetching therapy details:', error);
        res.status(500).send({ error: 'Database query failed' });
    }
});

// Fetch all therapy organizations
router.get('/orgdata', async (req, res) => {
    console.log("Request received to fetch all therapy organizations");

    try {
        const result = await sql`SELECT * FROM THERAPY_ORG`;
        res.status(200).send(result || []);
        console.log("Request processed successfully");
    } catch (error) {
        console.error('Error fetching therapy organizations:', error);
        res.status(500).send({ error: 'Database query failed' });
    }
});

// Fetch organizations associated with a therapy type
router.get('/org', async (req, res) => {
    const therapyType = req.query.type;
    console.log("Request received to fetch organizations by therapy type");

    try {
        const result = await sql`
            SELECT THO.THO_ID, THO.NAME, THO.CONTACT_NO, THO.EMAIL, THO.CITY, THO.STREET, THO.POSTAL_CODE
            FROM THERAPY_ORG THO
            JOIN THERAPY_HAS_THEAPYORG THT ON THO.THO_ID = THT.THO_ID
            JOIN THERAPY T ON THT.TH_ID = T.TH_ID
            WHERE T.TH_ID = ${therapyType}
        `;
        res.status(200).send(result || []);
        console.log("Request processed successfully");
    } catch (error) {
        console.error('Error fetching therapy organizations:', error);
        res.status(500).send({ error: 'Database query failed' });
    }
});

// Search therapy organizations by name
router.get('/org/search', async (req, res) => {
    const search = req.query.search ? `%${req.query.search.toLowerCase()}%` : '%';
    console.log("Request received to search therapy organizations");

    try {
        const result = await sql`
            SELECT * FROM THERAPY_ORG 
            WHERE LOWER(NAME) LIKE ${search}
        `;
        res.status(200).send(result || []);
        console.log("Request processed successfully");
    } catch (error) {
        console.error('Error searching therapy organizations:', error);
        res.status(500).send({ error: 'Database query failed' });
    }
});

module.exports = router;
