const express = require('express');
const sql = require('../DB/supabase');  // Use Supabase instance
const router = express.Router();

router.post('/child', async (req, res) => {
    const { C_ID } = req.body;

    try {
        // Call the PostgreSQL function
        const result = await sql`
            SELECT DELETE_CHILD(${C_ID})
        `;

        res.status(200).json({ message: result[0].result });
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'Error occurred during deletion' });
    }
});

router.post('/parent', async (req, res) => {
    const { P_ID } = req.body;

    try {
        // Call the PostgreSQL function
        const result = await sql`
            SELECT DELETE_PARENT(${P_ID})
        `;

        res.status(200).json({ message: result[0].result });
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'Error occurred during deletion' });
    }
});

router.post('/doctor', async (req, res) => {
    const { D_ID } = req.body;

    try {
        // Call the PostgreSQL function
        const result = await sql`
            SELECT DELETE_HEALTH_PROFESSIONAL(${D_ID})
        `;

        res.status(200).json({ message: result[0].result });
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'Error occurred during deletion' });
    }
});

router.post('/teacher', async (req, res) => {
    const { T_ID } = req.body;

    try {
        // Execute the PostgreSQL function with cascade delete
        const result = await sql`
            DELETE FROM TEACHER
            WHERE T_ID = ${T_ID}
            RETURNING T_ID
        `;

        if (result.count === 0) {
            res.status(404).json({ message: 'Teacher not found' });
        } else {
            res.status(200).json({ message: `Teacher with ID ${T_ID} deleted successfully` });
        }
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'Error occurred during deletion' });
    }
});

module.exports = router;