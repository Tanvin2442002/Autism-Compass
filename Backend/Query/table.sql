CREATE TABLE LOG_IN(
    EMAIL VARCHAR2(255) NOT NULL,
    PASSWORD VARCHAR2(255) NOT NULL,
    TYPE VARCHAR2(255) NOT NULL
);

-- LOG_IN TABLE END

-- CHILD TABLE START
CREATE TABLE CHILD(
    C_ID VARCHAR2(255) PRIMARY KEY,
    NAME VARCHAR2(255) NOT NULL,
    DOB DATE NOT NULL,
    AGE NUMBER,
    CONTACT_NO NUMBER NOT NULL,
    EMAIL VARCHAR2(255) NOT NULL,
    P_EMAIL VARCHAR2(255) NOT NULL,
    CITY VARCHAR2(255) NOT NULL,
    STREET VARCHAR2(255) NOT NULL,
    POSTAL_CODE NUMBER NOT NULL
);

-- CHILD TABLE END

-- PARENT TABLE START
CREATE TABLE PARENT(
    P_ID VARCHAR2(255) PRIMARY KEY,
    NAME VARCHAR2(255) NOT NULL,
    DOB DATE NOT NULL,
    AGE NUMBER,
    CONTACT_NO NUMBER NOT NULL,
    EMAIL VARCHAR2(255) NOT NULL,
    CITY VARCHAR2(255) NOT NULL,
    STREET VARCHAR2(255) NOT NULL,
    POSTAL_CODE NUMBER NOT NULL
);

-- PARENT TABLE END

-- TEACHER TABLE START
CREATE TABLE TEACHER(
    T_ID VARCHAR2(255) PRIMARY KEY,
    NAME VARCHAR2(255) NOT NULL,
    CONTACT_NO NUMBER NOT NULL,
    EMAIL VARCHAR2(255) NOT NULL,
    INSTITUTION VARCHAR2(255) NOT NULL
);

-- TEACHER TABLE END

-- HEALTH_PROFESSIONAL TABLE START
CREATE TABLE HEALTH_PROFESSIONAL(
    H_ID VARCHAR2(255) PRIMARY KEY,
    NAME VARCHAR2(255) NOT NULL,
    CONTACT_NO NUMBER NOT NULL,
    EMAIL VARCHAR2(255) NOT NULL,
    DEGREE VARCHAR2(255) NOT NULL,
    FEILD_0F_SPEC VARCHAR2(255) NOT NULL
);

-- HEALTH_PROFESSIONAL TABLE END

-- COURSES TABLE START
CREATE TABLE COURSES(
    COURSE_CODE VARCHAR2(255) PRIMARY KEY,
    COURSE_NAME VARCHAR2(255) NOT NULL
);

-- COURSES TABLE END

--THERAPY TABLE START
CREATE TABLE THERAPY(
    TH_ID VARCHAR2(255) PRIMARY KEY,
    THERAPY_TYPE VARCHAR2(255) NOT NULL,
    THERAPY_DESCRIPTION VARCHAR2(255) NOT NULL
);

-- THERAPY TABLE END

-- THERAPY ORG TABLE START
CREATE TABLE THERAPY_ORG(
    THO_ID VARCHAR2(255) PRIMARY KEY,
    NAME VARCHAR2(255) NOT NULL,
    CONTACT_NO NUMBER NOT NULL,
    EMAIL VARCHAR2(255) NOT NULL,
    CITY VARCHAR2(255) NOT NULL,
    STREET VARCHAR2(255) NOT NULL,
    POSTAL_CODE NUMBER NOT NULL
);

-- THERAPY ORG TABLE END

-- DISORDER TABLE START
CREATE TABLE DISORDER(
    D0_ID VARCHAR2(255) PRIMARY KEY,
    TYPE VARCHAR2(255) NOT NULL,
    DESCRIPTION VARCHAR2(255) NOT NULL
);

-- DISORDER TABLE END

-- DELIVERY TABLE START
CREATE TABLE DELIVERY(
    D_ID VARCHAR2(255) PRIMARY KEY,
    NAME VARCHAR2(255) NOT NULL,
    CITY VARCHAR2(255) NOT NULL,
    STREET VARCHAR2(255) NOT NULL,
    POSTAL_CODE NUMBER NOT NULL
);

-- DELIVERY TABLE END

-- BILLS TABLE START
CREATE TABLE BILLS(
    B_ID VARCHAR2(255) PRIMARY KEY,
    AMOUNT NUMBER NOT NULL
);

-- BILLS TABLE END

-- PRODUCT TABLE START
CREATE TABLE PRODUCT(
    PR_ID VARCHAR2(255) PRIMARY KEY,
    NAME VARCHAR2(255) NOT NULL,
    SRC VARCHAR2(255) NOT NULL,
    PRICE NUMBER NOT NULL,
    QUANTITY NUMBER NOT NULL,
    DESCRIPTION VARCHAR2(255) NOT NULL
);

-- PRODUCT TABLE END


--          CREATE FORIEGN KEY TABLES                    --


-- ASSIGNED TABLE START
CREATE TABLE ASSIGNED(
    COURSE_CODE VARCHAR2(255) NOT NULL,
    T_ID VARCHAR2(255) NOT NULL,
    PRIMARY KEY(COURSE_CODE, T_ID),
    FOREIGN KEY(COURSE_CODE) REFERENCES COURSES(COURSE_CODE),
    FOREIGN KEY(T_ID) REFERENCES TEACHER(T_ID)
);

-- ASSIGNED TABLE END

-- THERAPY_HAS_THEAPYORG TABLE START
CREATE TABLE THERAPY_HAS_THEAPYORG(
    TH_ID VARCHAR2(255) NOT NULL,
    THO_ID VARCHAR2(255) NOT NULL,
    PRIMARY KEY(TH_ID, THO_ID),
    FOREIGN KEY(TH_ID) REFERENCES THERAPY(TH_ID),
    FOREIGN KEY(THO_ID) REFERENCES THERAPY_ORG(THO_ID)
);

-- THERAPY_HAS_THEAPYORG TABLE END

-- ENROLLS TABLE START
CREATE TABLE ENROLLS(
    C_ID VARCHAR2(255) NOT NULL,
    COURSE_CODE VARCHAR2(255) NOT NULL,
    PRIMARY KEY(C_ID, COURSE_CODE),
    FOREIGN KEY(C_ID) REFERENCES CHILD(C_ID),
    FOREIGN KEY(COURSE_CODE) REFERENCES COURSES(COURSE_CODE)
);

-- ENROLLS TABLE END

-- BOOKS TABLE START
CREATE TABLE BOOKS(
    C_ID VARCHAR2(255) NOT NULL,
    TH_ID VARCHAR2(255) NOT NULL,
    P_ID VARCHAR2(255) NOT NULL,
    PRIMARY KEY(C_ID, TH_ID, P_ID),
    FOREIGN KEY(C_ID) REFERENCES CHILD(C_ID),
    FOREIGN KEY(TH_ID) REFERENCES THERAPY(TH_ID),
    FOREIGN KEY(P_ID) REFERENCES PARENT(P_ID)
);

-- BOOKS TABLE END

-- SUGGESTS TABLE START
CREATE TABLE SUGGESTS(
    C_ID VARCHAR2(255) NOT NULL,
    H_ID VARCHAR2(255) NOT NULL,
    P_ID VARCHAR2(255) NOT NULL,
    PRIMARY KEY(C_ID, H_ID, P_ID),
    FOREIGN KEY(C_ID) REFERENCES CHILD(C_ID),
    FOREIGN KEY(H_ID) REFERENCES HEALTH_PROFESSIONAL(H_ID),
    FOREIGN KEY(P_ID) REFERENCES PARENT(P_ID)
);

-- SUGGESTS TABLE END

-- CHILD_HAS_DISORDER TABLE START
CREATE TABLE CHILD_HAS_DISORDER(
    C_ID VARCHAR2(255) NOT NULL,
    D0_ID VARCHAR2(255) NOT NULL,
    PRIMARY KEY(C_ID, D0_ID),
    FOREIGN KEY(C_ID) REFERENCES CHILD(C_ID),
    FOREIGN KEY(D0_ID) REFERENCES DISORDER(D0_ID)
);

-- CHILD_HAS_DISORDER TABLE END

-- PARENT_HAS_CHILD TABLE START
CREATE TABLE PARENT_HAS_CHILD(
    P_ID VARCHAR2(255) NOT NULL,
    C_ID VARCHAR2(255) NOT NULL,
    PRIMARY KEY(P_ID, C_ID),
    FOREIGN KEY(P_ID) REFERENCES PARENT(P_ID),
    FOREIGN KEY(C_ID) REFERENCES CHILD(C_ID)
);

-- PARENT_HAS_CHILD TABLE END

-- CONSULTS TABLE START
CREATE TABLE CONSULTS(
    P_ID VARCHAR2(255) NOT NULL,
    H_ID VARCHAR2(255) NOT NULL,
    C_ID VARCHAR2(255) NOT NULL,
    PRIMARY KEY(P_ID, H_ID, C_ID),
    FOREIGN KEY(P_ID) REFERENCES PARENT(P_ID),
    FOREIGN KEY(H_ID) REFERENCES HEALTH_PROFESSIONAL(H_ID),
    FOREIGN KEY(C_ID) REFERENCES CHILD(C_ID)
);

-- CONSULTS TABLE END

-- GET TABLE START
CREATE TABLE GET(
    P_ID VARCHAR2(255) NOT NULL,
    D_ID VARCHAR2(255) NOT NULL,
    DELIVERY_DATE DATE NOT NULL,
    PRIMARY KEY(P_ID, D_ID),
    FOREIGN KEY(P_ID) REFERENCES PARENT(P_ID),
    FOREIGN KEY(D_ID) REFERENCES DELIVERY(D_ID)
);

-- GET TABLE END

-- PAYS TABLE START
CREATE TABLE PAYS(
    P_ID VARCHAR2(255) NOT NULL,
    B_ID VARCHAR2(255) NOT NULL,
    PRIMARY KEY(P_ID, B_ID),
    FOREIGN KEY(P_ID) REFERENCES PARENT(P_ID),
    FOREIGN KEY(B_ID) REFERENCES BILLS(B_ID)
);

-- PAYS TABLE END

-- PURCHASES TABLE START
CREATE TABLE PURCHASES(
    P_ID VARCHAR2(255) NOT NULL,
    PR_ID VARCHAR2(255) NOT NULL,
    PURCHASE_DATE DATE NOT NULL,
    PRIMARY KEY(P_ID, PR_ID),
    FOREIGN KEY(P_ID) REFERENCES PARENT(P_ID),
    FOREIGN KEY(PR_ID) REFERENCES PRODUCT(PR_ID)
);

-- PURCHASES TABLE END

-- ASSIGNED_TO TABLE START
CREATE TABLE ASSIGNED_TO(
    B_ID VARCHAR2(255) NOT NULL,
    D_ID VARCHAR2(255) NOT NULL,
    PRIMARY KEY(B_ID, D_ID),
    FOREIGN KEY(B_ID) REFERENCES BILLS(B_ID),
    FOREIGN KEY(D_ID) REFERENCES DELIVERY(D_ID)
);

-- ASSIGNED_TO TABLE END

-- BILLS_FOR_PRODUCT TABLE START
CREATE TABLE BILLS_FOR_PRODUCT(
    B_ID VARCHAR2(255) NOT NULL,
    PR_ID VARCHAR2(255) NOT NULL,
    PRIMARY KEY(B_ID, PR_ID),
    FOREIGN KEY(B_ID) REFERENCES BILLS(B_ID),
    FOREIGN KEY(PR_ID) REFERENCES PRODUCT(PR_ID)
);
-- BILLS_FOR_PRODUCT TABLE END

-- TABLE CRATION END

-- CONVERT DATE TO AGE IN CHILD TABLE --

CREATE OR REPLACE TRIGGER TRG_UPDATE_AGE BEFORE
    INSERT OR UPDATE ON CHILD FOR EACH ROW
BEGIN
    :NEW.AGE := FLOOR(MONTHS_BETWEEN(SYSDATE, :NEW.DOB) / 12);
END;
/

-- CONVERT DATE TO AGE IN PARENT TABLE --

CREATE OR REPLACE TRIGGER P_TRG_UPDATE_AGE BEFORE
    INSERT OR UPDATE ON PARENT FOR EACH ROW
BEGIN
    :NEW.AGE := FLOOR(MONTHS_BETWEEN(SYSDATE, :NEW.DOB) / 12);
END;
/

-- INSERT DATA INTO DISORDER TABLE START --

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

-- INSERT DATA INTO DISORDER TABLE END --

--INSERT DATA INTO PRODUCT TABLE START --

INSERT INTO PRODUCT (PR_ID,NAME, SRC,PRICE,QUANTITY,DESCRIPTION )
VALUES ('P_01','Nike Shoe', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 2000, 10, 'Nike Shoes for Kid> one of the best one out there!');

INSERT INTO PRODUCT (PR_ID,NAME, SRC,PRICE,QUANTITY,DESCRIPTION )
VALUES ('P_02','Sensory Massage Puzzle Mat – Happy Path', 'https://www.autism-products.com/wp-content/uploads/set-happy-path-ortoto.lv_-1-1.jpg', 200, 10, 'Set of 8 Large Tiles!  Each Tile is about 10″ x 10″ and 1″ Thick');

INSERT INTO PRODUCT (PR_ID,NAME, SRC,PRICE,QUANTITY,DESCRIPTION )
VALUES ('P_03','Trend Enterprises Easy Words Puzzle Set', 'https://www.autism-products.com/wp-content/uploads/Easy-Words-Puzzle-Set.jpg', 20, 10, 'Build early language, reading, and vocabulary skills with two-piece learning puzzles featuring 40 beginner words');

INSERT INTO PRODUCT (PR_ID,NAME, SRC,PRICE,QUANTITY,DESCRIPTION )
VALUES ('P_04','Bouncy Board', 'https://www.autism-products.com/wp-content/uploads/Bouncy-Board-by-Bouncyband-with-Girl-scaled-e1715409298856.webp', 100, 10, 'Relieves anxiety, and hyperactivity, and stress.');

INSERT INTO PRODUCT (PR_ID,NAME, SRC,PRICE,QUANTITY,DESCRIPTION )
VALUES ('P_05','Magna-Tiles Clear Colors 100-Piece Set – Classroom Pack', 'https://www.autism-products.com/wp-content/uploads/Magna-Tiles-Clear-Colors-100-Piece-Set.jpg', 150, 10, '100 Translucent, Colorful Shapes');

INSERT INTO PRODUCT (PR_ID,NAME, SRC,PRICE,QUANTITY,DESCRIPTION )
VALUES ('P_06','Sensory Ball Pack', 'https://www.autism-products.com/wp-content/uploads/Sensory-Ball-Pack.jpg', 110, 10, '7 Easier to Catch Balls!');

commit;
--INSERT DATA INTO PRODUCT TABLE END --

-- INSERT DATA INTO THERAPY TABLE START --

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

-- INSERT DATA INTO THERAPY TABLE END --