const express = require('express');
const { getConnection } = require('../DB/connection');
const router = express.Router();


router.get('/therapy/orgdata', async (req, res) => {
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

router.get('/therapy/therapydata', async (req, res) => {
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

router.get('/therapy/child/data', async (req, res) => {
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

router.get('/therapy/parent/data', async (req, res) => {
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


router.post('/therapy', async (req, res) => {

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


router.get('/therapy/child/check', async (req, res) => {
   const connection = await getConnection();
   console.log("Request received");
   console.log(req.query);
   const C_EMAIL = req.query.email;
   const P_ID = req.query.P_ID;
   const result = await connection.execute(
      `SELECT C.C_ID AS C_ID, C.NAME AS NAME
      FROM CHILD C, PARENT_HAS_CHILD PHC, PARENT P
      WHERE C.C_ID = PHC.C_ID
      AND PHC.P_ID = P.P_ID
      AND C.EMAIL = :C_EMAIL
      AND P.P_ID = :P_ID`, { C_EMAIL, P_ID }
   );
   res.status(200).send(result.rows);
   console.log("Request processed");
});

module.exports = router;
