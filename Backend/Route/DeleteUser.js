const express = require("express");
const { getConnection } = require("../DB/connection");
const router = express.Router();
const oracledb = require('oracledb');

router.post('/child', async (req, res) => {
    const { C_ID } = req.body;
    let connection;
    try {
        connection = await getConnection();

        // Execute the Oracle function
        const result = await connection.execute(
            `BEGIN
                :result := DELETE_CHILD(:customer_id);
            END;`,
            {
                customer_id: { val: C_ID, dir: oracledb.BIND_IN, type: oracledb.STRING },  // Use STRING for VARCHAR2
                result: { dir: oracledb.BIND_OUT, type: oracledb.STRING }  // Keep result as STRING
            },{
                autoCommit : true
            }
        );

        console.log(result);
        res.status(200).json({ message: result.outBinds.result });
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'Error occurred during deletion' });
    } finally {
        if (connection) {
            try {
                await connection.close();  // Close the connection
            } catch (err) {
                console.error('Error closing connection:', err);
            }
        }
    }
});

module.exports = router;
