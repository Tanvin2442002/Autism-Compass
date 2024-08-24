const express = require("express");
const { getConnection } = require("../DB/connection");
const router = express.Router();
//const dotenv = require("dotenv");

router.post("/child", async (req, res) => {
    const connection = await getConnection();
    console.log("Received data:", req.body);
    const resultReg = await connection.execute(
        `INSERT INTO CHILD (C_ID, NAME, DOB, CONTACT_NO, EMAIL, P_EMAIL, CITY, STREET, POSTAL_CODE)
            VALUES (:C_ID, :NAME, TO_DATE(:DOB, 'YYYY-MM-DD'), :CONTACT_NO, LOWER(:EMAIL), LOWER(:P_EMAIL), :CITY, :STREET, :POSTAL_CODE)`,
        {
            C_ID: req.body.C_ID,
            NAME: req.body.NAME,
            DOB: req.body.DOB,
            CONTACT_NO: req.body.CONTACT_NO,
            EMAIL: req.body.EMAIL,
            P_EMAIL: req.body.P_EMAIL,
            CITY: req.body.CITY,
            STREET: req.body.STREET,
            POSTAL_CODE: req.body.POSTAL_CODE,
        },
        { autoCommit: true }
    );
    const resultLogIn = await connection.execute(
        `INSERT INTO LOG_IN (EMAIL, PASSWORD, TYPE)
            VALUES (LOWER(:EMAIL), :PASSWORD, 'CHILD')`,
        {
            EMAIL: req.body.EMAIL,
            PASSWORD: req.body.PASSWORD,
        },
        { autoCommit: true }
    );

    const findParent = await connection.execute(
        `SELECT P_ID FROM PARENT WHERE EMAIL = LOWER(:EMAIL)`,
        {
            EMAIL: req.body.P_EMAIL,
        },
        { autoCommit: true }
    );
    console.log(findParent.rows[0].P_ID);
    const resultParent = await connection.execute(
        `INSERT INTO PARENT_HAS_CHILD (C_ID, P_ID)
            VALUES (:C_ID, :P_ID)`,
        {
            C_ID: req.body.C_ID,
            P_ID: findParent.rows[0].P_ID,
        },
        { autoCommit: true }
    );
    console.log(resultParent, "Parent added");
    // FIND D0_ID

    const resultDisability = await connection.execute(
        `SELECT D0_ID FROM DISORDER WHERE TYPE = :TYPE`,
        {
            TYPE: req.body.DISORDER_TYPE,
        },
        { autoCommit: true }
    );
    console.log(resultDisability.rows[0].D0_ID);
    const resultDisorder = await connection.execute(
        `INSERT INTO CHILD_HAS_DISORDER (C_ID, D0_ID)
            VALUES (:C_ID, :D0_ID)`,
        {
            C_ID: req.body.C_ID,
            D0_ID: resultDisability.rows[0].D0_ID,
        },
        { autoCommit: true }
    );
    res
        .status(201)
        .send({ message: "Child registered successfully!", resultReg });
    console.log("Request processed");
});

router.post("/parent", async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        console.log("Received data:", req.body);

        // Insert into PARENT table
        const resultReg = await connection.execute(
            `INSERT INTO PARENT (P_ID, NAME, DOB, CONTACT_NO, EMAIL, CITY, STREET, POSTAL_CODE)
             VALUES (:P_ID, :NAME, TO_DATE(:DOB, 'YYYY-MM-DD'), :CONTACT_NO, LOWER(:EMAIL), :CITY, :STREET, :POSTAL_CODE)`,
            {
                P_ID: req.body.P_ID,
                NAME: req.body.NAME,
                DOB: req.body.DOB,
                CONTACT_NO: req.body.CONTACT_NO,
                EMAIL: req.body.EMAIL,
                CITY: req.body.CITY,
                STREET: req.body.STREET,
                POSTAL_CODE: req.body.POSTAL_CODE,
            },
            { autoCommit: true }
        );

        // Insert into LOG_IN table
        const resultLog = await connection.execute(
            `INSERT INTO LOG_IN (EMAIL, PASSWORD, TYPE)
             VALUES (LOWER(:EMAIL), :PASSWORD, 'PARENT')`,
            {
                EMAIL: req.body.EMAIL,
                PASSWORD: req.body.PASSWORD,
            },
            { autoCommit: true }
        );

        res.status(201).send({ message: "Parent registered successfully!", resultReg });
        console.log("Request processed");

    } catch (err) {
        console.error("Error during parent registration:", err);
        res.status(500).send({ message: "Error during parent registration", error: err.message });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error closing connection:", err);
            }
        }
    }
});

router.post("/doctor", async (req, res) => {
    const connection = await getConnection();
    console.log("Received data:", req.body);
    const resultReg = await connection.execute(
        `INSERT INTO HEALTH_PROFESSIONAL (H_ID, NAME, CONTACT_NO, EMAIL, DEGREE, FIELD_OF_SPEC, NAME_OF_HOSPITAL, VISIT_TIME, ADDRESS) VALUES (:H_ID, :NAME, :CONTACT_NO, LOWER(:EMAIL), :DEGREE, :FIELD_OF_SPEC, :NAME_OF_HOSPITAL, :VISIT_TIME, ADDR(:CITY, :STREET, :POSTAL_CODE))`,
        {
            H_ID: req.body.H_ID,
            NAME: req.body.NAME,
            CONTACT_NO: req.body.CONTACT_NO,
            EMAIL: req.body.EMAIL,
            DEGREE: req.body.DEGREE,
            FIELD_OF_SPEC: req.body.FIELD_OF_SPEC,
            NAME_OF_HOSPITAL: req.body.NAME_OF_HOSPITAL,
            VISIT_TIME: req.body.VISIT_TIME,
            CITY: req.body.CITY,
            STREET: req.body.STREET,
            POSTAL_CODE: req.body.POST
        },
        { autoCommit: true }
    );
    const resultLog = await connection.execute(
        `INSERT INTO LOG_IN (EMAIL, PASSWORD, TYPE)
        VALUES (LOWER(:EMAIL), :PASSWORD, 'HEALTH_PROFESSIONAL')`,
        {
            EMAIL: req.body.EMAIL,
            PASSWORD: req.body.PASSWORD,
        },
        { autoCommit: true }
    );
    res
        .status(201)
        .send({ message: "Doctor registered successfully!", resultReg });
    console.log("Request processed");
});

router.post("/teacher", async (req, res) => {
    const connection = await getConnection();
    console.log("Received data:", req.body);
    const resultReg = await connection.execute(
        `INSERT INTO TEACHER (T_ID, NAME, CONTACT_NO, EMAIL,INSTITUTION)
                 VALUES (:T_ID, :NAME, :CONTACT_NO, LOWER(:EMAIL), :INSTITUTION)`,
        {
            T_ID: req.body.T_ID,
            NAME: req.body.NAME,
            CONTACT_NO: req.body.CONTACT_NO,
            EMAIL: req.body.EMAIL,
            INSTITUTION: req.body.INSTITUTION,
        },
        { autoCommit: true }
    );
    const resultLog = await connection.execute(
        `INSERT INTO LOG_IN (EMAIL, PASSWORD, TYPE)
                 VALUES (LOWER(:EMAIL), :PASSWORD, 'TEACHER')`,
        {
            EMAIL: req.body.EMAIL,
            PASSWORD: req.body.PASSWORD,
        },
        { autoCommit: true }
    );
    res
        .status(201)
        .send({ message: "Doctor registered successfully!", resultReg });
    console.log("Request processed");
});

router.post("/check-email", async (req, res) => {
    const connection = await getConnection();
    console.log("Received data:", req.body);
    const result = await connection.execute(
        `SELECT EMAIL FROM LOG_IN WHERE EMAIL = LOWER(:EMAIL)`,
        {
            EMAIL: req.body.EMAIL,
        },
        { autoCommit: true }
    );
    if (result.rows.length == 0) {
        res.status(200).send({ valid: false });
    } else {
        res.status(200).send({ valid: true });
    }
    console.log("Request processed");

});

router.post("/update-password", async (req, res) => {
    const connection = await getConnection();
    console.log("Received data:", req.body);
    const result = await connection.execute(
        `UPDATE LOG_IN SET PASSWORD = :PASSWORD WHERE EMAIL = LOWER(:EMAIL)`,
        {
            EMAIL: req.body.EMAIL,
            PASSWORD: req.body.PASSWORD,
        },
        { autoCommit: true }
    );
    res.status(200).send({ message: "Password updated successfully!" });
    console.log("Request processed");

});

router.post("/user-info", async (req, res) => {
    const connection = await getConnection();
    const { TYPE, ID } = req.body;
    const idColumn = `${TYPE[0]}_ID`;
    const query = `
            SELECT *
            FROM ${TYPE}
            WHERE ${idColumn} = :id`;
    const result = await connection.execute(query, { id: ID });
    if (result.rows.length > 0) {
        res.status(200).send(result.rows);
    } else {
        res.status(404).send({ message: "User not found" });
    }
    console.log(`Query result: ${JSON.stringify(result.rows)}`);
    console.log("Request processed");

});

router.post("/update-user-info", async (req, res) => {
    const connection = await getConnection();
    const type = req.body.TYPE;
    console.log("Received data:", req.body);
    if (type === "CHILD") {
        const { ID, NAME, CONTACT_NO, EMAIL, P_EMAIL, CITY, STREET, POSTAL_CODE } = req.body;
        const query = `
            UPDATE CHILD
            SET NAME = :NAME, CONTACT_NO = :CONTACT_NO, EMAIL = LOWER(:EMAIL), P_EMAIL = LOWER(:P_EMAIL), CITY = :CITY, STREET = :STREET, POSTAL_CODE = :POSTAL_CODE
            WHERE C_ID = :ID
        `;
        const result = await connection.execute(query, { ID, NAME, CONTACT_NO, EMAIL, P_EMAIL, CITY, STREET, POSTAL_CODE: Number(POSTAL_CODE) }, { autoCommit: true });
        res.status(200).send({ message: "User info updated successfully!" });
    }
    else if (type === "PARENT") {
        const { ID, NAME, DOB, CONTACT_NO, EMAIL, CITY, STREET, POSTAL_CODE } = req.body;
        const query = `
            UPDATE PARENT
            SET NAME = :NAME, CONTACT_NO = :CONTACT_NO, EMAIL = LOWER(:EMAIL), CITY = :CITY, STREET = :STREET, POSTAL_CODE = :POSTAL_CODE
            WHERE P_ID = :ID
        `;
        const result = await connection.execute(query, { ID, NAME, CONTACT_NO, EMAIL, CITY, STREET, POSTAL_CODE: Number(POSTAL_CODE) }, { autoCommit: true });
        res.status(200).send({ message: "User info updated successfully!" });
    }
    else if (type === "TEACHER") {
        const { ID, NAME, CONTACT_NO, EMAIL, INSTITUTION } = req.body;
        const query = `
            UPDATE TEACHER
            SET NAME = :NAME, CONTACT_NO = :CONTACT_NO, EMAIL = LOWER(:EMAIL), INSTITUTION = :INSTITUTION
            WHERE T_ID = :ID
        `;
        const result = await connection.execute(query, { ID, NAME, CONTACT_NO, EMAIL, INSTITUTION }, { autoCommit: true });
        res.status(200).send({ message: "User info updated successfully!" });
    }
    else if (type === "HEALTH_PROFESSIONAL") {
        const { ID, NAME, CONTACT_NO, EMAIL, DEGREE, FIELD_OF_SPEC } = req.body;
        const query = `
            UPDATE HEALTH_PROFESSIONAL
            SET NAME = :NAME, CONTACT_NO = :CONTACT_NO, EMAIL = LOWER(:EMAIL), DEGREE = :DEGREE, FIELD_OF_SPEC = :FIELD_OF_SPEC
            WHERE H_ID = :ID
        `;
        const result = await connection.execute(query, { ID, NAME, CONTACT_NO, EMAIL, DEGREE, FIELD_OF_SPEC }, { autoCommit: true });
        res.status(200).send({ message: "User info updated successfully!" });
    }
    console.log("Request processed");

});


router.get("/parent-child-info", async (req, res) => {
    const connection = await getConnection();
    const type = req.query.TYPE;
    const id = req.query.ID;
    console.log("Received data:", req.query);
    let result;
    if (type == 'PARENT') {
        result = await connection.execute(
            `SELECT C.NAME AS NAME, C.EMAIL AS EMAIL, C.DOB AS DOB, C.AGE AS AGE, C.CONTACT_NO AS CONTACT_NO
            FROM CHILD C, PARENT_HAS_CHILD PHC
            WHERE PHC.C_ID = C.C_ID
            AND PHC.P_ID = :ID`,
            { ID: id, }
        );
    }
    else{
        result = await connection.execute(
            `SELECT P.NAME, P.EMAIL, P.DOB, P.AGE, P.CONTACT_NO
            FROM PARENT P, CHILD C, PARENT_HAS_CHILD PHC
            WHERE PHC.C_ID = C.C_ID
            AND PHC.P_ID = P.P_ID
            AND C.C_ID = :ID`,
            { ID: id, }
        );
    }
    if (result.rows.length > 0) {
        res.status(200).send(result.rows);
    } else {
        res.status(404).send({ message: "User not found" });
    }

});

module.exports = router;