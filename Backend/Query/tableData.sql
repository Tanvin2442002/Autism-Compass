-- INSERT CHILD DATA

INSERT INTO CHILD (
    C_ID,
    NAME,
    DOB,
    AGE,
    CONTACT_NO,
    EMAIL,
    P_EMAIL,
    CITY,
    STREET,
    POSTAL_CODE
) VALUES (
    '43',
    'Alice',
    DATE '2013-02-06',
    11,
    144444444,
    'child@test.com',
    'aliceparent@test.com',
    'Dhaka',
    'Mirpur',
    2121
);

INSERT INTO CHILD (
    C_ID,
    NAME,
    DOB,
    AGE,
    CONTACT_NO,
    EMAIL,
    P_EMAIL,
    CITY,
    STREET,
    POSTAL_CODE
) VALUES (
    '39',
    'Bob',
    DATE '2013-02-06',
    11,
    123456789,
    'child1@test.com',
    'bobparent@test.com',
    'Dhaka',
    'Savar',
    2121
);

INSERT INTO CHILD (
    C_ID,
    NAME,
    DOB,
    AGE,
    CONTACT_NO,
    EMAIL,
    P_EMAIL,
    CITY,
    STREET,
    POSTAL_CODE
) VALUES (
    '21',
    'Jhon',
    DATE '2002-02-04',
    22,
    234567890,
    'jhon@test.com',
    'aliceparent@test.com',
    'Badda',
    'Badda North',
    7342
);

INSERT INTO CHILD (
    C_ID,
    NAME,
    DOB,
    AGE,
    CONTACT_NO,
    EMAIL,
    P_EMAIL,
    CITY,
    STREET,
    POSTAL_CODE
) VALUES (
    '38',
    'Zaima Ahmed',
    DATE '2002-02-21',
    22,
    1745678932,
    'zaima101@gmail.com',
    'aliceparent@test.com',
    'Badda',
    'Badda North',
    7342
);

COMMIT;

-- CHILD DATA END
-- INSERT PARENT DATA

INSERT INTO PARENT (
    P_ID,
    NAME,
    DOB,
    AGE,
    CONTACT_NO,
    EMAIL,
    CITY,
    STREET,
    POSTAL_CODE
) VALUES (
    '740',
    'Alice''s Parent',
    DATE '2000-01-31',
    24,
    1749632812,
    'aliceparent@test.com',
    'Dhaka',
    'Mirpur',
    1250
);

INSERT INTO PARENT (
    P_ID,
    NAME,
    DOB,
    AGE,
    CONTACT_NO,
    EMAIL,
    CITY,
    STREET,
    POSTAL_CODE
) VALUES (
    '869',
    'Bob''s Parent',
    DATE '2002-03-05',
    22,
    123456789,
    'bobparent@test.com',
    'Mirpur',
    'Dhaka',
    1216
);

COMMIT;

-- PARENT DATA END

-- INSERT CHILD HAS PARENT DATA

INSERT INTO PARENT_HAS_CHILD (
    P_ID,
    C_ID
) VALUES (
    '740',
    '21'
);

INSERT INTO PARENT_HAS_CHILD (
    P_ID,
    C_ID
) VALUES (
    '740',
    '38'
);

INSERT INTO PARENT_HAS_CHILD (
    P_ID,
    C_ID
) VALUES (
    '740',
    '43'
);

INSERT INTO PARENT_HAS_CHILD (
    P_ID,
    C_ID
) VALUES (
    '869',
    '39'
);

COMMIT;
-- CHILD HAS PARENT DATA END

-- INSERT CHILD HAS DISORDER DATA
INSERT INTO CHILD_HAS_DISORDER (
    C_ID,
    D0_ID
) VALUES (
    '21',
    'DO_01'
);

INSERT INTO CHILD_HAS_DISORDER (
    C_ID,
    D0_ID
) VALUES (
    '38',
    'DO_05'
);

INSERT INTO CHILD_HAS_DISORDER (
    C_ID,
    D0_ID
) VALUES (
    '39',
    'DO_03'
);

INSERT INTO CHILD_HAS_DISORDER (
    C_ID,
    D0_ID
) VALUES (
    '43',
    'DO_08'
);

COMMIT;
-- CHILD HAS DISORDER DATA END

-- INSERT INTO HEALTH_PROFESSIONAL DATA
--
INSERT INTO HEALTH_PROFESSIONAL (
    H_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    DEGREE,
    FIELD_OF_SPEC, -- Corrected column name
    NAME_OF_HOSPITAL,
    VISIT_TIME,
    ADDRESS
) VALUES (
    '112',
    'Yusuf Reza Hasnat',
    1234567792,
    'hasnat0006@test.com',
    'MD',
    'Cardiology',
    'Evercare Hospital',
    '09:00 AM - 01:00 PM',
    ADDR('Dhaka', '2/A, Gulshan-2', 1216)
);

INSERT INTO HEALTH_PROFESSIONAL (
    H_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    DEGREE,
    FIELD_OF_SPEC, -- Corrected column name
    NAME_OF_HOSPITAL,
    VISIT_TIME,
    ADDRESS
) VALUES (
    '114',
    'Zaima Ahmed',
    1234567785,
    'zaiimaaa@test.com',
    'MD',
    'Pediatrics',
    'United Hospital',
    '10:00 AM - 02:00 PM',
    ADDR('Dhaka', '11/A, Bashundhara R/A', 1202)
);

INSERT INTO HEALTH_PROFESSIONAL (
    H_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    DEGREE,
    FIELD_OF_SPEC, -- Corrected column name
    NAME_OF_HOSPITAL,
    VISIT_TIME,
    ADDRESS
) VALUES (
    '174',
    'Nabiha Parvez',
    1234567799,
    'n0biha@test.com',
    'FCPS',
    'Pediatrics',
    'Dhaka Medical College Hospital',
    '11:00 AM - 03:00 PM',
    ADDR('Dhaka', 'Shahabag', 1245)
);

INSERT INTO HEALTH_PROFESSIONAL (
    H_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    DEGREE,
    FIELD_OF_SPEC, -- Corrected column name
    NAME_OF_HOSPITAL,
    VISIT_TIME,
    ADDRESS
) VALUES (
    '162',
    'Tanvin Sarker',
    1234567756,
    'Tanvin32@test.com',
    'MD',
    'Psychology',
    'Shiraj Khaleda General Hospital',
    '12:00 PM - 04:00 PM',
    ADDR('Dhaka', 'Post Office, Dhaka Cantonment', 1206)
);

INSERT INTO HEALTH_PROFESSIONAL (
    H_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    DEGREE,
    FIELD_OF_SPEC, -- Corrected column name
    NAME_OF_HOSPITAL,
    VISIT_TIME,
    ADDRESS
) VALUES (
    '152',
    'Raisul Islam',
    1234567654,
    'raisul45@test.com',
    'MD',
    'Cardiology',
    'High-Tech Multicare Hospital',
    '08:00 AM - 12:00 PM',
    ADDR('Dhaka', 'Uttar Kafrul', 1206)
);

INSERT INTO HEALTH_PROFESSIONAL (
    H_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    DEGREE,
    FIELD_OF_SPEC, -- Corrected column name
    NAME_OF_HOSPITAL,
    VISIT_TIME,
    ADDRESS
) VALUES (
    '100',
    'Mohiuddin Ahmed',
    1234567797,
    'drMohiuddin76@test.com',
    'FCPS',
    'Medicine',
    'Comfort Hospital',
    '02:00 PM - 06:00 PM',
    ADDR('Dhaka', '2/A Farmgate', 1285)
);

INSERT INTO HEALTH_PROFESSIONAL (
    H_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    DEGREE,
    FIELD_OF_SPEC, -- Corrected column name
    NAME_OF_HOSPITAL,
    VISIT_TIME,
    ADDRESS
) VALUES (
    '101',
    'Ahmed Abdullah',
    1234567700,
    'drAhmed@test.com',
    'FCPS',
    'Cardiology',
    'Enam Medical College Hospital',
    '03:00 PM - 07:00 PM',
    ADDR('Savar', '2/A Kalshi', 1245)
);

COMMIT;

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    'child@test.com',
    '123',
    'CHILD'
);

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    'child1@test.com',
    '123',
    'CHILD'
);

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    'aliceparent@test.com',
    '123',
    'PARENT'
);

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    'bobparent@test.com',
    '123',
    'PARENT'
);

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    'zaiimaaa@test.com',
    '123',
    'HEALTH_PROFESSIONAL'
);

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    'n0biha@test.com',
    '123',
    'HEALTH_PROFESSIONAL'
);

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    'teacher@test.com',
    '123',
    'TEACHER'
);

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    'teacher1@test.com',
    '123',
    'TEACHER'
);

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    'Tanvin32@test.com',
    '123',
    'HEALTH_PROFESSIONAL'
);

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    'raisul45@test.com',
    '123',
    'HEALTH_PROFESSIONAL'
);

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    'drMohiuddin76@test.com',
    '123',
    'HEALTH_PROFESSIONAL'
);

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    'hasnat0006@test.com',
    '123',
    'HEALTH_PROFESSIONAL'
);

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    'drAhmed@test.com',
    '123',
    'HEALTH_PROFESSIONAL'
);

COMMIT;

-- HEALTH_PROFESSIONAL DATA END