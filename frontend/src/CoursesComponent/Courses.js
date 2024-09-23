import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Navbar from '../Navbar';
import './Courses.css';
import Confetti from './Confetti';



const Courses = () => {
    const [courses, setCourses] = useState([]);  // For available courses or teacher courses
    const [enrolledCourses, setEnrolledCourses] = useState([]);  // For enrolled courses
    const [studentsByCourse, setStudentsByCourse] = useState({}); // For students grouped by course
    const [showCreateCourseForm, setShowCreateCourseForm] = useState(false); // Toggle form visibility
    const [newCourseCode, setNewCourseCode] = useState('');  // New course code input
    const [newCourseName, setNewCourseName] = useState('');  // New course name input
    const [selectedFile, setSelectedFile] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    

    


    // Fetch the C_ID or T_ID from local storage, which was set during login
    const userData = JSON.parse(localStorage.getItem('USER'));
    const C_ID = userData ? userData.ID : null;
    const T_ID = userData ? userData.ID : null;

    const navigate = useNavigate();  // React Router navigation function

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUploadAssignment = (courseCode) => {
        const formData = new FormData();
        formData.append('assignment', selectedFile);
        formData.append('COURSE_CODE', courseCode);
        formData.append('T_ID', T_ID);  // Assuming T_ID is available

        axios.post('http://localhost:5000/api/teacher/upload-assignment', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            console.log('Assignment uploaded:', response.data);
        })
        .catch((error) => {
            console.error('Error uploading assignment:', error);
        });
    };

    useEffect(() => {
        if (userData.TYPE === 'CHILD') {
            if (C_ID) {
                axios.get(`http://localhost:5000/api/courses/${C_ID}`)
                    .then((response) => {
                        const { availableCourses, enrolledCourses } = response.data;
                        setCourses(availableCourses || []);  // Set available courses
                        setEnrolledCourses(enrolledCourses ||  []);  // Set enrolled courses
                    })
                    .catch((error) => {
                        console.error('Error fetching courses:', error);
                    });
            }
        } else if (userData.TYPE === 'TEACHER') {
            if (T_ID) {
                axios.get(`http://localhost:5000/api/teacher/courses/${T_ID}`)
                    .then((response) => {
                        const { teacherCourses, enrolledStudents } = response.data;

                        // Organize students by course_code
                        const studentsGroupedByCourse = enrolledStudents.reduce((acc, student) => {
                            const { COURSE_CODE } = student;
                            if (!acc[COURSE_CODE]) {
                                acc[COURSE_CODE] = [];
                            }
                            acc[COURSE_CODE].push(student);
                            return acc;
                        }, {});

                        setCourses(teacherCourses || []);
                        setStudentsByCourse(studentsGroupedByCourse);
                    })
                    .catch((error) => {
                        console.error('Error fetching teacher courses:', error);
                    });
            }
        }
    }, [C_ID, userData.TYPE, T_ID]);

    // Navigate to StudentList page
    const handleShowStudents = (courseCode) => {
        console.log("Navigating to students list for course:", courseCode);
        navigate(`/students/${courseCode}`, { state: { students: studentsByCourse[courseCode] || [] } });
    };

    // Handle enrollment for children
    if (userData.TYPE === 'CHILD') {
        const handleEnroll = (course) => {
            axios.post('http://localhost:5000/api/enroll', {
                COURSE_CODE: course.COURSE_CODE,
                C_ID: C_ID
            })
            .then(response => {
                console.log(response.data);

                // If enrollment is successful, update the local state
                if (response.status === 200) {
                    setCourses(prevCourses => prevCourses.filter(c => c.COURSE_CODE !== course.COURSE_CODE));
                    
                    setShowConfetti(true);
                    setShowMessage(true);
    
                    // Hide the message after 3 seconds
                    setTimeout(() => {
                        setShowMessage(false);
                    }, 3000);
                   
                }
            })
            .catch(error => {
                console.error('Error enrolling in the course:', error);
            });

            
        };

        const goToEnrolledCourses = () => {
            navigate('/enrolled-courses', { state: { enrolledCourses } });
        };
        const stayOnPage = () => {
            //setMessage('You stayed on the page!');
          };

          
    

        return (
            <>
                <Navbar />
                <Confetti showConfetti={showConfetti} showMessage={showMessage} />
                <div className="courses-container">
                <button 
                    onClick={stayOnPage} 
                    className="avail-button">
                    Available Courses
                </button>
                    
                    <button 
                    onClick={goToEnrolledCourses} 
                    className="enroll-button">
                    Enrolled Courses
                </button>
                    <div className="courses-grid">
                        {courses.length > 0 ? (
                            courses.map(course => (
                                <div key={course.COURSE_CODE} className="course-card">
                                    <h3 className="course-code">Course Code: {course.COURSE_CODE}</h3>
                                    <h2 className="course-name">{course.COURSE_NAME}</h2>
                                    <p className="course-instructor">Instructor: {course.TEACHER_NAME}</p>
                                    <button 
                                        className="enrolll-button" 
                                        onClick={() => handleEnroll(course)}>
                                        Enroll Now!
                                    </button>

                                </div>
                            ))
                        ) : (
                            <p>No available courses</p>
                        )}
                    </div>
                    
                </div>
            </>
        );
    } 

// Teacher: Course creation and file upload
else if (userData.TYPE === 'TEACHER') {
    const handleCreateCourse = (e) => {
        e.preventDefault();
        if (newCourseCode && newCourseName) {
            axios.post('http://localhost:5000/api/teacher/create-course', {
                T_ID,
                COURSE_CODE: newCourseCode,
                COURSE_NAME: newCourseName
            })
            .then(response => {
                if (response.status === 200) {
                    const newCourse = response.data.course;
                    setCourses(prevCourses => [...prevCourses, newCourse]);
                    setShowCreateCourseForm(false);
                    setNewCourseCode('');
                    setNewCourseName('');
                }
            })
            .catch(error => {
                console.error('Error creating course:', error);
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
        className="create-course-button">
        {showCreateCourseForm ? 'Cancel' : 'Create Course'}
    </button>
</div>


    
                {showCreateCourseForm && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <form className="create-course-form" onSubmit={handleCreateCourse}>
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
                                <div className="form-buttons">
                                    <button type="submit" className="submit-course-button">Create Course</button>
                                    <button 
                                        type="button" 
                                        className="cancel-button" 
                                        onClick={() => setShowCreateCourseForm(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
    
                <div className="courses-grid">
                    {courses.length > 0 ? (
                        courses.map(course => {
                            const studentCount = studentsByCourse[course.COURSE_CODE]?.length || 0;
    
                            return (
                                <div key={course.COURSE_CODE} className="course-card">
                                    <h3 className="course-code">Course Code: {course.COURSE_CODE}</h3>
                                    <h2 className="course-name">{course.COURSE_NAME}</h2>
                                    <p className="student-count">Enrolled Students: {studentCount}</p>
                                    <button 
                                        className="show-students-button" 
                                        onClick={() => handleShowStudents(course.COURSE_CODE)}>
                                        Show Students
                                    </button>
                                    <input 
                                        type="file" 
                                        onChange={handleFileChange} 
                                        className="file-input" 
                                    />
                                    <button 
                                        className="upload-assignment-button"
                                        onClick={() => handleUploadAssignment(course.COURSE_CODE)}>
                                        Upload Assignment
                                    </button>
                                </div>
                            );
                        })
                    ) : (
                        <p>No courses assigned</p>
                    )}
                </div>
            </div>
        </>
    );
    
    
}
};

export default Courses;
