const express = require("express");
const sql = require("../DB/supabase");
const routerProduct = express.Router();

routerProduct.get("/products/detail", async (req, res) => {
  const productID = req.query.ID;


  try {
    const result = await sql
      `SELECT * FROM PRODUCT WHERE PR_ID = ${productID};`;
  
    res.status(200).send(result.rows[0]); // Send the first product in the array
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Database query failed" });
  } finally {
  
  }
});

// const oracledb = require("oracledb"); 

routerProduct.get("/products", async (req, res) => {
  try {
    const result = await sql`SELECT * FROM PRODUCT;`;
    const rows = result;
    res.json(rows);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


routerProduct.post("/products/add/cart", async (req, res) => {
  const { P_ID, PR_ID, AMOUNT, QUANTITY, DOB } = req.body;
  const FinalAmount = parseInt(AMOUNT);
  try {
    const result = await sql
    `INSERT INTO PURCHASES (P_ID, PR_ID, AMOUNT,QUANTITY, PURCHASE_DATE) VALUES (${P_ID}, ${PR_ID},${FinalAmount},${QUANTITY}, TO_DATE(${DOB}, 'YYYY-MM-DD'));`;
  
    res
      .status(200)
      .send({ message: "Product added to cart successfully", result }); // Send the first product in the array
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Database query failed" });
  } finally {
  
  }
});

routerProduct.get("/products/detail/checkout", async (req, res) => {
  const { userID } = req.query;


  if (!userID) {
    return res.status(400).send({ error: "User ID is required" });
  }
  try {
    const result = await sql
      `
            SELECT PURCHASES.PR_ID, NAME, SRC, AMOUNT, PURCHASES.quantity
            FROM PRODUCT, PURCHASES
            WHERE PRODUCT.PR_ID = PURCHASES.PR_ID
            AND P_ID = ${userID};
        `;
  
  
    res.status(200).send(result);

  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

routerProduct.get("/products/detail/exists", async (req, res) => {
  const { userID } = req.query;
  try {
    const result = await sql
      `SELECT PR_ID FROM PURCHASES WHERE P_ID = ${userID};`;
    res.json(result.rows);
  } catch (error) {
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
  try {
    const result = await sql
      `
            DELETE FROM PURCHASES
            WHERE p_id = ${userID}
            AND pr_id = ${PR_ID};
        `;
    const updatedCart = await sql
      `
            SELECT PURCHASES.PR_ID, NAME, SRC, AMOUNT, PURCHASES.quantity
            FROM PRODUCT, PURCHASES
            WHERE PRODUCT.PR_ID = PURCHASES.PR_ID
            AND p_id = ${userID};
        `;
      res.status(200).send(updatedCart);
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

  try {
    const result = await sql`
      SELECT 
        SUM(AMOUNT) AS total,
        SUM(PRICE_WITH_VAT) AS total_amount
      FROM PURCHASES
      WHERE P_ID = ${userID}
      GROUP BY P_ID;
    `;

    if (result.length === 0) {
      return res.status(404).send({ error: "No products found for this user" });
    }
  
    res.status(200).send(result);
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
    try {
      const result = await sql
        `
      UPDATE PURCHASES
      SET QUANTITY = ${quantity},
      AMOUNT = (SELECT PRICE FROM PRODUCT WHERE PR_ID = ${id}) * ${quantity}
      WHERE P_ID = ${userID}
      AND PR_ID = ${id};
      `;

      // Fetch the updated cart items
      const updatedCartItems = await sql
        `
      SELECT PURCHASES.PR_ID, NAME, SRC, AMOUNT, PURCHASES.quantity
      FROM PRODUCT, PURCHASES
      WHERE PRODUCT.PR_ID = PURCHASES.PR_ID
      AND P_ID = ${userID};
      `;

      res.status(200).send(updatedCartItems);
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).send({ error: "Internal server error" });
    }
  }
);

routerProduct.get("/products/detail/checkout/deliveryman", async (req, res) => {
  const { city } = req.query;
  // let connection;
  try {
    // connection = await getConnection();
    const result = await sql
      `
            SELECT D_ID,NAME FROM DELIVERY
            WHERE
            LOWER(CITY) = LOWER(${city});`;
    res.status(200).send(result);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

routerProduct.post("/products/detail/checkout/setAddress", async (req, res) => {
  const { P_ID, D_ID, DELIVERY_DATE, CITY, STREET, HOUSE_NO } = req.body;

  try {
  
    const result = await sql
      `INSERT INTO GET (P_ID, D_ID, DELIVERY_DATE, CITY, STREET, HOUSE_NO) 
        VALUES (${P_ID},${D_ID},TO_DATE(${DELIVERY_DATE},'YYYY-MM-DD'),${CITY},${STREET},${HOUSE_NO});`;
    res
      .status(200)
      .send({ message: "Delivery address updated successfully!", result });
  
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

routerProduct.post("/products/detail/checkout/setOrder", async (req, res) => {
  const {
    ORDER_ID,
    PR_ID,
    QUANTITY,
    P_ID,
    CITY,
    STREET,
    HOUSE_NO,
    DELIVERY_DATE,
  } = req.body;

  try {
    const result = await sql
      `INSERT INTO PAYS (B_ID, PR_ID, QUANTITY, P_ID, CITY, STREET, HOUSE_NO, DATE_OF_DELIVERY) 
          VALUES (${ORDER_ID}, ${PR_ID}, ${QUANTITY}, ${P_ID}, ${CITY}, ${STREET}, ${HOUSE_NO}, TO_DATE(${DELIVERY_DATE}, 'YYYY-MM-DD'))`;
  
  
    res.status(200).send({ message: "Order placed successfully!", result });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

routerProduct.post("/products/detail/checkout/setBill", async (req, res) => {
  const { ORDER_ID, AMOUNT, DELIVERY_DATE } = req.body;

  try {
    const result = await sql
      `INSERT INTO BILLS (B_ID,AMOUNT,DELIVERY_DATE) 
            VALUES (${ORDER_ID},${AMOUNT},TO_DATE(${DELIVERY_DATE}, 'YYYY-MM-DD'))`;
    res.status(200).send({ message: "Bill generated successfully!", result });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

routerProduct.post(
  "/products/detail/checkout/setAssignedTo",
  async (req, res) => {
    const { ORDER_ID, D_ID } = req.body;
  
    try {
      const result = await sql
        `INSERT INTO ASSIGNED_TO (B_ID,D_ID) 
            VALUES (${ORDER_ID},${D_ID})`;
      res
        .status(200)
        .send({ message: "Delivery assigned successfully!", result });
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).send({ error: "Internal server error" });
    }
  }
);

routerProduct.delete("/delivery/cart", async (req, res) => {
  const { userID } = req.query;
  try {
    const result = await sql
      `DELETE FROM PURCHASES WHERE P_ID = ${userID};`;
    res.status(200).send({ message: "Cart cleared successfully!", result });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

routerProduct.delete("/delivery/get", async (req, res) => {
  const { userID } = req.query;
  try {
    const result = await sql
      `DELETE FROM GET WHERE P_ID = ${userID};`;
    res.status(200).send({ message: "Cart cleared successfully!", result });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

routerProduct.get("/delivery/get/orders", async (req, res) => {
  const { userID } = req.query;
  try {
    const result = await sql
      `SELECT * FROM OrderDetails WHERE P_ID = ${userID};`;

    const orders = await sql
      `SELECT B_ID, SUM(QUANTITY) AS TOTAL_QUANTITY
           FROM PAYS
           WHERE P_ID = ${userID}
           GROUP BY B_ID;`;

  
    const mergedResults = result.map((order) => {
    
      
      const quantity = orders.find((q) => q.B_ID === order.B_ID);
      return {
        ...order,
        TOTAL_QUANTITY: quantity ? Number(quantity.total_quantity) : 0,
      };
    });
  
    res.status(200).send(mergedResults);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

routerProduct.get("/delivery/orderlist", async (req, res) => {
  const { orderID } = req.query;

  try {
    const result = await sql
      `SELECT P.PR_ID, P.NAME, P.SRC, P.PRICE, PAYS.QUANTITY
           FROM PRODUCT P, PAYS
           WHERE P.PR_ID = PAYS.PR_ID
           AND PAYS.B_ID = ${orderID};`;
    res.status(200).send(result);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});
routerProduct.get("/delivery/deliverydetails", async (req, res) => {
  const { orderID } = req.query;

  try {
    const result = await sql
      `SELECT DISTINCT D.NAME,D.CONTANCT_NO, B.DELIVERY_DATE, PAYS.CITY,PAYS.STREET,PAYS.HOUSE_NO
           FROM
           DELIVERY D,BILLS B,PAYS,ASSIGNED_TO AT
           WHERE
           PAYS.B_ID=B.B_ID
           AND
           B.B_ID=AT.B_ID
           AND
           AT.D_ID=D.D_ID
           AND PAYS.B_ID=${orderID};`;
    res.status(200).send(result);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = routerProduct;
