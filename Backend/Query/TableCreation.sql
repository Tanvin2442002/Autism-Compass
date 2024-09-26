CREATE SEQUENCE
    USER_ID
    INCREMENT BY 1
    START WITH 1001;


create table LOG_IN
(
    EMAIL    VARCHAR2(255) not null,
    PASSWORD VARCHAR2(255) not null,
    TYPE     VARCHAR2(255) not null
);

create table CHILD
(
    C_ID        VARCHAR2(255) not null
        primary key,
    NAME        VARCHAR2(255) not null,
    DOB         DATE          not null,
    AGE         NUMBER,
    CONTACT_NO  NUMBER        not null,
    EMAIL       VARCHAR2(255) not null,
    P_EMAIL     VARCHAR2(255) not null,
    CITY        VARCHAR2(255) not null,
    STREET      VARCHAR2(255) not null,
    POSTAL_CODE NUMBER        not null
);

create trigger TRG_UPDATE_AGE
    before insert or update
    on CHILD
    for each row
BEGIN
    :NEW.AGE := FLOOR(MONTHS_BETWEEN(SYSDATE, :NEW.DOB) / 12);
END;

create table PARENT
(
    P_ID        VARCHAR2(255) not null
        primary key,
    NAME        VARCHAR2(255) not null,
    DOB         DATE          not null,
    AGE         NUMBER,
    CONTACT_NO  NUMBER        not null,
    EMAIL       VARCHAR2(255) not null,
    CITY        VARCHAR2(255) not null,
    STREET      VARCHAR2(255) not null,
    POSTAL_CODE NUMBER        not null
);

create trigger P_TRG_UPDATE_AGE
    before insert or update
    on PARENT
    for each row
BEGIN
    :NEW.AGE := FLOOR(MONTHS_BETWEEN(SYSDATE, :NEW.DOB) / 12);
END;

create table TEACHER
(
    T_ID        VARCHAR2(255) not null
        primary key,
    NAME        VARCHAR2(255) not null,
    CONTACT_NO  NUMBER        not null,
    EMAIL       VARCHAR2(255) not null,
    INSTITUTION VARCHAR2(255) not null
);

CREATE OR REPLACE TYPE ADDR AS
    OBJECT(
        CITY VARCHAR2(255),
        STREET VARCHAR2(255),
        POSTAL_CODE NUMBER
    );

create table HEALTH_PROFESSIONAL
(
    H_ID             VARCHAR2(255) not null
        primary key,
    NAME             VARCHAR2(255) not null,
    CONTACT_NO       NUMBER        not null,
    EMAIL            VARCHAR2(255) not null,
    DEGREE           VARCHAR2(255) not null,
    FIELD_OF_SPEC    VARCHAR2(255) not null,
    NAME_OF_HOSPITAL VARCHAR2(255),
    VISIT_TIME       VARCHAR2(255),
    ADDRESS          ADDR
);

create table COURSES
(
    COURSE_CODE VARCHAR2(255) not null
        primary key,
    COURSE_NAME VARCHAR2(255) not null
);

create table THERAPY
(
    TH_ID               VARCHAR2(255) not null
        primary key,
    THERAPY_TYPE        VARCHAR2(255) not null,
    THERAPY_DESCRIPTION VARCHAR2(255) not null
);

create table THERAPY_ORG
(
    THO_ID      VARCHAR2(255) not null
        primary key,
    NAME        VARCHAR2(255) not null,
    CONTACT_NO  NUMBER        not null,
    EMAIL       VARCHAR2(255) not null,
    CITY        VARCHAR2(255) not null,
    STREET      VARCHAR2(255) not null,
    POSTAL_CODE NUMBER        not null
);

create table DISORDER
(
    D0_ID       VARCHAR2(255) not null
        primary key,
    TYPE        VARCHAR2(255) not null,
    DESCRIPTION VARCHAR2(255) not null
);

create table DELIVERY
(
    D_ID        VARCHAR2(255) not null
        primary key,
    NAME        VARCHAR2(255) not null,
    CITY        VARCHAR2(255) not null,
    STREET      VARCHAR2(255) not null,
    HOUSE_NO    VARCHAR2(20),
    CONTANCT_NO VARCHAR2(100)
);

create table BILLS
(
    B_ID          VARCHAR2(255) not null
        primary key,
    AMOUNT        NUMBER        not null,
    DELIVERY_DATE DATE
);

create table PRODUCT
(
    PR_ID       VARCHAR2(255) not null
        primary key,
    NAME        VARCHAR2(255) not null,
    SRC         VARCHAR2(255) not null,
    PRICE       NUMBER        not null,
    QUANTITY    NUMBER        not null,
    DESCRIPTION VARCHAR2(255) not null
);

create table ASSIGNED
(
    COURSE_CODE VARCHAR2(255) not null
        references COURSES,
    T_ID        VARCHAR2(255) not null
        references TEACHER,
    primary key (COURSE_CODE, T_ID)
);

create table THERAPY_HAS_THEAPYORG
(
    TH_ID  VARCHAR2(255) not null
        references THERAPY,
    THO_ID VARCHAR2(255) not null
        references THERAPY_ORG,
    primary key (TH_ID, THO_ID)
);

create table ENROLLS
(
    C_ID        VARCHAR2(255) not null
        references CHILD,
    COURSE_CODE VARCHAR2(255) not null
        references COURSES,
    primary key (C_ID, COURSE_CODE)
);

create table CHILD_HAS_DISORDER
(
    C_ID  VARCHAR2(255) not null
        references CHILD,
    D0_ID VARCHAR2(255) not null
        references DISORDER,
    primary key (C_ID, D0_ID)
);

create table PARENT_HAS_CHILD
(
    P_ID VARCHAR2(255) not null
        references PARENT,
    C_ID VARCHAR2(255) not null
        references CHILD,
    primary key (P_ID, C_ID)
);

create table GET
(
    P_ID          VARCHAR2(255) not null
        references PARENT,
    D_ID          VARCHAR2(255) not null
        references DELIVERY,
    DELIVERY_DATE DATE          not null,
    CITY          VARCHAR2(255),
    STREET        VARCHAR2(255),
    HOUSE_NO      VARCHAR2(255),
    primary key (P_ID, D_ID)
);

create table PAYS
(
    P_ID             VARCHAR2(255) not null
        references PARENT,
    B_ID             VARCHAR2(255) not null
        references BILLS,
    QUANTITY         NUMBER,
    PR_ID            VARCHAR2(255) not null
        references PRODUCT,
    DATE_OF_DELIVERY DATE,
    CITY             VARCHAR2(50),
    STREET           VARCHAR2(50),
    HOUSE_NO         VARCHAR2(50)
);

create table PURCHASES
(
    P_ID           VARCHAR2(255) not null
        references PARENT,
    PR_ID          VARCHAR2(255) not null
        references PRODUCT,
    PURCHASE_DATE  DATE          not null,
    AMOUNT         NUMBER,
    QUANTITY       NUMBER,
    PRICE_WITH_VAT as ("AMOUNT" + "AMOUNT" * 0.05),
    primary key (P_ID, PR_ID)
);

create table ASSIGNED_TO
(
    B_ID VARCHAR2(255) not null
        references BILLS,
    D_ID VARCHAR2(255) not null
        references DELIVERY,
    primary key (B_ID, D_ID)
);

create table BILLS_FOR_PRODUCT
(
    B_ID  VARCHAR2(255) not null
        references BILLS,
    PR_ID VARCHAR2(255) not null
        references PRODUCT,
    primary key (B_ID, PR_ID)
);

create table BOOKS
(
    C_ID         VARCHAR2(255) not null
        references CHILD,
    TH_ID        VARCHAR2(255) not null
        references THERAPY,
    P_ID         VARCHAR2(255) not null
        references PARENT,
    THO_ID       VARCHAR2(255) not null
        references THERAPY_ORG,
    BOOKING_DATE DATE          not null,
    primary key (TH_ID, THO_ID, C_ID, P_ID)
);

create table CONSULTS
(
    P_ID          VARCHAR2(255) not null
        references PARENT,
    H_ID          VARCHAR2(255) not null
        references HEALTH_PROFESSIONAL,
    C_ID          VARCHAR2(255) not null
        references CHILD,
    SELECTED_DATE DATE          not null,
    SELECTED_TIME VARCHAR2(50)  not null,
    primary key (H_ID, C_ID, P_ID)
);

create table SUGGESTS
(
    C_ID     VARCHAR2(255) not null
        references CHILD,
    H_ID     VARCHAR2(255) not null
        references HEALTH_PROFESSIONAL,
    TH_ID    VARCHAR2(255) not null
        references THERAPY,
    FEEDBACK VARCHAR2(1000),
    primary key (C_ID, H_ID, TH_ID)
);

--VIEW---
CREATE VIEW OrderDetails AS
SELECT DISTINCT B.B_ID, B.AMOUNT, B.DELIVERY_DATE, D.NAME, D.CONTANCT_NO, P.P_ID
FROM BILLS B
JOIN ASSIGNED_TO AT ON B.B_ID = AT.B_ID
JOIN DELIVERY D ON AT.D_ID = D.D_ID
JOIN PAYS P ON P.B_ID = B.B_ID;
commit;
----VIEW END---