const express = require('express');
const sql = require('../DB/supabase');
const router = express.Router();

// Fetch all doctors
router.get('/doctors', async (req, res) => {
   console.log("Request received for fetching all doctors");
   try {
      const result = await sql`
            SELECT * FROM HEALTH_PROFESSIONAL;
        `;
      res.status(200).send(result || []);
      console.log("Request processed for fetching all doctors");
   } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});

// Search doctors by name or specialization
router.get('/doctors/search', async (req, res) => {
   const search = req.query.search ? `%${req.query.search.toLowerCase()}%` : '%';
   console.log("Request received for searching doctors");
   try {
      const result = await sql`
            SELECT * FROM HEALTH_PROFESSIONAL 
            WHERE LOWER(NAME) LIKE ${search} OR LOWER(FIELD_OF_SPEC) LIKE ${search};
        `;
      res.status(200).send(result || []);
      console.log("Request processed for searching doctors");
   } catch (error) {
      console.error('Error searching doctors:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});

// Fetch doctor details by ID
router.get('/doctor/detail', async (req, res) => {
   const doctorId = req.query.id;
   console.log("Request received for fetching doctor details");
   try {
      const result = await sql`
            SELECT * FROM HEALTH_PROFESSIONAL WHERE H_ID = ${doctorId};
        `;
      res.status(200).send(result || []);
      console.log(`Query result: ${JSON.stringify(result)}`);
      console.log("Request processed for fetching doctor details");
   } catch (error) {
      console.error('Error fetching doctor details:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});

// Fetch consultations for a doctor
router.get('/consultations/data', async (req, res) => {
   const doctorId = req.query.id;
   console.log("Request received for fetching consultations");
   try {
      const result = await sql`
            SELECT P.P_ID, P.EMAIL AS PARENT_EMAIL, P.NAME AS PARENT_NAME,
                   C.C_ID, C.NAME AS CHILD_NAME, 
                   TO_CHAR(CO.SELECTED_DATE, 'DD/MON/YY') AS SELECTED_DATE, CO.SELECTED_TIME
            FROM PARENT P
            JOIN CONSULTS CO ON CO.P_ID = P.P_ID
            JOIN CHILD C ON CO.C_ID = C.C_ID
            WHERE CO.H_ID = ${doctorId}
            ORDER BY CO.SELECTED_DATE, CO.SELECTED_TIME;
        `;
      res.status(200).send(result || []);
      console.log("Request processed for fetching consultations");
   } catch (error) {
      console.error('Error fetching consultations:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});

// Fetch consultation form data
router.get('/consultation/form/data', async (req, res) => {
   const { P_ID, C_ID, D_ID } = req.query;
   console.log("Request received for fetching consultation form data");
   try {
      const result = await sql`
            SELECT P.NAME AS PARENT_NAME, P.EMAIL AS PARENT_EMAIL, P.CONTACT_NO AS PARENT_CONTACT_NO,
                   C.NAME AS CHILD_NAME, D.TYPE AS DISORDER
            FROM PARENT P
            JOIN CHILD C ON C.C_ID = ${C_ID}
            JOIN CHILD_HAS_DISORDER CHD ON CHD.C_ID = C.C_ID
            JOIN DISORDER D ON CHD.D0_ID = D.D0_ID
            WHERE P.P_ID = ${P_ID} AND C.C_ID = ${C_ID};
        `;
      res.status(200).send(result || []);
      console.log("Request processed for fetching consultation form data");
   } catch (error) {
      console.error('Error fetching consultation form data:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});

// Complete a consultation
router.post('/consultation/done', async (req, res) => {
   console.log(req.body);
   const { C_ID, H_ID, TH_ID, FEEDBACK } = req.body;
   console.log("Request received for completing consultation");
   try {
      const result = await sql`
            INSERT INTO SUGGESTS (C_ID, H_ID, TH_ID, FEEDBACK)
            VALUES (${C_ID}, ${H_ID}, ${TH_ID}, ${FEEDBACK});
        `;
      res.status(200).send({ message: 'Consultation completed successfully' });
      console.log("Request processed for completing consultation");
   } catch (error) {
      console.error('Error completing consultation:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});

module.exports = router;
