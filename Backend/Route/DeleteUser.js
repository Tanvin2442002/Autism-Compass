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

router.post('/parent', async (req, res) => {
    const { P_ID } = req.body;
    let connection;
    try {
        connection = await getConnection();

        // Execute the Oracle function
        const result = await connection.execute(
            `BEGIN
                :result := DELETE_PARENT(:customer_id);
            END;`,
            {
                customer_id: { val: P_ID, dir: oracledb.BIND_IN, type: oracledb.STRING },  // Use STRING for VARCHAR2
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

router.post('/doctor', async (req, res) => {
    const { D_ID } = req.body;
    let connection;
    try {
        connection = await getConnection();

        // Execute the Oracle function
        const result = await connection.execute(
            `BEGIN
                :result := DELETE_HEALTH_PROFESSIONAL(:customer_id);
            END;`,
            {
                customer_id: { val: D_ID, dir: oracledb.BIND_IN, type: oracledb.STRING },  // Use STRING for VARCHAR2
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
    }
});

router.post('/teacher', async (req, res) => {
    const { T_ID } = req.body;
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(
            `BEGIN
                :result := DELETE_TEACHER(:customer_id);
            END;`,
            {
                customer_id: { val: T_ID, dir: oracledb.BIND_IN, type: oracledb.STRING },
                result: { dir: oracledb.BIND_OUT, type: oracledb.STRING }
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
    }
});

module.exports = router;
