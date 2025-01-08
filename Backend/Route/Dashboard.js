const express = require('express');
const sql = require('../DB/supabase');
const router = express.Router();

router.get("/booked-doc", async (req, res) => {
    const { id, type } = req.query;
    try {
        let result;
        if (type === 'PARENT') {
            result = await sql`
                SELECT H.H_ID, P.P_ID, C.C_ID, H.NAME AS DOCTOR_NAME, H.FIELD_OF_SPEC, H.NAME_OF_HOSPITAL, 
                       TO_CHAR(CO.SELECTED_DATE, 'DD-MON-YYYY') AS SELECTED_DATE, CO.SELECTED_TIME, C.NAME AS CHILD_NAME
                FROM HEALTH_PROFESSIONAL H
                JOIN CONSULTS CO ON H.H_ID = CO.H_ID
                JOIN CHILD C ON CO.C_ID = C.C_ID
                JOIN PARENT P ON CO.P_ID = P.P_ID
                WHERE P.P_ID = ${id}+
                ORDER BY CO.SELECTED_DATE;
            `;
        } else {
            const parentId = await sql`
                SELECT P_ID FROM PARENT_HAS_CHILD WHERE C_ID = ${id};
            `;

    
            const P_ID = parentId[0]?.p_id;
            
    

            if (!P_ID) {
                return res.status(404).send({ error: "Parent ID not found for the given child." });
            }

            result = await sql`
                SELECT H.H_ID, P.P_ID, C.C_ID, H.NAME AS DOCTOR_NAME, H.FIELD_OF_SPEC, H.NAME_OF_HOSPITAL, 
                       TO_CHAR(CO.SELECTED_DATE, 'DD-MON-YYYY') AS SELECTED_DATE, CO.SELECTED_TIME, C.NAME AS CHILD_NAME
                FROM HEALTH_PROFESSIONAL H
                JOIN CONSULTS CO ON H.H_ID = CO.H_ID
                JOIN CHILD C ON CO.C_ID = C.C_ID
                JOIN PARENT P ON CO.P_ID = P.P_ID
                WHERE P.P_ID = ${P_ID} AND CO.C_ID = ${id}
                ORDER BY CO.SELECTED_DATE;
            `;

    
        }

        res.status(200).send(result || []);
    } catch (error) {
        console.error('Error fetching consultations:', error);
        res.status(500).send({ error: 'Database query failed' });
    }
});

router.get("/available-doc", async (req, res) => {

    try {
        const result = await sql`
            SELECT H.H_ID, H.NAME AS DOCTOR_NAME, H.FIELD_OF_SPEC, H.NAME_OF_HOSPITAL, H.CONTACT_NO
            FROM HEALTH_PROFESSIONAL H
            WHERE NOT EXISTS (
                SELECT 1 FROM CONSULTS CO WHERE CO.H_ID = H.H_ID
            )
            ORDER BY H.NAME;
        `;
        res.status(200).send(result || []);
    } catch (error) {
        console.error('Error fetching available doctors:', error);
        res.status(500).send({ error: 'Database query failed' });
    }
});

router.get("/available-therapy", async (req, res) => {

    try {
        const result = await sql`
            SELECT T.TH_ID, T.THERAPY_TYPE AS THERAPY_TYPE
            FROM THERAPY T
            ORDER BY T.THERAPY_TYPE;
        `;
        res.status(200).send(result || []);
    } catch (error) {
        console.error('Error fetching available therapies:', error);
        res.status(500).send({ error: 'Database query failed' });
    }
});

router.get("/disorder-info", async (req, res) => {
    const C_ID = req.query.id;


    try {
        const result = await sql`
            SELECT C.C_ID, D.TYPE, D.DESCRIPTION
            FROM CHILD C
            JOIN CHILD_HAS_DISORDER CD ON C.C_ID = CD.C_ID
            JOIN DISORDER D ON CD.D0_ID = D.D0_ID
            WHERE C.C_ID = ${C_ID};
        `;

        if (result.length === 0) {
            return res.status(404).send({ error: "No disorder information found for the given child." });
        }

        res.status(200).send(result[0]);
    } catch (error) {
        console.error('Error fetching disorder info:', error);
        res.status(500).send({ error: 'Database query failed' });
    }
});

module.exports = router;
