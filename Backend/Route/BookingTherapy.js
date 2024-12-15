const express = require('express');
const sql = require('../DB/supabase');
const router = express.Router();

router.get('/therapy/orgdata', async (req, res) => {
   console.log("Request received to fetch therapy organization data");
   const { THO_ID } = req.query;
   console.log(`Organization ID: ${THO_ID}`);

   try {
      const result = await sql`
            SELECT * FROM THERAPY_ORG WHERE THO_ID = ${THO_ID}
        `;
      res.status(200).send(result || []);
   } catch (error) {
      console.error('Error fetching therapy organization data:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});

router.get('/therapy/therapydata', async (req, res) => {
   console.log("Request received to fetch therapy data");
   const { TH_ID } = req.query;
   console.log(`Therapy ID: ${TH_ID}`);

   try {
      const result = await sql`
            SELECT * FROM THERAPY WHERE TH_ID = ${TH_ID}
        `;
      res.status(200).send(result || []);
   } catch (error) {
      console.error('Error fetching therapy data:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});

router.get('/therapy/child/data', async (req, res) => {
   console.log("Request received to fetch child data");
   const { P_ID } = req.query;
   console.log(`Parent ID: ${P_ID}`);

   try {
      const result = await sql`
            SELECT C.C_ID, C.NAME AS CHILD_NAME, C.EMAIL AS CHILD_EMAIL,
                   P.P_ID, P.NAME AS PARENT_NAME, P.EMAIL AS PARENT_EMAIL
            FROM PARENT_HAS_CHILD PHC
            JOIN PARENT P ON PHC.P_ID = P.P_ID
            JOIN CHILD C ON PHC.C_ID = C.C_ID
            WHERE PHC.P_ID = ${P_ID}
        `;
      res.status(200).send(result || []);
   } catch (error) {
      console.error('Error fetching child data:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});

router.get('/therapy/parent/data', async (req, res) => {
   console.log("Request received to fetch parent data");
   const { C_ID } = req.query;
   console.log(`Child ID: ${C_ID}`);

   try {
      const result = await sql`
            SELECT P.P_ID, C.C_ID, P.NAME AS PARENT_NAME, P.EMAIL AS PARENT_EMAIL,
                   C.NAME AS CHILD_NAME, C.EMAIL AS CHILD_EMAIL
            FROM PARENT_HAS_CHILD PHC
            JOIN PARENT P ON PHC.P_ID = P.P_ID
            JOIN CHILD C ON PHC.C_ID = C.C_ID
            WHERE PHC.C_ID = ${C_ID}
        `;
      res.status(200).send(result || []);
   } catch (error) {
      console.error('Error fetching parent data:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});

router.post('/therapy', async (req, res) => {
   console.log("Request received to create a booking");
   const { TH_ID, THO_ID, P_ID, C_ID, BOOKING_DATE } = req.body;
   console.log(`Booking Details: TH_ID: ${TH_ID}, THO_ID: ${THO_ID}, P_ID: ${P_ID}, C_ID: ${C_ID}, BOOKING_DATE: ${BOOKING_DATE}`);

   try {
      await sql`
            INSERT INTO BOOKS (TH_ID, THO_ID, P_ID, C_ID, BOOKING_DATE)
            VALUES (${TH_ID}, ${THO_ID}, ${P_ID}, ${C_ID}, TO_DATE(${BOOKING_DATE}, 'YYYY-MM-DD HH:MI AM'))
        `;
      res.status(200).send({ message: 'Booking successful' });
   } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});

router.get('/therapy/child/check', async (req, res) => {
   console.log("Request received to check child data");
   const { C_EMAIL, P_ID } = req.query;
   console.log(`Child Email: ${C_EMAIL}, Parent ID: ${P_ID}`);

   try {
      const result = await sql`
            SELECT C.C_ID AS C_ID, C.NAME AS NAME
            FROM CHILD C
            JOIN PARENT_HAS_CHILD PHC ON C.C_ID = PHC.C_ID
            JOIN PARENT P ON PHC.P_ID = P.P_ID
            WHERE C.EMAIL = ${C_EMAIL} AND P.P_ID = ${P_ID}
        `;
      res.status(200).send(result || []);
   } catch (error) {
      console.error('Error checking child data:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});

router.get('/data', async (req, res) => {
   console.log("Request received to fetch booking data");
   const { id, type } = req.query;
   console.log(`ID: ${id}, Type: ${type}`);

   try {
      let result;
      if (type === "CHILD") {
         const parentId = await sql`
                SELECT P_ID FROM PARENT_HAS_CHILD WHERE C_ID = ${id}
            `; 
         const P_ID = parentId[0]?.p_id;

         if (!P_ID) {
            return res.status(404).send({ error: "Parent ID not found for the given child." });
         }

         result = await sql`
                  SELECT DISTINCT
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
               FROM CHILD C
               JOIN PARENT P ON P.P_ID = C.P_ID
               JOIN BOOKS B ON C.C_ID = B.C_ID AND P.P_ID = B.P_ID
               JOIN THERAPY TH ON TH.TH_ID = B.TH_ID
               JOIN THERAPY_ORG THO ON THO.THO_ID = B.THO_ID
               WHERE B.C_ID = ${id} AND B.P_ID = ${P_ID}
               ORDER BY TO_CHAR(B.BOOKING_DATE, 'DD-MON-YYYY')

            `;
      } else if (type === "PARENT") {
         result = await sql`
                SELECT DISTINCT
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
                FROM CHILD C
                JOIN PARENT_HAS_CHILD PHC ON C.C_ID = PHC.C_ID
                JOIN PARENT P ON P.P_ID = PHC.P_ID
                JOIN BOOKS B ON C.C_ID = B.C_ID AND P.P_ID = B.P_ID
                JOIN THERAPY TH ON TH.TH_ID = B.TH_ID
                JOIN THERAPY_ORG THO ON THO.THO_ID = B.THO_ID
                WHERE B.P_ID = ${id}
            `;
      }

      res.status(200).send(result || []);
   } catch (error) {
      console.error('Error fetching booking data:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});

router.delete('/delete', async (req, res) => {
   console.log("Request received to delete booking");
   const { C_ID, P_ID, TH_ID, THO_ID } = req.query;
   console.log(`C_ID: ${C_ID}, P_ID: ${P_ID}, TH_ID: ${TH_ID}, THO_ID: ${THO_ID}`);

   try {
      const result = await sql`
            DELETE FROM BOOKS WHERE C_ID = ${C_ID} AND P_ID = ${P_ID} AND TH_ID = ${TH_ID} AND THO_ID = ${THO_ID}
        `;
      if (result.length > 0) {
         res.status(200).send({ success: true });
      } else {
         res.status(404).send({ success: false, message: 'Booking not found' });
      }
   } catch (error) {
      console.error('Error deleting booking:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});

router.put('/therapy/update', async (req, res) => {
   console.log("Request received to update booking");
   const { C_ID, P_ID, TH_ID, THO_ID, BOOKING_DATE } = req.body;
   console.log(`Updated Booking Details: ${C_ID}, ${P_ID}, ${TH_ID}, ${THO_ID}, ${BOOKING_DATE}`);

   try {
      await sql`
            UPDATE BOOKS 
            SET BOOKING_DATE = TO_DATE(${BOOKING_DATE}, 'YYYY-MM-DD HH:MI AM')
            WHERE C_ID = ${C_ID} AND P_ID = ${P_ID} AND TH_ID = ${TH_ID} AND THO_ID = ${THO_ID}
        `;
      res.status(200).send({ message: 'Booking updated' });
   } catch (error) {
      console.error('Error updating booking:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});


router.get('/therapy/check', async (req, res) => {
   console.log("Request received to check therapy details");
   const { C_ID, P_ID, TH_ID, THO_ID } = req.query;
   console.log(`C_ID: ${C_ID}, P_ID: ${P_ID}, TH_ID: ${TH_ID}, THO_ID: ${THO_ID}`);

   try {
      const result = await sql`
            SELECT * FROM BOOKS 
            WHERE C_ID = ${C_ID} 
            AND P_ID = ${P_ID} 
            AND TH_ID = ${TH_ID} 
            AND THO_ID = ${THO_ID}
        `;
      res.status(200).send(result || []);
   } catch (error) {
      console.error('Error checking therapy:', error);
      res.status(500).send({ error: 'Database query failed' });
   }
});

module.exports = router;
