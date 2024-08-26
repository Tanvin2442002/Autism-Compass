const express = require('express');
const { getConnection } = require('../DB/connection');
const router = express.Router();

router.get("/booked-doc", async (req, res) => {
    const connection = await getConnection();
    console.log("Request received to fetch booked doctor details");
    const { id, type } = req.query;

    let result;
    try {
        if (type === 'PARENT') {
            result = await connection.execute(
                `SELECT H.H_ID, P.P_ID, C.C_ID, H.NAME AS DOCTOR_NAME, H.FIELD_OF_SPEC, H.NAME_OF_HOSPITAL, TO_CHAR(SELECTED_DATE,'DD-MON-YYYY') AS SELECTED_DATE, CO.SELECTED_TIME, C.NAME AS CHILD_NAME
            FROM HEALTH_PROFESSIONAL H, PARENT P, CHILD C, CONSULTS CO
            WHERE H.H_ID = CO.H_ID
            AND CO.C_ID = C.C_ID
            AND CO.P_ID = P.P_ID
            AND P.P_ID = :id
            ORDER BY CO.SELECTED_DATE`,
                { id }
            );
        }
        else {
            const parentId = await connection.execute(
                `SELECT P_ID FROM PARENT_HAS_CHILD WHERE C_ID = :id`,
                { id }
            );
            const P_ID = parentId.rows[0].P_ID;
            result = await connection.execute(
                `SELECT H.H_ID, P.P_ID, C.C_ID, H.NAME AS DOCTOR_NAME, H.FIELD_OF_SPEC, H.NAME_OF_HOSPITAL, TO_CHAR(SELECTED_DATE,'DD-MON-YYYY') AS SELECTED_DATE, CO.SELECTED_TIME, C.NAME AS CHILD_NAME
            FROM HEALTH_PROFESSIONAL H, PARENT P, CHILD C, CONSULTS CO
            WHERE H.H_ID = CO.H_ID
            AND CO.C_ID = C.C_ID
            AND CO.P_ID = P.P_ID
            AND P.P_ID = :P_ID 
            AND CO.C_ID = :id
            ORDER BY CO.SELECTED_DATE`,
                { P_ID, id }
            );
        }
        res.status(200).send(result.rows || []);
    } catch (error) {
        console.error('Error fetching consultations:', error);
        res.status(500).send({ error: 'Database query failed' });
    }
});

router.get("/available-doc", async (req, res) => {
    const connection = await getConnection();
    console.log("Request received to fetch available doctor details");

    try {
        const result = await connection.execute(
            `SELECT H.H_ID, H.NAME AS DOCTOR_NAME, H.FIELD_OF_SPEC, H.NAME_OF_HOSPITAL, H.CONTACT_NO
            FROM HEALTH_PROFESSIONAL H
            WHERE H.H_ID NOT IN (SELECT H_ID FROM CONSULTS)
            ORDER BY H.NAME`
        );
        res.status(200).send(result.rows || []);
    } catch (error) {
        console.error('Error fetching consultations:', error);
        res.status(500).send({ error: 'Database query failed' });
    }
});

router.get("/available-therapy", async (req, res) => {
    const connection = await getConnection();
    console.log("Request received to fetch available therapy details");

    try {
        const result = await connection.execute(
            `SELECT T.TH_ID, T.THERAPY_TYPE AS THERAPY_TYPE
            FROM THERAPY T
            ORDER BY T.THERAPY_TYPE`
        );
        res.status(200).send(result.rows || []);
    } catch (error) {
        console.error('Error fetching consultations:', error);
        res.status(500).send({ error: 'Database query failed' });
    }
});



router.get("/disorder-info", async (req, res) => {
    const connection = await getConnection();
    const C_ID = req.query.id;

    console.log(`Fetch Disorder Info for Child ID: ${C_ID}`);

    try {
        const result = await connection.execute(
            `SELECT C.C_ID, TYPE, DESCRIPTION
            FROM CHILD C, DISORDER D, CHILD_HAS_DISORDER CD
            WHERE C.C_ID = CD.C_ID
            AND CD.D0_ID = D.D0_ID
            AND C.C_ID = :C_ID`,
            {C_ID }
        );
        res.status(200).send(result.rows[0]);
    } catch (error) {
        console.error('Error fetching disorder info:', error);
        res.status(500).send({ error: 'Database query failed' });
    }
});


module.exports = router;