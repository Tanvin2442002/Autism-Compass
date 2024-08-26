const express = require("express");
const { getConnection } = require("../DB/connection");
const router = express.Router();

// Fetch all doctors
router.get('/doctors', async (req, res) => {
   const connection = await getConnection();
   console.log("Request received for fetching all doctors");
   try {
      const result = await connection.execute(
         `SELECT * FROM HEALTH_PROFESSIONAL`
      );
      res.status(200).send(result.rows);
      console.log("Request processed for fetching all doctors");
   } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});

// Search doctors by name or specialization
router.get('/doctors/search', async (req, res) => {
   const connection = await getConnection();
   const search = req.query.search ? `%${req.query.search.toLowerCase()}%` : '%';
   console.log("Request received for searching doctors");
   try {
      const result = await connection.execute(
         `SELECT * FROM HEALTH_PROFESSIONAL WHERE LOWER(NAME) LIKE :search OR LOWER(FIELD_OF_SPEC) LIKE :search`,
         { search }
      );
      res.status(200).send(result.rows);
      console.log("Request processed for searching doctors");
   } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});

// Fetch doctor details by ID
router.get('/doctor/detail', async (req, res) => {
   const connection = await getConnection();
   const doctorId = req.query.id;
   console.log("Request received for fetching doctor details");
   try {
      const result = await connection.execute(
         `SELECT * FROM HEALTH_PROFESSIONAL WHERE H_ID = :doctorId`,
         { doctorId }
      );
      res.status(200).send(result.rows);
      console.log(`Query result: ${JSON.stringify(result.rows)}`);
      console.log("Request processed for fetching doctor details");
   } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});


router.get('/consultations/data', async (req, res) => {
   const connection = await getConnection();
   const doctorId = req.query.id;
   console.log("Request received for fetching consultations");
   try {
      const result = await connection.execute(
         `SELECT P.P_ID AS P_ID, P.EMAIL AS PARENT_EMAIL, P.NAME AS PARENT_NAME,
            C.C_ID AS C_ID, C.NAME AS CHILD_NAME, TO_CHAR(CO.SELECTED_DATE, 'DD/MON/YY') AS SELECTED_DATE, CO.SELECTED_TIME
            FROM PARENT P, CHILD C, CONSULTS CO, HEALTH_PROFESSIONAL H
            WHERE CO.C_ID = C.C_ID
            AND CO.P_ID = P.P_ID
            AND CO.H_ID = H.H_ID
            AND CO.H_ID = :doctorId
            ORDER BY CO.SELECTED_DATE, CO.SELECTED_TIME`,
         { doctorId }
      );
      // console.log(`Query result: ${JSON.stringify(result.rows)}`);
      res.status(200).send(result.rows);
      console.log("Request processed for fetching consultations");
   } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});

router.get('/consultation/form/data', async (req, res) => {
   const connection = await getConnection();
   const p_id = req.query.P_ID;
   const c_id = req.query.C_ID;
   const d_id = req.query.D_ID;
   console.log("Request received for fetching consultation form data");
   try {
      const result = await connection.execute(
         `SELECT P.NAME AS PARENT_NAME, P.EMAIL AS PARENT_EMAIL, P.CONTACT_NO AS PARENT_CONTACT_NO,
            C.NAME AS CHILD_NAME, D.TYPE AS DISORDER 
            FROM PARENT P, CHILD C, DISORDER D, HEALTH_PROFESSIONAL H, CHILD_HAS_DISORDER CHD
            WHERE C.C_ID = CHD.C_ID
            AND CHD.D0_ID = D.D0_ID
            AND P.P_ID = :p_id
            AND C.C_ID = :c_id
            AND H.H_ID = :d_id`,
         { p_id, c_id, d_id }
      );
      res.status(200).send(result.rows);
      console.log("Request processed for fetching consultation form data");
   } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send({ error: 'Database query failed' });
   }

});


router.post('/consultation/done', async (req, res) => {
   console.log(req.body);
   const connection = await getConnection();
   const { C_ID, H_ID, TH_ID, FEEDBACK } = req.body;
   console.log("Request received for completing consultation");
   try {
      const result = await connection.execute(
         `INSERT INTO SUGGESTS (C_ID, H_ID, TH_ID, FEEDBACK)
            VALUES (:C_ID, :H_ID, :TH_ID, :FEEDBACK)`,
         { C_ID, H_ID, TH_ID, FEEDBACK }, { autoCommit: true }
      );
      res.status(200).send({ message: 'Consultation completed successfully' });
      console.log("Request processed for completing consultation");
   } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});


module.exports = router;
