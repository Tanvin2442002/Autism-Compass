INSERT INTO COURSES (COURSE_CODE, COURSE_NAME) VALUES ('C1', 'Social Thinking and Communication Skills');
INSERT INTO COURSES (COURSE_CODE, COURSE_NAME) VALUES ('C2', 'Speech Therapy for Autism');
INSERT INTO COURSES (COURSE_CODE, COURSE_NAME) VALUES ('C3', 'Emotional Awareness and Self-Regulation');
INSERT INTO COURSES (COURSE_CODE, COURSE_NAME) VALUES ('C4', 'Daily Living Skills Training');
INSERT INTO COURSES (COURSE_CODE, COURSE_NAME) VALUES ('C5', 'Sensory Integration Therapy');
INSERT INTO COURSES (COURSE_CODE, COURSE_NAME) VALUES ('C6', 'Mathematics and Logical Thinking for Autism');
INSERT INTO COURSES (COURSE_CODE, COURSE_NAME) VALUES ('C7', 'Music Therapy for Autism');
INSERT INTO COURSES (COURSE_CODE, COURSE_NAME) VALUES ('C8', 'Adaptive Physical Education');
INSERT INTO COURSES (COURSE_CODE, COURSE_NAME) VALUES ('C9', 'Coding for Children with Autism');
INSERT INTO COURSES (COURSE_CODE, COURSE_NAME) VALUES ('C10', 'Art Therapy and Expression');

COMMIT;

-- END OF COURSES TABLES


ALTER TABLE COURSES ADD ASSIGNMENT_PATH VARCHAR(255);


--trigger

CREATE OR REPLACE TRIGGER limit_enrollment
BEFORE INSERT ON enrolls
FOR EACH ROW
DECLARE
    existing_count NUMBER;
BEGIN
    -- Check if a student is already enrolled in the course
    SELECT COUNT(*) INTO existing_count
    FROM enrolls
    WHERE course_code = :NEW.COURSE_CODE;

    IF existing_count > 1 THEN
        -- Raise an exception to prevent the insert
        RAISE_APPLICATION_ERROR(-20001, 'Only one student can be enrolled in this course.');
    END IF;
END;
