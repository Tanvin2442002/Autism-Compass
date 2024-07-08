const express = require("express");
const { getConnection } = require("../DB/connection");
const routerProduct = express.Router();

routerProduct.get('/products/detail', async (req, res) => {
    const connection = await getConnection();
    const productID = req.query.ID;
    console.log("Request received");
    console.log(req.query); // Use req.query instead of req.body
    try {
        const result = await connection.execute(
            `SELECT * FROM PRODUCT WHERE PR_ID = :productID`,
            { productID }
        );
        console.log(`Query result: ${JSON.stringify(result.rows)}`);
        res.status(200).send(result.rows[0]); // Send the first product in the array
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send({ error: 'Database query failed' });
    } finally {
        console.log("Request processed");
    }
});


routerProduct.get('/products', async (req, res) => {
    let connection;

    try {
        connection = await getConnection();

        const result = await connection.execute(
            `SELECT * FROM product `
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
       
        res.json(result.rows);

    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Internal server error' });
    } 
});

module.exports = routerProduct;
