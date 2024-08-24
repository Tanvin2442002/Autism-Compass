const express = require('express');
const { getConnection } = require('../DB/connection');
const router = express.Router();


router.get('/physician/detail', async (req, res) => {
  const connection = await getConnection();
  console.log("Request received to fetch physician details");
  const doctorId = req.query.H_ID;

  try {
    const result = await connection.execute(
      `SELECT * FROM HEALTH_PROFESSIONAL WHERE H_ID = :doctorId`,
      { doctorId }
    );
    res.status(200).send(result.rows);
    console.log("Physician details fetched successfully");
  } catch (error) {
    console.error('Error fetching physician details:', error);
    res.status(500).send({ error: 'Database query failed' });
  }
});


router.get('/physician/child/data', async (req, res) => {
  const connection = await getConnection();
  console.log("Request received to fetch child data");
  const P_ID = req.query.P_ID;

  try {
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
    console.log("Child data fetched successfully");
  } catch (error) {
    console.error('Error fetching child data:', error);
    res.status(500).send({ error: 'Database query failed' });
  }
});

/**
 * Fetch Parent Data for Child
 */
router.get('/physician/parent/data', async (req, res) => {
  const connection = await getConnection();
  console.log("Request received to fetch parent data");
  const C_ID = req.query.C_ID;

  try {
    const result = await connection.execute(
      `SELECT P.P_ID, C.C_ID, P.NAME AS PARENT_NAME, P.EMAIL AS PARENT_EMAIL, 
      C.NAME AS CHILD_NAME, C.EMAIL AS CHILD_EMAIL
      FROM PARENT_HAS_CHILD PHC, PARENT P, CHILD C
      WHERE PHC.P_ID = P.P_ID
      AND PHC.C_ID = C.C_ID
      AND PHC.C_ID = :C_ID`,
      { C_ID }
    );
    res.status(200).send(result.rows);
    console.log("Parent data fetched successfully");
  } catch (error) {
    console.error('Error fetching parent data:', error);
    res.status(500).send({ error: 'Database query failed' });
  }
});

/*
  Book Consultation with Physician
 */
router.post('/physician', async (req, res) => {
  const connection = await getConnection();
  console.log("Request received for booking consultation with physician");

  const { P_ID, H_ID, C_ID, BOOKING_DATE, BOOKING_TIME } = req.body;

  console.log("Booking data:", req.body);

  try {
    let parentId = P_ID;
    if (!parentId) {
      const result = await connection.execute(
        `SELECT PHC.P_ID AS P_ID
        FROM PARENT_HAS_CHILD PHC, CHILD C
        WHERE PHC.C_ID = C.C_ID
        AND C.C_ID = :C_ID`,
        { C_ID }
      );
      parentId = result.rows[0]?.P_ID;
      if (!parentId) {
        throw new Error('Parent ID not found for this child.');
      }
    }

    const result = await connection.execute(
      `INSERT INTO CONSULTS (P_ID, H_ID, C_ID, SELECTED_DATE, SELECTED_TIME)
        VALUES (:P_ID, :H_ID, :C_ID, TO_DATE(:BOOKING_DATE, 'YYYY-MM-DD'), :BOOKING_TIME)`,
      {
        P_ID: parentId,
        H_ID,
        C_ID,
        BOOKING_DATE,
        BOOKING_TIME
      },
      { autoCommit: true }
    );

    res.status(200).send({ message: 'Booking successful' });
    console.log("Consultation booked successfully");
  } catch (error) {
    console.error('Error executing query for booking:', error);
    res.status(500).send({ error: 'Database query failed' });
  }
});


/**
 * Check if Child Email is Associated with Parent
 */
router.get('/physician/child/check', async (req, res) => {
  const connection = await getConnection();
  console.log("Request received for checking child email");
  const { email, P_ID } = req.query;

  try {
    const result = await connection.execute(
      `SELECT C.C_ID AS C_ID, C.NAME AS NAME
       FROM CHILD C, PARENT_HAS_CHILD PHC, PARENT P
       WHERE C.C_ID = PHC.C_ID
       AND PHC.P_ID = P.P_ID
       AND C.EMAIL = :email
       AND P.P_ID = :P_ID`,
      { email, P_ID }
    );

    res.status(200).send(result.rows);
    console.log("Child email check completed");
  } catch (error) {
    console.error('Error executing query for child email check:', error);
    res.status(500).send({ error: 'Database query failed' });
  }
});

// Fetch All Consultations for a Parent or Child
router.get('/consultations/data', async (req, res) => {
  const connection = await getConnection();
  console.log("Request received for fetching consultations");
  const { id, type } = req.query;

  try {
    let result;
    if (type === "CHILD") {
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
        AND CO.C_ID = :id`,
        { P_ID, id }
      );
    } else if (type === "PARENT") {
      result = await connection.execute(
        `SELECT H.H_ID, P.P_ID, C.C_ID, H.NAME AS DOCTOR_NAME, H.FIELD_OF_SPEC, H.NAME_OF_HOSPITAL, TO_CHAR(SELECTED_DATE,'DD-MON-YYYY') AS SELECTED_DATE, CO.SELECTED_TIME, C.NAME AS CHILD_NAME
        FROM HEALTH_PROFESSIONAL H, PARENT P, CHILD C, CONSULTS CO
        WHERE H.H_ID = CO.H_ID
        AND CO.C_ID = C.C_ID
        AND CO.P_ID = P.P_ID
        AND P.P_ID = :id`,
        { id }
      );
    }
    res.status(200).send(result.rows || []);
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).send({ error: 'Database query failed' });
  }
});


// Cancel a Consultation
router.delete('/consultations/delete', async (req, res) => {
  const connection = await getConnection();
  const { P_ID, H_ID, C_ID } = req.query;
  console.log("Request received for deleting consultation");

  try {
    const result = await connection.execute(
      `DELETE FROM CONSULTS WHERE P_ID = :P_ID AND H_ID = :H_ID AND C_ID = :C_ID`,
      { P_ID, H_ID, C_ID },
      { autoCommit: true }
    );

    if (result.rowsAffected > 0) {
      res.status(200).send({ success: true });
      console.log("Consultation deleted successfully");
    } else {
      res.status(404).send({ success: false, message: 'Consultation not found' });
    }
  } catch (error) {
    console.error('Error executing query for consultation deletion:', error);
    res.status(500).send({ error: 'Database query failed' });
  }
});


module.exports = router;
