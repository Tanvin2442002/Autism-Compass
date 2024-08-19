const express = require('express');
const { getConnection } = require('../DB/connection');
const router = express.Router();

/**
 * Fetch Health Professional (Doctor) Details by ID
 */
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

/**
 * Fetch Child Data for Parent
 */
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

/**
 * Book Consultation with Physician
 */
router.post('/physician', async (req, res) => {
  const connection = await getConnection();
  console.log("Request received for booking consultation with physician");

  const { P_ID, H_ID, C_ID, BOOKING_DATE, BOOKING_TIME } = req.body;

  try {
    // If a child is logged in, fetch the parent ID from the parent-child relationship
    let parentId = P_ID;
    if (!parentId) {
      const result = await connection.execute(
        `SELECT P.P_ID
         FROM PARENT_HAS_CHILD PHC
         WHERE PHC.C_ID = :C_ID`,
        { C_ID }
      );
      parentId = result.rows[0]?.P_ID;
      if (!parentId) {
        throw new Error('Parent ID not found for this child.');
      }
    }

    const result = await connection.execute(
      `INSERT INTO CONSULTS (P_ID, H_ID, C_ID)
       VALUES (:P_ID, :H_ID, :C_ID)`,
      { P_ID: parentId, H_ID, C_ID },
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

module.exports = router;
