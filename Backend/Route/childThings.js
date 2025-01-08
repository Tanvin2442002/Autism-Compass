const express = require("express");
const sql = require('../DB/supabase');
const router = express.Router();

router.get('/disorder', async (req, res) => {
    const { ID } = req.query;

    try {
        const result = await sql`
            SELECT D.TYPE, D.DESCRIPTION
            FROM CHILD C
            JOIN CHILD_HAS_DISORDER CD ON C.C_ID = CD.C_ID
            JOIN DISORDER D ON CD.D0_ID = D.D0_ID
            WHERE C.C_ID = ${ID}
        `;

        res.status(200).send(result || []);

    } catch (error) {
        console.error('Error fetching disorder data:', error);
        res.status(500).send({ error: 'Database query failed' });
    }
});

module.exports = router;