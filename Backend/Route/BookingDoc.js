const express = require('express');
const sql = require('../DB/supabase');
const router = express.Router();

// Fetch physician details by ID
router.get('/physician/detail', async (req, res) => {
  const doctorId = req.query.H_ID;
  try {
    const result = await sql`
            SELECT * FROM HEALTH_PROFESSIONAL WHERE H_ID = ${doctorId};
        `;
    res.status(200).send(result || []);

  } catch (error) {
    console.error('Error fetching physician details:', error);
    res.status(500).send({ error: 'Database query failed' });
  }
});

// Fetch child data for a parent
router.get('/physician/child/data', async (req, res) => {
  const P_ID = req.query.P_ID;
  try {
    const result = await sql`
            SELECT C.C_ID, C.NAME AS CHILD_NAME, C.EMAIL AS CHILD_EMAIL, 
                  P.P_ID, P.NAME AS PARENT_NAME, P.EMAIL AS PARENT_EMAIL
            FROM PARENT_HAS_CHILD PHC
            JOIN PARENT P ON PHC.P_ID = P.P_ID
            JOIN CHILD C ON PHC.C_ID = C.C_ID
            WHERE PHC.P_ID = ${P_ID};
        `;
    res.status(200).send(result || []);

  } catch (error) {
    console.error('Error fetching child data:', error);
    res.status(500).send({ error: 'Database query failed' });
  }
});

// Fetch parent data for a child
router.get('/physician/parent/data', async (req, res) => {
  const C_ID = req.query.C_ID;
  try {
    const result = await sql`
            SELECT P.P_ID, C.C_ID, P.NAME AS PARENT_NAME, P.EMAIL AS PARENT_EMAIL, 
                  C.NAME AS CHILD_NAME, C.EMAIL AS CHILD_EMAIL
            FROM PARENT_HAS_CHILD PHC
            JOIN PARENT P ON PHC.P_ID = P.P_ID
            JOIN CHILD C ON PHC.C_ID = C.C_ID
            WHERE PHC.C_ID = ${C_ID};
        `;
    res.status(200).send(result || []);

  } catch (error) {
    console.error('Error fetching parent data:', error);
    res.status(500).send({ error: 'Database query failed' });
  }
});

// Book consultation with physician
router.post('/physician', async (req, res) => {
  const { P_ID, H_ID, C_ID, BOOKING_DATE, BOOKING_TIME } = req.body;

  try {
    let parentId = P_ID;
    if (!parentId) {
      const result = await sql`
                SELECT PHC.P_ID AS P_ID
                FROM PARENT_HAS_CHILD PHC
                JOIN CHILD C ON PHC.C_ID = C.C_ID
                WHERE C.C_ID = ${C_ID};
            `;
      parentId = result[0]?.P_ID;
      if (!parentId) {
        throw new Error('Parent ID not found for this child.');
      }
    }

    await sql`
            INSERT INTO CONSULTS (P_ID, H_ID, C_ID, SELECTED_DATE, SELECTED_TIME)
            VALUES (${parentId}, ${H_ID}, ${C_ID}, ${BOOKING_DATE}, ${BOOKING_TIME});
        `;

    res.status(200).send({ message: 'Booking successful' });

  } catch (error) {
    console.error('Error executing query for booking:', error);
    res.status(500).send({ error: 'Database query failed' });
  }
});

// Check if child email is associated with a parent
router.get('/physician/child/check', async (req, res) => {
  const { email, P_ID } = req.query;
  try {
    const result = await sql`
            SELECT C.C_ID AS C_ID, C.NAME AS NAME
            FROM CHILD C
            JOIN PARENT_HAS_CHILD PHC ON C.C_ID = PHC.C_ID
            JOIN PARENT P ON PHC.P_ID = P.P_ID
            WHERE C.EMAIL = ${email} AND P.P_ID = ${P_ID};
        `;

    res.status(200).send(result || []);

  } catch (error) {
    console.error('Error executing query for child email check:', error);
    res.status(500).send({ error: 'Database query failed' });
  }
});

// Fetch consultations for a parent or child
router.get('/consult/data', async (req, res) => {
  const { id, type } = req.query;
  try {
    let result;
    if (type === 'CHILD') {
      const parentId = await sql`
                SELECT P_ID FROM PARENT_HAS_CHILD WHERE C_ID = ${id};
            `;
      const P_ID = parentId[0]?.p_id;
      result = await sql`
                SELECT H.H_ID, P.P_ID, C.C_ID, H.NAME AS DOCTOR_NAME, H.FIELD_OF_SPEC, 
                      H.NAME_OF_HOSPITAL, TO_CHAR(SELECTED_DATE,'DD-MON-YYYY') AS SELECTED_DATE, 
                      CO.SELECTED_TIME, C.NAME AS CHILD_NAME
                FROM HEALTH_PROFESSIONAL H
                JOIN CONSULTS CO ON H.H_ID = CO.H_ID
                JOIN CHILD C ON CO.C_ID = C.C_ID
                JOIN PARENT P ON CO.P_ID = P.P_ID
                WHERE P.P_ID = ${P_ID} AND CO.C_ID = ${id};
            `;
    } else if (type === "PARENT") {
      result = await sql`
                SELECT H.H_ID, P.P_ID, C.C_ID, H.NAME AS DOCTOR_NAME, H.FIELD_OF_SPEC, 
                      H.NAME_OF_HOSPITAL, TO_CHAR(SELECTED_DATE,'DD-MON-YYYY') AS SELECTED_DATE, 
                      CO.SELECTED_TIME, C.NAME AS CHILD_NAME
                FROM HEALTH_PROFESSIONAL H
                JOIN CONSULTS CO ON H.H_ID = CO.H_ID
                JOIN CHILD C ON CO.C_ID = C.C_ID
                JOIN PARENT P ON CO.P_ID = P.P_ID
                WHERE P.P_ID = ${id};
            `;
    }
    res.status(200).send(result || []);

  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).send({ error: 'Database query failed' });
  }
});

// Cancel a consultation
router.delete('/consultations/delete', async (req, res) => {
  const { P_ID, H_ID, C_ID } = req.query;
  try {
    const result = await sql`
            DELETE FROM CONSULTS WHERE P_ID = ${P_ID} AND H_ID = ${H_ID} AND C_ID = ${C_ID};
        `;

    if (result.count > 0) {
      res.status(200).send({ success: true });
  
    } else {
      res.status(404).send({ success: false, message: 'Consultation not found' });
    }
  } catch (error) {
    console.error('Error executing query for consultation deletion:', error);
    res.status(500).send({ error: 'Database query failed' });
  }
});

module.exports = router;
