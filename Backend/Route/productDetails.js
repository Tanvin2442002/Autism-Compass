const express = require("express");
const { getConnection } = require("../DB/connection");
const routerProduct = express.Router();

routerProduct.get('/products/:id', async (req, res) => {
    let connection = await getConnection();

    try {

        const result = await connection.execute(
            `SELECT * FROM product WHERE id = :id`,
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const product = result.rows[0];
        const productDetails = {
            id: product[0],
            Title: product[1],
            src: product[2],
            Description: product[3],
            Content: product[4],
            price: product[5],
            count: product[6]
        };

        res.json(productDetails);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});


module.exports = routerProduct;