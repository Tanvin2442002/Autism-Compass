-- INSERTINT
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
    'parent@test.com',
    '123',
    'PARENT'
);

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    'childparent@test.com',
    '123',
    'PARENT'
);

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    'doctor@test.com',
    '123',
    'HEALTH_PROFESSIONAL'
);

INSERT INTO LOG_IN (
    EMAIL,
    PASSWORD,
    TYPE
) VALUES (
    'doctor1@test.com',
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

COMMIT;

--
--
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
    159752351,
    'child@test.com',
    'childparent@gmail.com',
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
    'childparent1@gmail.com',
    'Dhaka',
    'Savar',
    2121
);

COMMIT;

--
--
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
    'Parent Alice',
    DATE '2000-01-31',
    24,
    159753456852,
    'parent@test.com',
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
    'Parent Bob',
    DATE '2002-03-05',
    22,
    123456789,
    'childparent@test.com',
    'Mirpur',
    'Dhaka',
    1216
);

COMMIT;

--
--
INSERT INTO HEALTH_PROFESSIONAL (
    H_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    DEGREE,
    FIELD_OF_SPEC,  -- Corrected column name
    NAME_OF_HOSPITAL,
    VISIT_TIME,
    ADDRESS
) VALUES (
    '112',
    'Yusuf Reza',
    1234567792,
    'HasnatPro@test.com',
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
    FIELD_OF_SPEC,  -- Corrected column name
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
    FIELD_OF_SPEC,  -- Corrected column name
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
    FIELD_OF_SPEC,  -- Corrected column name
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
    FIELD_OF_SPEC,  -- Corrected column name
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
    FIELD_OF_SPEC,  -- Corrected column name
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
    FIELD_OF_SPEC,  -- Corrected column name
    NAME_OF_HOSPITAL,
    VISIT_TIME,
    ADDRESS
) VALUES (
    '101',
    'Ahmed',
    1234567700,
    'drAhmed@test.com',
    'FCPS',
    'Cardiology',
    'Enam Medical College Hospital',
    '03:00 PM - 07:00 PM',
    ADDR('Savar', '2/A Kalshi', 1245)
);

COMMIT;



--
--
INSERT INTO TEACHER (
    T_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    INSTITUTION
) VALUES (
    '194',
    'Tanvin Sarkar Pallob',
    123456789,
    'teacher@test.com',
    'MIST'
);

INSERT INTO TEACHER (
    T_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    INSTITUTION
) VALUES (
    '350',
    'Yusuf Reza Hasnat',
    1790879452,
    'teacher1@test.com',
    'MIST'
);

COMMIT;

--
--
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

-- HEALTH_PROFESSIONAL
--INSERT DATA INTO DISORDER TABLE START --
INSERT INTO DISORDER (
    D0_ID,
    TYPE,
    DESCRIPTION
) VALUES (
    'DO_01',
    'Social Communication Disorder (SCD)',
    'Difficulties with the social use of verbal and nonverbal communication, including challenges with social interactions, understanding social rules, and making inferences from context.'
);

INSERT INTO DISORDER (
    D0_ID,
    TYPE,
    DESCRIPTION
) VALUES (
    'DO_02',
    'Expressive Language Disorder (ELD)',
    'Characterized by difficulties with expressing oneself using spoken language, including trouble finding words, limited vocabulary, and constructing coherent sentences.'
);

INSERT INTO DISORDER (
    D0_ID,
    TYPE,
    DESCRIPTION
) VALUES (
    'DO_03',
    'Pragmatic Language Impairment Disorder (PLID)',
    'Trouble understanding and using language in social contexts, such as taking turns in conversation, staying on topic, and interpreting nonliteral language.'
);

INSERT INTO DISORDER (
    D0_ID,
    TYPE,
    DESCRIPTION
) VALUES (
    'DO_04',
    'Intellectual Disability (ID)',
    'Involves significant limitations in intellectual functioning and adaptive behavior, affecting learning, reasoning, problem-solving, and performing everyday activities.'
);

INSERT INTO DISORDER (
    D0_ID,
    TYPE,
    DESCRIPTION
) VALUES (
    'DO_05',
    'Attention-Deficit/Hyperactivity Disorder (ADHD)',
    'Characterized by persistent patterns of inattention, hyperactivity, and impulsivity, impacting academic, occupational, and social functioning.'
);

INSERT INTO DISORDER (
    D0_ID,
    TYPE,
    DESCRIPTION
) VALUES (
    'DO_06',
    'Sensory Processing Disorder (SPD)',
    'Occurs when the brain has trouble receiving and responding to sensory information, leading to over- or under-responsiveness to stimuli like sounds, lights, and textures.'
);

INSERT INTO DISORDER (
    D0_ID,
    TYPE,
    DESCRIPTION
) VALUES (
    'DO_07',
    'Developmental Coordination Disorder (DCD)',
    'Involves difficulty with motor coordination and planning movements, affecting fine and gross motor skills, daily activities, academic performance, and self-esteem.'
);

INSERT INTO DISORDER (
    D0_ID,
    TYPE,
    DESCRIPTION
) VALUES (
    'DO_08',
    'Generalized Anxiety Disorder (GAD)',
    'Characterized by excessive, uncontrollable worry about various aspects of daily life, with symptoms such as restlessness, fatigue, muscle tension, and sleep disturbances.'
);

INSERT INTO DISORDER (
    D0_ID,
    TYPE,
    DESCRIPTION
) VALUES (
    'DO_09',
    'Specific Learning Disorder (SLD)',
    'Affects the ability to learn and use academic skills, such as reading (dyslexia), writing (dysgraphia), or mathematics (dyscalculia), impacting academic achievement.'
);

INSERT INTO DISORDER (
    D0_ID,
    TYPE,
    DESCRIPTION
) VALUES (
    'DO_10',
    'Nonverbal Learning Disability (NVLD)',
    'Characterized by deficits in nonverbal skills like visual-spatial processing, motor coordination, and social skills, with strengths in verbal tasks but difficulties in math and social cues.'
);

COMMIT;

--
--INSERT DATA INTO DISORDER TABLE END --
--INSERT DATA INTO PRODUCT TABLE START --
INSERT INTO PRODUCT (
    PR_ID,
    NAME,
    SRC,
    PRICE,
    QUANTITY,
    DESCRIPTION
) VALUES (
    'P_01',
    'Nike Shoe',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    2000,
    10,
    'Nike Shoes for Kid> one of the best one out there!'
);

INSERT INTO PRODUCT (
    PR_ID,
    NAME,
    SRC,
    PRICE,
    QUANTITY,
    DESCRIPTION
) VALUES (
    'P_02',
    'Sensory Massage Puzzle Mat – Happy Path',
    'https://www.autism-products.com/wp-content/uploads/set-happy-path-ortoto.lv_-1-1.jpg',
    200,
    10,
    'Set of 8 Large Tiles!  Each Tile is about 10″ x 10″ and 1″ Thick'
);

INSERT INTO PRODUCT (
    PR_ID,
    NAME,
    SRC,
    PRICE,
    QUANTITY,
    DESCRIPTION
) VALUES (
    'P_03',
    'Trend Enterprises Easy Words Puzzle Set',
    'https://www.autism-products.com/wp-content/uploads/Easy-Words-Puzzle-Set.jpg',
    20,
    10,
    'Build early language, reading, and vocabulary skills with two-piece learning puzzles featuring 40 beginner words'
);

INSERT INTO PRODUCT (
    PR_ID,
    NAME,
    SRC,
    PRICE,
    QUANTITY,
    DESCRIPTION
) VALUES (
    'P_04',
    'Bouncy Board',
    'https://www.autism-products.com/wp-content/uploads/Bouncy-Board-by-Bouncyband-with-Girl-scaled-e1715409298856.webp',
    100,
    10,
    'Relieves anxiety, and hyperactivity, and stress.'
);

INSERT INTO PRODUCT (
    PR_ID,
    NAME,
    SRC,
    PRICE,
    QUANTITY,
    DESCRIPTION
) VALUES (
    'P_05',
    'Magna-Tiles Clear Colors 100-Piece Set – Classroom Pack',
    'https://www.autism-products.com/wp-content/uploads/Magna-Tiles-Clear-Colors-100-Piece-Set.jpg',
    150,
    10,
    '100 Translucent, Colorful Shapes'
);

INSERT INTO PRODUCT (
    PR_ID,
    NAME,
    SRC,
    PRICE,
    QUANTITY,
    DESCRIPTION
) VALUES (
    'P_06',
    'Sensory Ball Pack',
    'https://www.autism-products.com/wp-content/uploads/Sensory-Ball-Pack.jpg',
    110,
    10,
    '7 Easier to Catch Balls!'
);

COMMIT;

--INSERT DATA INTO PRODUCT TABLE END --
--
--INSERT DATA INTO THERAPY TABLE START --
INSERT INTO THERAPY (
    TH_ID,
    THERAPY_TYPE,
    THERAPY_DESCRIPTION
) VALUES (
    'TH_01',
    'Applied Behavior Analysis (ABA)',
    'A therapy based on the science of learning and behavior. It helps improve social, communication, and learning skills through positive reinforcement and data-driven techniques.'
);

INSERT INTO THERAPY (
    TH_ID,
    THERAPY_TYPE,
    THERAPY_DESCRIPTION
) VALUES (
    'TH_02',
    'Social Skills Training (SST)',
    'A form of behavioral therapy used to help individuals improve their social skills. It includes learning how to interact appropriately with others, understand social cues, and develop friendships.'
);

INSERT INTO THERAPY (
    TH_ID,
    THERAPY_TYPE,
    THERAPY_DESCRIPTION
) VALUES (
    'TH_03',
    'Speech Therapy (ST)',
    'A therapy aimed at improving speech and communication skills. It helps individuals with speech disorders, language development, articulation, fluency, and voice disorders.'
);

INSERT INTO THERAPY (
    TH_ID,
    THERAPY_TYPE,
    THERAPY_DESCRIPTION
) VALUES (
    'TH_04',
    'Visual Supports Therapy (VST)',
    'A therapy that uses visual aids to improve communication and learning. It helps individuals understand and process information better through visual cues like pictures, symbols, and written words.'
);

INSERT INTO THERAPY (
    TH_ID,
    THERAPY_TYPE,
    THERAPY_DESCRIPTION
) VALUES (
    'TH_05',
    'Developmental Therapy (DT)',
    'A therapy focused on promoting the overall development of children. It addresses cognitive, social, emotional, and physical development through play-based activities and personalized interventions.'
);

INSERT INTO THERAPY (
    TH_ID,
    THERAPY_TYPE,
    THERAPY_DESCRIPTION
) VALUES (
    'TH_06',
    'Sensory Integration Therapy (SIT)',
    'A therapy designed to help individuals with sensory processing issues. It involves activities that challenge and stimulate the senses, aiming to improve the brains ability to process and respond to sensory information.'
);

INSERT INTO THERAPY (
    TH_ID,
    THERAPY_TYPE,
    THERAPY_DESCRIPTION
) VALUES (
    'TH_07',
    'Occupational Therapy (OT)',
    'A therapy that helps individuals achieve independence in all facets of their lives. It focuses on improving fine motor skills, sensory integration, and daily living activities.'
);

INSERT INTO THERAPY (
    TH_ID,
    THERAPY_TYPE,
    THERAPY_DESCRIPTION
) VALUES (
    'TH_08',
    'Cognitive Behavioral Therapy (CBT)',
    'A type of psychotherapy that helps individuals identify and change negative thought patterns and behaviors. Its commonly used to treat anxiety, depression, and other mental health disorders.'
);

INSERT INTO THERAPY (
    TH_ID,
    THERAPY_TYPE,
    THERAPY_DESCRIPTION
) VALUES (
    'TH_09',
    'Play Therapy (PT)',
    'A form of therapy primarily used for children. It uses play to help children express their feelings, develop problem-solving skills, and improve their emotional and social abilities.'
);

INSERT INTO THERAPY (
    TH_ID,
    THERAPY_TYPE,
    THERAPY_DESCRIPTION
) VALUES (
    'TH_10',
    'Music Therapy (MT)',
    'A clinical use of music to achieve individualized goals such as reducing stress, improving mood, and enhancing cognitive functioning. It involves creating, singing, moving to, and/or listening to music.'
);

INSERT INTO THERAPY (
    TH_ID,
    THERAPY_TYPE,
    THERAPY_DESCRIPTION
) VALUES (
    'TH_11',
    'Art Therapy (AT)',
    'A therapeutic technique that uses art-making to improve mental, emotional, and physical well-being. It helps individuals express feelings that may be difficult to articulate with words.'
);

INSERT INTO THERAPY (
    TH_ID,
    THERAPY_TYPE,
    THERAPY_DESCRIPTION
) VALUES (
    'TH_12',
    'Physical Therapy (PT)',
    'A therapy that helps individuals regain movement and manage pain through exercises, manual therapy, and other techniques. It is often used for rehabilitation after injury or surgery.'
);

INSERT INTO THERAPY (
    TH_ID,
    THERAPY_TYPE,
    THERAPY_DESCRIPTION
) VALUES (
    'TH_13',
    'Dialectical Behavior Therapy (DBT)',
    'A form of cognitive-behavioral therapy that focuses on teaching skills to manage emotions, cope with stress, and improve relationships. It is especially effective for borderline personality disorder.'
);

INSERT INTO THERAPY (
    TH_ID,
    THERAPY_TYPE,
    THERAPY_DESCRIPTION
) VALUES (
    'TH_14',
    'Family Therapy (FT)',
    'A type of psychological counseling that helps family members improve communication and resolve conflicts. It aims to create a healthier family dynamic.'
);

INSERT INTO THERAPY (
    TH_ID,
    THERAPY_TYPE,
    THERAPY_DESCRIPTION
) VALUES (
    'TH_15',
    'Group Therapy (GT)',
    'A form of therapy where a small group of people meet regularly to discuss and explore their problems with each other and the therapist. It provides support and feedback from peers.'
);

INSERT INTO THERAPY (
    TH_ID,
    THERAPY_TYPE,
    THERAPY_DESCRIPTION
) VALUES (
    'TH_16',
    'Animal-Assisted Therapy (AAT)',
    'A therapeutic intervention that incorporates animals, such as dogs or horses, into the treatment plan. It aims to improve social, emotional, and cognitive functioning.'
);

COMMIT;

--
--INSERT DATA INTO THERAPY TABLE END --