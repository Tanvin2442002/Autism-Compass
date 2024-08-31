-- INSERT DATA INTO THERAPY

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

-- INSERT DATA IN THERAPY TABLE END

COMMIT;

-- INSERT DATA IN THERAPY_ORG START
INSERT INTO THERAPY_ORG (
    THO_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    CITY,
    STREET,
    POSTAL_CODE
) VALUES (
    'THO_01',
    'Autistic Childrens Welfare Foundation, Bangladesh',
    '01914403331',
    'info@autistic-welfare-foundation.org',
    'Dhaka',
    'House #74, Line #3, Block E, Kalshi, Mirpur-12',
    '1216'
);

INSERT INTO THERAPY_ORG (
    THO_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    CITY,
    STREET,
    POSTAL_CODE
) VALUES (
    'THO_02',
    'Society for the Welfare of Autistic Children (SWAC)',
    '01711632861',
    'info@autism-swac.org',
    'Dhaka',
    '70/KA, Pisciculture, Shyamoli',
    '1207'
);

INSERT INTO THERAPY_ORG (
    THO_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    CITY,
    STREET,
    POSTAL_CODE
) VALUES (
    'THO_03',
    'Bangladesh ABA Centre for Autism',
    '01924987727',
    'info@bangladesh-aba-centre.org',
    'Dhaka',
    'House #76, Road #17, Sector #11, Uttara',
    '1230'
);

INSERT INTO THERAPY_ORG (
    THO_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    CITY,
    STREET,
    POSTAL_CODE
) VALUES (
    'THO_04',
    'Autism Welfare Foundation',
    '01819447233',
    'rownak_awf@yahoo.com',
    'Dhaka',
    'House #38/40, Road #4, "Kha" Block, Pisiculture Housing Society, Mohammadpur',
    '1207'
);

INSERT INTO THERAPY_ORG (
    THO_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    CITY,
    STREET,
    POSTAL_CODE
) VALUES (
    'THO_05',
    'Moonflower Autism Foundation',
    '01841632861',
    'info@moonflower-autism.org',
    'Dhaka',
    'House-20/28, Block-B, Babar Road, Mohammadpur',
    '1207'
);

INSERT INTO THERAPY_ORG (
    THO_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    CITY,
    STREET,
    POSTAL_CODE
) VALUES (
    'THO_06',
    'Blessing Child Special School (BCSS)',
    '01715151867',
    'info@blessing-child-special-school.org',
    'Dhaka',
    'House # G-3, Road # 4, Block # G, Jahurul Islam City, Aftabnagar, Badda',
    '1207'
);

INSERT INTO THERAPY_ORG (
    THO_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    CITY,
    STREET,
    POSTAL_CODE
) VALUES (
    'THO_07',
    'Blue Bird Special School',
    '01718755703',
    'info@blue-bird.org',
    'Dhaka',
    'House #4, Road #9/A, Block #J, Baridhara',
    '1212'
);

INSERT INTO THERAPY_ORG (
    THO_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    CITY,
    STREET,
    POSTAL_CODE
) VALUES (
    'THO_08',
    'Bongo Bondhu Community Clinic-Autism Center',
    '01942807251',
    'info@bongo-bondho-community.org',
    'Dhaka',
    '283, Block-Kha, Korail, 1 No. Uttar Unit, Ward No. 19, Adarsh Nagar, Banani',
    '1213'
);

INSERT INTO THERAPY_ORG (
    THO_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    CITY,
    STREET,
    POSTAL_CODE
) VALUES (
    'THO_09',
    'Bogra Autism Care Center (BACC)',
    '01712037793',
    'info@bogora-autism-care-center.org',
    'Bogra',
    'BACC, Jaleswaritola',
    '5800'
);

INSERT INTO THERAPY_ORG (
    THO_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    CITY,
    STREET,
    POSTAL_CODE
) VALUES (
    'THO_010',
    'Center for Disability and Development (CDD)',
    '01713021695',
    'cdd@cdd.org.bd',
    'Savar',
    'A18/6, Genda',
    '1340'
);

INSERT INTO THERAPY_ORG (
    THO_ID,
    NAME,
    CONTACT_NO,
    EMAIL,
    CITY,
    STREET,
    POSTAL_CODE
) VALUES (
    'THO_011',
    'Child Education Center (CEC)',
    '01749495297',
    'cec@autisticchildcare.org',
    'Dhaka',
    '68/8/A (3rd Floor), Zigatola (Near Post Office)',
    '1207'
);
-- INSERT DATA IN THERAPY_ORG TABLE END

COMMIT;

-- INSERT DATA IN THERAPY_HAS_THEAPYORG START
INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_01',
    'THO_01'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_01',
    'THO_02'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_01',
    'THO_03'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_01',
    'THO_05'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_01',
    'THO_011'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_02',
    'THO_02'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_02',
    'THO_04'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_02',
    'THO_06'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_02',
    'THO_08'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_02',
    'THO_010'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_03',
    'THO_03'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_03',
    'THO_05'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_03',
    'THO_07'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_03',
    'THO_09'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_03',
    'THO_011'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_04',
    'THO_01'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_04',
    'THO_02'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_04',
    'THO_03'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_04',
    'THO_04'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_04',
    'THO_05'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_05',
    'THO_06'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_05',
    'THO_07'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_05',
    'THO_08'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_05',
    'THO_09'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_06',
    'THO_010'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_06',
    'THO_011'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_06',
    'THO_01'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_07',
    'THO_02'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_07',
    'THO_03'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_07',
    'THO_04'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_07',
    'THO_05'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_08',
    'THO_06'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_08',
    'THO_07'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_09',
    'THO_08'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_09',
    'THO_09'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_10',
    'THO_010'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_10',
    'THO_011'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_11',
    'THO_01'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_11',
    'THO_02'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_12',
    'THO_03'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_12',
    'THO_04'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_13',
    'THO_05'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_13',
    'THO_06'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_14',
    'THO_07'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_14',
    'THO_08'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_15',
    'THO_09'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_15',
    'THO_010'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_16',
    'THO_011'
);

INSERT INTO THERAPY_HAS_THEAPYORG (
    TH_ID,
    THO_ID
) VALUES (
    'TH_16',
    'THO_01'
);

COMMIT;

-- INSERT DATA IN THERAPY_HAS_THEAPYORG END
