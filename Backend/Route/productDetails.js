const express = require("express");
const { getConnection } = require("../DB/connection");
const routerProduct = express.Router();

routerProduct.get('/products/:id', async (req, res) => {
    let connection;

    try {
        connection = await getConnection();

        const result = await connection.execute(
            `SELECT * FROM product WHERE id = :id`, { id: req.params.id }
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const product = result.rows[0];

        res.json(product);

    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Internal server error' });
    } 
});

module.exports = routerProduct;
