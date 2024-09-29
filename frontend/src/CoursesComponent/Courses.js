import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Navbar from "../Navbar";
import "./Courses.css";
import Confetti from "./Confetti";

const Courses = () => {
  const [courses, setCourses] = useState([]); // For available courses or teacher courses
  const [enrolledCourses, setEnrolledCourses] = useState([]); // For enrolled courses
  const [studentsByCourse, setStudentsByCourse] = useState({}); // For students grouped by course
  const [showCreateCourseForm, setShowCreateCourseForm] = useState(false); // Toggle form visibility
  const [newCourseCode, setNewCourseCode] = useState(""); // New course code input
  const [newCourseName, setNewCourseName] = useState(""); // New course name input
  const [selectedFile, setSelectedFile] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [enrollmentMessage, setEnrollmentMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showcoursecreate, setCourseCreate] = useState(false);
  const [uploadsucess, setUploadSucess] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');

  // Fetch the C_ID or T_ID from local storage, which was set during login
  const userData = JSON.parse(localStorage.getItem("USER"));
  const C_ID = userData ? userData.ID : null;
  const T_ID = userData ? userData.ID : null;

  const navigate = useNavigate(); // React Router navigation function

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleViewAssignment = (courseCode) => {
    axios({
      url: `http://localhost:5000/api/download-assignment/${courseCode}`, // Backend endpoint to get assignment
      method: "GET",
      responseType: "blob", // To receive the file as a blob
    })
      .then((response) => {
        if (response.status === 204) {
          alert("No assignment has been uploaded for this course.");
        } else {
          // Create a blob URL to view the PDF
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/pdf" })
          );
          window.open(url); // Open in a new tab for viewing
        }
      })
      .catch((error) => {
        console.error("Error viewing assignment:", error);
      });
  };

  const handleUploadAssignment = (courseCode) => {
    const formData = new FormData();
    formData.append("assignment", selectedFile);
    formData.append("COURSE_CODE", courseCode);
    formData.append("T_ID", T_ID); // Assuming T_ID is available

    axios
      .post("http://localhost:5000/api/teacher/upload-assignment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUploadSucess(true);

          setTimeout(() => {
            setUploadSucess(false);
          }, 3000);
        }

        console.log("Assignment uploaded:", response.data);
      })
      .catch((error) => {
        console.error("Error uploading assignment:", error);
      });
  };

  useEffect(() => {
    if (userData.TYPE === "CHILD") {
      if (C_ID) {
        axios
          .get(`http://localhost:5000/api/courses/${C_ID}`)
          .then((response) => {
            const { availableCourses, enrolledCourses } = response.data;
            setCourses(availableCourses || []); // Set available courses
            setEnrolledCourses(enrolledCourses || []); // Set enrolled courses
          })
          .catch((error) => {
            console.error("Error fetching courses:", error);
          });
      }
    } else if (userData.TYPE === "TEACHER") {
      if (T_ID) {
        axios
          .get(`http://localhost:5000/api/teacher/courses/${T_ID}`)
          .then((response) => {
            const { teacherCourses, enrolledStudents } = response.data;

            // Organize students by course_code
            const studentsGroupedByCourse = enrolledStudents.reduce(
              (acc, student) => {
                const { COURSE_CODE } = student;
                if (!acc[COURSE_CODE]) {
                  acc[COURSE_CODE] = [];
                }
                acc[COURSE_CODE].push(student);
                return acc;
              },
              {}
            );

            setCourses(teacherCourses || []);
            setStudentsByCourse(studentsGroupedByCourse);
          })
          .catch((error) => {
            console.error("Error fetching teacher courses:", error);
          });
      }
    }
  }, [C_ID, userData.TYPE, T_ID]);

  // Navigate to StudentList page
  const handleShowStudents = (courseCode) => {
    console.log("Navigating to students list for course:", courseCode);
    navigate(`/students/${courseCode}`, {
      state: { students: studentsByCourse[courseCode] || [] },
    });
  };

  // Handle enrollment for children
  if (userData.TYPE === "CHILD") {
    const handleEnroll = (course) => {
      axios
        .post("http://localhost:5000/api/enroll", {
          COURSE_CODE: course.COURSE_CODE,
          C_ID: C_ID,
        })
        .then((response) => {
          console.log(response.data);

          // If enrollment is successful, update the local state
          if (response.status === 200) {
            setCourses((prevCourses) =>
              prevCourses.filter((c) => c.COURSE_CODE !== course.COURSE_CODE)
            );

            setShowConfetti(true);
            setShowMessage(true);
            setEnrollmentMessage(true);

            // Hide the message after 3 seconds
            setTimeout(() => {
              setShowMessage(false);
              setEnrollmentMessage(false);
            }, 3000);
          }
        })
        .catch((error) => {
          console.error("Error enrolling in the course:", error);
        });
    };

    const goToEnrolledCourses = () => {
      navigate("/enrolled-courses", { state: { enrolledCourses } });
    };
    const stayOnPage = () => {
      //setMessage('You stayed on the page!');
    };

    return (
      <>
        <Navbar />
        <Confetti showConfetti={showConfetti} showMessage={showMessage} />
        <div className="courses-container">
          <button onClick={stayOnPage} className="avail-button">
            Available Courses
          </button>

          <button onClick={goToEnrolledCourses} className="enroll-button">
            Enrolled Courses
          </button>
          <div className="courses-grid">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div key={course.COURSE_CODE} className="course-card">
                  <h3 className="course-code">
                    Course Code: {course.COURSE_CODE}
                  </h3>
                  <h2 className="course-name">{course.COURSE_NAME}</h2>
                  <p className="course-instructor">
                    Instructor: {course.TEACHER_NAME}
                  </p>
                  <button
                    className="enrolll-button"
                    onClick={() => handleEnroll(course)}
                  >
                    Enroll Now!
                  </button>
                </div>
              ))
            ) : (
              <p>No available courses</p>
            )}
          </div>
        </div>
        {enrollmentMessage && (
          <div className="enrollment-message">Successfully Enrolled!</div>
        )}
      </>
    );
  }

  // Teacher: Course creation and file upload
  else if (userData.TYPE === "TEACHER") {
    const handleCreateCourse = (e) => {
      e.preventDefault();

      setErrorMessage("");

      if (newCourseCode && newCourseName) {
        axios
          .post("http://localhost:5000/api/teacher/create-course", {
            T_ID,
            COURSE_CODE: newCourseCode,
            COURSE_NAME: newCourseName,
          })
          .then((response) => {
            if (response.status === 200) {
              const newCourse = response.data.course;
              setCourses((prevCourses) => [...prevCourses, newCourse]);
              setShowCreateCourseForm(false);
              setNewCourseCode("");
              setNewCourseName("");

              setCourseCreate(true);

              setTimeout(() => {
                setCourseCreate(false);
              }, 3000);
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              // If a 400 error is received, show a pop-up message that the course code exists
              setErrorMessage(
                "Course code already exists. Please choose another."
              );
            } else {
              console.error("Error creating course:", error);
            }
          });
      }
    };

    return (
      <>
        <Navbar />
        <div className="teacher-courses-container">
          <div className="headline-button-container">
            <h2 className="courses-title">Assigned Courses</h2>
            <button
              onClick={() => setShowCreateCourseForm(!showCreateCourseForm)}
              className="create-course-button"
            >
              {showCreateCourseForm ? "Cancel" : "Create Course"}
            </button>
          </div>

          {showCreateCourseForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <form
                  className="create-course-form"
                  onSubmit={handleCreateCourse}
                >
                  <input
                    type="text"
                    placeholder="Course Code"
                    value={newCourseCode}
                    onChange={(e) => setNewCourseCode(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Course Name"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    required
                  />
                  {/* Show error message if course code exists */}
                  {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                  )}
                  <div className="form-buttons">
                    <button type="submit" className="submit-course-button">
                      Create Course
                    </button>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => setShowCreateCourseForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="courses-grid">
            {courses.length > 0 ? (
              courses.map((course) => {
                const studentCount =
                  studentsByCourse[course.COURSE_CODE]?.length || 0;
                return (
                  <div key={course.COURSE_CODE} className="course-card">
                    <h3 className="course-code">
                      Course Code: {course.COURSE_CODE}
                    </h3>
                    <h2 className="course-name">{course.COURSE_NAME}</h2>
                    <p className="student-count">
                      Enrolled Students: {studentCount}
                    </p>
                    <button
                      className="show-students-button"
                      onClick={() => handleShowStudents(course.COURSE_CODE)}
                    >
                      Show Students
                    </button>
                    <div className="assignment-container">
                    
                      <select
                        className="assignment-dropdown"
                        onChange={(e) => {
                          setSelectedAction(e.target.value);
                          if (e.target.value === "view") {
                            handleViewAssignment(course.COURSE_CODE);
                          }
                        }}
                        value={selectedAction}
                      >
   
                        <option value="upload">Upload Assignment</option>
                        <option value="view">View Assignment</option>
                      </select>

                      {selectedAction === "upload" && (
                        <>
                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="file-input"
                            style={{ marginTop: "10px" }}
                          />
                          <button
                            className="upload-assignment-button"
                            onClick={() =>
                              handleUploadAssignment(course.COURSE_CODE)
                            }
                          >
                            Upload Assignment
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No courses assigned</p>
            )}
          </div>

          {/* Show success message after assignment upload */}
          {uploadsucess && (
            <div className="enrollment-message">
              Assignment uploaded successfully!
            </div>
          )}

          {showcoursecreate && (
            <div className="enrollment-message">
              Successfully Course Created!
            </div>
          )}
        </div>
      </>
    );
  }
};

export default Courses;
