const express = require("express");
const { getConnection } = require("../DB/connection");
const { autoCommit } = require("oracledb");
const routerProduct = express.Router();

routerProduct.get("/products/detail", async (req, res) => {
  const connection = await getConnection();
  const productID = req.query.ID;
  console.log("Request received");
  console.log(req.query);
  try {
    const result = await connection.execute(
      `SELECT * FROM PRODUCT WHERE PR_ID = :productID`,
      { productID }
    );
    console.log(`Query result: ${JSON.stringify(result.rows)}`);
    res.status(200).send(result.rows[0]); // Send the first product in the array
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Database query failed" });
  } finally {
    console.log("Request processed");
  }
});

routerProduct.get("/products", async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(`SELECT * FROM product `);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(result.rows);
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

routerProduct.post("/products/detail", async (req, res) => {
  const connection = await getConnection();
  const { P_ID, PR_ID, AMOUNT, QUANTITY, DOB } = req.body;
  const FinalAmount = parseInt(AMOUNT);
  console.log("Request received");
  console.log(req.body); // Use req.body instead of req.query
  console.log(FinalAmount);
  try {
    const result = await connection.execute(
      `INSERT INTO PURCHASES (P_ID, PR_ID, AMOUNT,QUANTITY, PURCHASE_DATE) VALUES (:P_ID, :PR_ID, :AMOUNT,:QUANTITY, TO_DATE(:DOB, 'YYYY-MM-DD'))`,
      { P_ID, PR_ID, AMOUNT, QUANTITY, DOB },
      { autoCommit: true }
    );
    console.log(`Query result: ${JSON.stringify(result)}`);
    res
      .status(200)
      .send({ message: "Product added to cart successfully", result }); // Send the first product in the array
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Database query failed" });
  } finally {
    console.log("Request processed");
  }
});

routerProduct.get("/products/detail/checkout", async (req, res) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).send({ error: "User ID is required" });
  }
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `
            SELECT PURCHASES.PR_ID, NAME, SRC, AMOUNT, PURCHASES.quantity
            FROM PRODUCT, PURCHASES
            WHERE PRODUCT.PR_ID = PURCHASES.PR_ID
            AND p_id = :userID
        `,
      { userID }
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

routerProduct.get("/products/detail/exists", async (req, res) => {
    const { userID } = req.query;
    let connection;
    try{
       connection = await getConnection();
        const result = await connection.execute(
            `SELECT PR_ID FROM PURCHASES WHERE P_ID = :userID `,
            { userID }
        );
       res.json(result.rows);
    }
    catch (error) {
        console.error("Error executing query:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});

routerProduct.delete("/products/detail/checkout", async (req, res) => {
  const { userID, PR_ID } = req.query;

  if (!userID || !PR_ID) {
    return res
      .status(400)
      .send({ error: "User ID and Product ID are required" });
  }
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `
            DELETE FROM PURCHASES
            WHERE p_id = :userID
            AND pr_id = :PR_ID
        `,
      { userID, PR_ID },
      { autoCommit: true }
    );

    const updatedCart = await connection.execute(
      `
            SELECT PURCHASES.PR_ID, NAME, SRC, AMOUNT, PURCHASES.quantity
            FROM PRODUCT, PURCHASES
            WHERE PRODUCT.PR_ID = PURCHASES.PR_ID
            AND p_id = :userID
        `,
      { userID }
    );

    res.json(updatedCart.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

routerProduct.get("/products/detail/checkout/total", async (req, res) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).send({ error: "User ID is required" });
  }
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `
            select sum(AMOUNT) as total,sum(PRICE_WITH_VAT) AS TOTAL_AMOUNT
            from PURCHASES
            GROUP BY P_ID
            HAVING P_ID = :userID`,
      { userID }
    );
    if (result.rows.length === 0) {
      res.status(404).send({ error: "No products found for this user" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});
routerProduct.post(
  "/products/detail/checkout/updateQuantity",
  async (req, res) => {
    const { userID, id, quantity } = req.body;

    if (!userID || !id || !quantity) {
      return res
        .status(400)
        .send({ error: "User ID, Product ID, and Quantity are required" });
    }

    let connection;

    try {
      connection = await getConnection();

      // Update the quantity in the PURCHASES table
      const result = await connection.execute(
        `
      UPDATE PURCHASES
      SET QUANTITY = :quantity,
      AMOUNT = (SELECT PRICE FROM PRODUCT WHERE PR_ID = :id) * :quantity
      WHERE P_ID = :userID
      AND PR_ID = :id
      `,
        { userID, id, quantity },
        { autoCommit: true }
      );

      // Fetch the updated cart items
      const updatedCartItems = await connection.execute(
        `
      SELECT PURCHASES.PR_ID, NAME, SRC, AMOUNT, PURCHASES.quantity
      FROM PRODUCT, PURCHASES
      WHERE PRODUCT.PR_ID = PURCHASES.PR_ID
      AND P_ID = :userID
      `,
        { userID }
      );

      res.json(updatedCartItems.rows);
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).send({ error: "Internal server error" });
    }
  }
);

routerProduct.get("/products/detail/checkout/deliveryman", async (req, res) => {
  const { city } = req.query;
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      `
            SELECT D_ID,NAME FROM DELIVERY
            WHERE
            LOWER(CITY) = LOWER(:city)`,
      { city }
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

routerProduct.post("/products/detail/checkout/setAddress", async (req, res) => {
  let connection;
  const { P_ID, D_ID, DELIVERY_DATE, CITY, STREET, HOUSE_NO } = req.body;
  console.log(req.body);
  try {
    connection = await getConnection();
    console.log("-------");
    const result = await connection.execute(
      `INSERT INTO GET (P_ID, D_ID, DELIVERY_DATE, CITY, STREET, HOUSE_NO) 
        VALUES (:P_ID,:D_ID,TO_DATE(:DELIVERY_DATE,'YYYY-MM-DD'),:CITY,:STREET,:HOUSE_NO)`,
      { P_ID, D_ID, DELIVERY_DATE, CITY, STREET, HOUSE_NO },
      {
        autoCommit: true,
      }
    );
    res
      .status(200)
      .send({ message: "Delivery address updated successfully!", result });
    console.log(res.status);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

routerProduct.get("/delivery", async (req, res) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).send({ error: "User ID is required" });
  }
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `
          SELECT PRODUCT.PR_ID, NAME, SRC, PRICE, PAYS.quantity
          FROM PRODUCT, PAYS
          WHERE PRODUCT.PR_ID = PAYS.PR_ID
          AND p_id = :userID
      `,
      { userID }
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

routerProduct.get("/delivery/track", async (req, res) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).send({ error: "User ID is required" });
  }
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `
          select DELIVERY_DATE,CITY,STREET,HOUSE_NO,D_ID
          FROM  GET 
          WHERE
          P_ID=:userID
      `,
      { userID }
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

routerProduct.get("/delivery/track/deliveryman", async (req, res) => {
  const { deliveryID } = req.query;

  if (!deliveryID) {
    return res.status(400).send({ error: "Delivery ID is required" });
  }
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `
          select NAME
          FROM  DELIVERY
          WHERE
          D_ID=:deliveryID
      `,
      { deliveryID }
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

routerProduct.post('/products/detail/checkout/setOrder', async (req, res) => {
  const { ORDER_ID, PR_ID, QUANTITY, P_ID, CITY, STREET, HOUSE_NO, DELIVERY_DATE } = req.body;
  console.log('set prder' ,req.body);
  let connection;
  try {
      connection = await getConnection();
      const result = await connection.execute(
          `INSERT INTO PAYS (B_ID, PR_ID, QUANTITY, P_ID, CITY, STREET, HOUSE_NO, DATE_OF_DELIVERY) 
          VALUES (:ORDER_ID, :PR_ID, :QUANTITY, :P_ID, :CITY, :STREET, :HOUSE_NO, TO_DATE(:DELIVERY_DATE, 'YYYY-MM-DD'))`,
          { ORDER_ID, PR_ID, QUANTITY, P_ID, CITY, STREET, HOUSE_NO, DELIVERY_DATE },
          {
              autoCommit: true,
          }
      );
      console.log('set result: ', result);
      res.status(200).send({ message: "Order placed successfully!", result });
  } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).send({ error: "Internal server error" });
  }
});


routerProduct.post('/products/detail/checkout/setBill', async (req, res) => {
    const { ORDER_ID,AMOUNT } = req.body;
    console.log(req.body);
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(
            `INSERT INTO BILLS (B_ID,AMOUNT) 
            VALUES (:ORDER_ID,:AMOUNT)`,
            { ORDER_ID,AMOUNT },
            {
                autoCommit: true,
            }
        );
        res.status(200).send({ message: "Bill generated successfully!", result });
    } catch (error) {
        console.error("Error executing query:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});

routerProduct.post('/products/detail/checkout/setAssignedTo', async (req, res) => {
    const { ORDER_ID, D_ID } = req.body;
    console.log(req.body);
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(
            `INSERT INTO ASSIGNED_TO (B_ID,D_ID) 
            VALUES (:ORDER_ID,:D_ID)`,
            { ORDER_ID,D_ID },
            {
                autoCommit: true,
            }
        );
        res.status(200).send({ message: "Delivery assigned successfully!", result });
    } catch (error) {
        console.error("Error executing query:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});

routerProduct.delete('/delivery/cart', async (req, res) => {
    const { userID } = req.query;
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(
            `DELETE FROM PURCHASES WHERE P_ID = :userID`,
            { userID },
            {
                autoCommit: true,
            }
        );
        res.status(200).send({ message: "Cart cleared successfully!", result });
    } catch (error) {
        console.error("Error executing query:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});

routerProduct.delete('/delivery/get', async (req, res) => {
  const { userID } = req.query;
  let connection;
  try {
      connection = await getConnection();
      const result = await connection.execute(
          `DELETE FROM GET WHERE P_ID = :userID`,
          { userID },
          {
              autoCommit: true,
          }
      );
      res.status(200).send({ message: "Cart cleared successfully!", result });
  } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = routerProduct;
