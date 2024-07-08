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
    '01924-987727',
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
