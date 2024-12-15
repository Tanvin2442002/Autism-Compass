const express = require("express");
const router = express.Router();

const sql = require('../DB/supabase');

router.post("/parent", async (req, res) => {
    try {
        console.log("Received data:", req.body);

        const { NAME, DOB, CONTACT_NO, EMAIL, CITY, STREET, POSTAL_CODE, PASSWORD } = req.body;

        // Insert into PARENT table
        const parentResult = await sql`
        INSERT INTO PARENT (P_ID, NAME, DOB, CONTACT_NO, EMAIL, CITY, STREET, POSTAL_CODE)
        VALUES (gen_random_uuid(), ${NAME}, ${DOB}, ${CONTACT_NO}, LOWER(${EMAIL}), ${CITY}, ${STREET}, ${POSTAL_CODE})
        RETURNING *;
        `;

        if (!parentResult) {
            throw new Error("Error inserting into PARENT table");
        }

        // Insert into LOG_IN table
        const loginResult = await sql`
        INSERT INTO LOG_IN (EMAIL, PASSWORD, TYPE)
        VALUES (LOWER(${EMAIL}), ${PASSWORD}, 'PARENT')
        RETURNING *;
        `;

        if (!loginResult) {
            throw new Error("Error inserting into LOG_IN table");
        }

        res.status(201).send({
            message: "Parent registered successfully!",
            parent: parentResult,
            login: loginResult,
        });

        console.log("Parent registration processed successfully");

    } catch (err) {
        console.error("Error during parent registration:", err);
        res.status(500).send({ message: "Error during parent registration", error: err.message });
    }
});

router.post("/child", async (req, res) => {
    try {
        console.log("Received data:", req.body);
        const { NAME, DOB, CONTACT_NO, EMAIL, P_EMAIL, CITY, STREET, POSTAL_CODE, PASSWORD, DISORDER_TYPE } = req.body;

        // Find parent by email
        const parentResult = await sql`
        SELECT P_ID FROM PARENT WHERE EMAIL = LOWER(${P_EMAIL});
        `;

        if (parentResult.length === 0) {
            res.status(404).send({ message: "Parent not found" });
            return;
        }

        const parentId = parentResult[0].p_id;

        // Insert into CHILD table
        const childResult = await sql`
        INSERT INTO CHILD (C_ID, NAME, DOB, CONTACT_NO, EMAIL, P_EMAIL, CITY, STREET, POSTAL_CODE)
        VALUES (gen_random_uuid(), ${NAME}, ${DOB}, ${CONTACT_NO}, LOWER(${EMAIL}), LOWER(${P_EMAIL}), ${CITY}, ${STREET}, ${POSTAL_CODE})
        RETURNING C_ID;
        `;

        const childId = childResult[0].c_id;

        // Insert into LOG_IN table
        await sql`
        INSERT INTO LOG_IN (EMAIL, PASSWORD, TYPE)
        VALUES (LOWER(${EMAIL}), ${PASSWORD}, 'CHILD');
        `;

        // Insert into PARENT_HAS_CHILD table
        await sql`
        INSERT INTO PARENT_HAS_CHILD (C_ID, P_ID)
        VALUES (${childId}, ${parentId});
        `;

        // Find disorder ID
        const disorderResult = await sql`
        SELECT D0_ID FROM DISORDER WHERE TYPE = ${DISORDER_TYPE};
        `;

        if (disorderResult.length === 0) {
            res.status(404).send({ message: "Disorder not found" });
            return;
        }

        const disorderId = disorderResult[0].d0_id;

        // Insert into CHILD_HAS_DISORDER table
        await sql`
        INSERT INTO CHILD_HAS_DISORDER (C_ID, D0_ID)
        VALUES (${childId}, ${disorderId});
        `;

        res.status(201).send({ message: "Child registered successfully!" });
        console.log("Child registration processed successfully");
    } catch (err) {
        console.error("Error during child registration:", err);
        res.status(500).send({ message: "Error during child registration", error: err.message });
    }
});

router.post("/doctor", async (req, res) => {
    try {
        console.log("Received data:", req.body);

        const { NAME, CONTACT_NO, EMAIL, DEGREE, FIELD_OF_SPEC, NAME_OF_HOSPITAL, VISIT_TIME, CITY, STREET, POSTAL_CODE, PASSWORD } = req.body;

        // Insert into HEALTH_PROFESSIONAL table
        const doctorResult = await sql`
        INSERT INTO HEALTH_PROFESSIONAL (H_ID, NAME, CONTACT_NO, EMAIL, DEGREE, FIELD_OF_SPEC, NAME_OF_HOSPITAL, VISIT_TIME, CITY, STREET, POSTAL_CODE)
        VALUES (gen_random_uuid(), ${NAME}, ${CONTACT_NO}, LOWER(${EMAIL}), ${DEGREE}, ${FIELD_OF_SPEC}, ${NAME_OF_HOSPITAL}, ${VISIT_TIME}, ${CITY}, ${STREET}, ${POSTAL_CODE})
        RETURNING *;
        `;

        if (!doctorResult) {
            throw new Error("Error inserting into HEALTH_PROFESSIONAL table");
        }

        // Insert into LOG_IN table
        await sql`
        INSERT INTO LOG_IN (EMAIL, PASSWORD, TYPE)
        VALUES (LOWER(${EMAIL}), ${PASSWORD}, 'HEALTH_PROFESSIONAL');
        `;

        res.status(201).send({ message: "Doctor registered successfully!", doctor: doctorResult });
        console.log("Doctor registration processed successfully");
    } catch (err) {
        console.error("Error during doctor registration:", err);
        res.status(500).send({ message: "Error during doctor registration", error: err.message });
    }
});

router.post("/teacher", async (req, res) => {
    try {
        console.log("Received data:", req.body);

        const { NAME, CONTACT_NO, EMAIL, INSTITUTION, PASSWORD } = req.body;

        // Insert into TEACHER table
        const teacherResult = await sql`
        INSERT INTO TEACHER (T_ID, NAME, CONTACT_NO, EMAIL, INSTITUTION)
        VALUES (gen_random_uuid(), ${NAME}, ${CONTACT_NO}, LOWER(${EMAIL}), ${INSTITUTION})
        RETURNING *;
        `;

        if (!teacherResult) {
            throw new Error("Error inserting into TEACHER table");
        }

        // Insert into LOG_IN table
        await sql`
        INSERT INTO LOG_IN (EMAIL, PASSWORD, TYPE)
        VALUES (LOWER(${EMAIL}), ${PASSWORD}, 'TEACHER');
        `;

        res.status(201).send({ message: "Teacher registered successfully!", teacher: teacherResult });
        console.log("Teacher registration processed successfully");
    } catch (err) {
        console.error("Error during teacher registration:", err);
        res.status(500).send({ message: "Error during teacher registration", error: err.message });
    }
});

router.post("/check-email", async (req, res) => {
    try {
        console.log("Received data:", req.body);

        const { EMAIL } = req.body;

        const emailResult = await sql`
        SELECT EMAIL FROM LOG_IN WHERE EMAIL = LOWER(${EMAIL});
        `;

        res.status(200).send({ valid: emailResult.length > 0 });
        console.log("Email check processed");
    } catch (err) {
        console.error("Error during email check:", err);
        res.status(500).send({ message: "Error during email check", error: err.message });
    }
});

router.post("/update-password", async (req, res) => {
    try {
        console.log("Received data:", req.body);

        const { EMAIL, PASSWORD } = req.body;

        await sql`
        UPDATE LOG_IN SET PASSWORD = ${PASSWORD} WHERE EMAIL = LOWER(${EMAIL});
        `;

        res.status(200).send({ message: "Password updated successfully!" });
        console.log("Password update processed");
    } catch (err) {
        console.error("Error during password update:", err);
        res.status(500).send({ message: "Error during password update", error: err.message });
    }
});

router.post("/user-info", async (req, res) => {
    try {
        console.log("Received data:", req.body);

        const { TYPE, ID } = req.body;
        const idColumn = `${TYPE[0]}_ID`;

        const userResult = await sql`
        SELECT * FROM ${sql(TYPE)} WHERE ${sql(idColumn)} = ${ID};
        `;

        if (userResult.length > 0) {
            res.status(200).send(userResult);
        } else {
            res.status(404).send({ message: "User not found" });
        }

        console.log("User info query processed");
    } catch (err) {
        console.error("Error during user info query:", err);
        res.status(500).send({ message: "Error during user info query", error: err.message });
    }
});

router.post("/update-user-info", async (req, res) => {
    try {
        console.log("Received data:", req.body);

        const { TYPE, ID, ...fields } = req.body;
        const idColumn = `${TYPE[0]}_ID`;

        const updates = Object.keys(fields).map((key) => `${sql(key)} = ${sql(fields[key])}`).join(", ");

        await sql`
        UPDATE ${sql(TYPE)}
        SET ${sql(updates)}
        WHERE ${sql(idColumn)} = ${ID};
        `;

        res.status(200).send({ message: "User info updated successfully!" });
        console.log("User info update processed");
    } catch (err) {
        console.error("Error during user info update:", err);
        res.status(500).send({ message: "Error during user info update", error: err.message });
    }
});

router.get("/parent-child-info", async (req, res) => {
    try {
        console.log("Received data:", req.query);

        const { TYPE, ID } = req.query;

        let result;
        if (TYPE === 'PARENT') {
            result = await sql`
            SELECT C.NAME AS NAME, C.EMAIL AS EMAIL, D.TYPE AS DISORDER, C.DOB AS DOB, C.CONTACT_NO AS CONTACT_NO
            FROM CHILD C
            JOIN PARENT_HAS_CHILD PHC ON PHC.C_ID = C.C_ID
            JOIN CHILD_HAS_DISORDER CHD ON CHD.C_ID = C.C_ID
            JOIN DISORDER D ON CHD.D0_ID = D.D0_ID
            WHERE PHC.P_ID = ${ID};
            `;
        } else {
            result = await sql`
            SELECT P.NAME AS NAME, P.EMAIL AS EMAIL, P.DOB AS DOB, P.CONTACT_NO AS CONTACT_NO
            FROM PARENT P
            JOIN PARENT_HAS_CHILD PHC ON PHC.P_ID = P.P_ID
            WHERE PHC.C_ID = ${ID};
            `;
        }

        if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: "User not found" });
        }

        console.log("Parent-child info query processed");
    } catch (err) {
        console.error("Error during parent-child info query:", err);
        res.status(500).send({ message: "Error during parent-child info query", error: err.message });
    }
});

module.exports = router;
