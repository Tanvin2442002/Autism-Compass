const express = require("express");
const { getConnection } = require("../DB/connection");
const router = express.Router();

router.get('/disorder', async (req, res) => {
    const connection = await getConnection();
    console.log("Request received");
    console.log(req.query); // Use req.query instead of req.body
    const result = await connection.execute(
        `SELECT TYPE, DESCRIPTION
        FROM CHILD C, DISORDER D, CHILD_HAS_DISORDER CD
        WHERE C.C_ID = CD.C_ID
        AND CD.D0_ID = D.D0_ID
        AND C.C_ID = :C_ID`,
        {
            C_ID: req.query.ID, // Use req.query.ID instead of req.body.ID
        }
    );
    console.log(`Query result: ${JSON.stringify(result.rows)}`);
    res.status(200).send(result.rows);
    console.log("Request processed");
});

module.exports = router;
