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

router.get("/booked-therapy", async (req, res) => {
    const connection = await getConnection();
    console.log("Request received");
    const receivedID = req.query.id;
    const receivedType = req.query.type;
    if (receivedType === "CHILD") {

        const parentId = await connection.execute(
            `SELECT P_ID FROM PARENT_HAS_CHILD WHERE C_ID = :receivedID`,
            { receivedID }
        );
        console.log("Parent ID:", parentId.rows[0].P_ID);
        const findPID = parentId.rows[0].P_ID;
        const result = await connection.execute(
            `SELECT UNIQUE C.C_ID AS C_ID, P.P_ID AS P_ID, TH.TH_ID AS TH_ID, THO.THO_ID AS THO_ID,
        C.NAME AS CHILD_NAME, P.NAME AS PARENT_NAME,
        P.EMAIL AS PARENT_EMAIL,TO_CHAR(B.BOOKING_DATE,'DD-MON-YYYY') AS BOOKING_DATE, TH.THERAPY_TYPE AS THERAPY_TYPE,
        THO.NAME AS ORG_NAME, THO.CONTACT_NO AS ORG_CONTACT_NO, THO.EMAIL AS ORG_EMAIL
        FROM CHILD C, PARENT P, PARENT_HAS_CHILD PHC, BOOKS B,
        THERAPY TH, THERAPY_HAS_THEAPYORG THTHO, THERAPY_ORG THO
        WHERE C.C_ID = PHC.C_ID
        AND P.P_ID = PHC.P_ID
        AND C.C_ID = B.C_ID
        AND P.P_ID = B.P_ID
        AND TH.TH_ID = B.TH_ID
        AND THO.THO_ID = B.THO_ID
        AND B.C_ID = :receivedID
        AND B.P_ID = :findPID`,
            { receivedID, findPID }
        );
        res.status(200).send(result.rows);
    }
    else if (receivedType === "PARENT") {
        const result = await connection.execute(
            `SELECT UNIQUE C.C_ID AS C_ID, P.P_ID AS P_ID, TH.TH_ID AS TH_ID, THO.THO_ID AS THO_ID,
            C.NAME AS CHILD_NAME, TO_CHAR(B.BOOKING_DATE,'DD-MON-YYYY') AS BOOKING_DATE, TH.THERAPY_TYPE AS THERAPY_TYPE,
            THO.NAME AS ORG_NAME, THO.CONTACT_NO AS ORG_CONTACT_NO
            FROM CHILD C, PARENT P, PARENT_HAS_CHILD PHC, BOOKS B,
            THERAPY TH, THERAPY_HAS_THEAPYORG THTHO, THERAPY_ORG THO
            WHERE C.C_ID = PHC.C_ID
            AND P.P_ID = PHC.P_ID
            AND C.C_ID = B.C_ID
            AND P.P_ID = B.P_ID
            AND TH.TH_ID = B.TH_ID
            AND THO.THO_ID = B.THO_ID
            AND B.P_ID = :receivedID`,
            { receivedID }
        );

        res.status(200).send(result.rows);
    }
});

module.exports = router;