const express = require('express');
const sql = require('../DB/supabase');  // Use Supabase instance
const router = express.Router();

router.get('/suggests/data', async (req, res) => {
  console.log("Request received to fetch suggestions data");

  const { id, type } = req.query;

  try {
    let result;

    if (type === 'PARENT') {
      // Fetch all suggestions for children of a parent
      result = await sql`
        SELECT CHILD.NAME AS CHILD_NAME, HEALTH_PROFESSIONAL.H_ID, HEALTH_PROFESSIONAL.NAME AS HEALTH_PROFESSIONAL_NAME, THERAPY.TH_ID, THERAPY.THERAPY_TYPE, SUGGESTS.FEEDBACK
        FROM SUGGESTS
        JOIN CHILD ON SUGGESTS.C_ID = CHILD.C_ID
        JOIN PARENT_HAS_CHILD ON CHILD.C_ID = PARENT_HAS_CHILD.C_ID
        JOIN HEALTH_PROFESSIONAL ON SUGGESTS.H_ID = HEALTH_PROFESSIONAL.H_ID
        JOIN THERAPY ON SUGGESTS.TH_ID = THERAPY.TH_ID
        WHERE PARENT_HAS_CHILD.P_ID = ${id}
      `;
    } else if (type === 'CHILD') {
      // Fetch all suggestions for a specific child
      result = await sql`
        SELECT CHILD.NAME AS CHILD_NAME, HEALTH_PROFESSIONAL.H_ID, HEALTH_PROFESSIONAL.NAME AS HEALTH_PROFESSIONAL_NAME, THERAPY.TH_ID, THERAPY.THERAPY_TYPE, SUGGESTS.FEEDBACK
        FROM SUGGESTS
        JOIN CHILD ON SUGGESTS.C_ID = CHILD.C_ID
        JOIN HEALTH_PROFESSIONAL ON SUGGESTS.H_ID = HEALTH_PROFESSIONAL.H_ID
        JOIN THERAPY ON SUGGESTS.TH_ID = THERAPY.TH_ID
        WHERE CHILD.C_ID = ${id}
      `;
    }

    res.status(200).send(result || []);
    console.log("Suggestions data fetched successfully");
  } catch (error) {
    console.error('Error fetching suggestions data:', error);
    res.status(500).send({ error: 'Database query failed' });
  }
});

module.exports = router;