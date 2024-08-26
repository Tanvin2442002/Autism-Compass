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

router.get('/data', async (req, res) => {
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
         `SELECT DISTINCT
            C.C_ID AS C_ID,
            P.P_ID AS P_ID,
            TH.TH_ID AS TH_ID,
            THO.THO_ID AS THO_ID,
            C.NAME AS CHILD_NAME,
            C.EMAIL AS CHILD_EMAIL,
            P.NAME AS PARENT_NAME,
            P.EMAIL AS PARENT_EMAIL,
            TO_CHAR(B.BOOKING_DATE, 'DD-MON-YYYY') AS BOOKING_DATE,
            TH.THERAPY_TYPE AS THERAPY_TYPE,
            THO.NAME AS ORG_NAME,
            THO.CONTACT_NO AS ORG_CONTACT_NO,
            THO.EMAIL AS ORG_EMAIL,
            THO.CITY AS ORG_CITY,
            THO.STREET AS ORG_STREET,
            THO.POSTAL_CODE AS ORG_POSTAL_CODE
         FROM
            CHILD C, PARENT P, PARENT_HAS_CHILD PHC, THERAPY TH, THERAPY_HAS_THEAPYORG THT,
            THERAPY_ORG THO, BOOKS B
         WHERE
            B.C_ID = C.C_ID
            AND B.P_ID = P.P_ID
            AND B.TH_ID = TH.TH_ID
            AND B.THO_ID = THO.THO_ID
            AND B.C_ID = :receivedID
            AND B.P_ID = :findPID
         ORDER BY
            TO_CHAR(B.BOOKING_DATE, 'DD-MON-YYYY')`,
         { receivedID, findPID }
      );
      res.status(200).send(result.rows);
   }
   else if (receivedType === "PARENT") {
      const result = await connection.execute(
         `SELECT DISTINCT
            C.C_ID AS C_ID,
            P.P_ID AS P_ID,
            TH.TH_ID AS TH_ID,
            THO.THO_ID AS THO_ID,
            C.NAME AS CHILD_NAME,
            C.EMAIL AS CHILD_EMAIL,
            P.NAME AS PARENT_NAME,
            P.EMAIL AS PARENT_EMAIL,
            TO_CHAR(B.BOOKING_DATE, 'DD-MON-YYYY') AS BOOKING_DATE,
            TH.THERAPY_TYPE AS THERAPY_TYPE,
            THO.NAME AS ORG_NAME,
            THO.CONTACT_NO AS ORG_CONTACT_NO,
            THO.EMAIL AS ORG_EMAIL,
            THO.CITY AS ORG_CITY,
            THO.STREET AS ORG_STREET,
            THO.POSTAL_CODE AS ORG_POSTAL_CODE
         FROM
            CHILD C
            JOIN PARENT_HAS_CHILD PHC ON C.C_ID = PHC.C_ID
            JOIN PARENT P ON P.P_ID = PHC.P_ID
            JOIN BOOKS B ON C.C_ID = B.C_ID AND P.P_ID = B.P_ID
            JOIN THERAPY TH ON TH.TH_ID = B.TH_ID
            JOIN THERAPY_HAS_THEAPYORG THTHO ON TH.TH_ID = THTHO.TH_ID
            JOIN THERAPY_ORG THO ON THO.THO_ID = B.THO_ID
         WHERE
            B.P_ID = :receivedID`,
         { receivedID }
      );

      res.status(200).send(result.rows);
   }
});

router.delete('/delete', async (req, res) => {
   const connection = await getConnection();
   const { C_ID, P_ID, TH_ID, THO_ID } = req.query;
   console.log("Request received", { C_ID, P_ID, TH_ID, THO_ID });

   try {
      const result = await connection.execute(
         `DELETE FROM BOOKS WHERE C_ID = :C_ID AND P_ID = :P_ID AND TH_ID = :TH_ID AND THO_ID = :THO_ID`,
         { C_ID, P_ID, TH_ID, THO_ID },
         { autoCommit: true }
      );
      console.log('Rows affected:', result.rowsAffected);

      if (result.rowsAffected > 0) {
         res.status(200).send({ success: true });
      } else {
         res.status(404).send({ success: false, message: 'Record not found' });
      }
   } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send({ error: 'Database query failed' });
   } finally {
      console.log("Request processed");
   }
});


module.exports = router;
