import React,{useState} from 'react';
import './Courses.css';
import Navbar from '../Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';



const EnrolledCourses = () => {
    const location = useLocation();
    const navigate = useNavigate();
    //const { enrolledCourses } = location.state || { enrolledCourses: [] };
    const [enrolledCourses, setEnrolledCourses] = useState(location.state?.enrolledCourses || []);

    const [availableCourses, setAvailableCourses] = useState([]); // To store available courses after unenroll
    const userData = JSON.parse(localStorage.getItem('USER'));
    const C_ID = userData ? userData.ID : null;

    const downloadFile = (courseCode) => {
        // Use the backend API to download the file for the given course code
        const url = `http://localhost:3000/api/download-assignment/${courseCode}`;
    
        // Simply trigger the download without setting the download attribute
        const aTag = document.createElement('a');
        aTag.href = url;
        aTag.target = '_blank';  // Open in a new tab, ensuring the browser handles it as a file
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    };

    const unenrollCourse = (courseCode) => {
        axios.post('http://localhost:5000/api/unenroll', { COURSE_CODE: courseCode, C_ID })
            .then(response => {
                console.log('Unenrolled successfully:', response.data);

                // Update the state to move the course from enrolled to available courses
                setAvailableCourses(prevCourses => [...prevCourses, 
                    enrolledCourses.find(course => course.COURSE_CODE === courseCode)
                ]);

                // Remove the course from the enrolled courses list
                setEnrolledCourses(prevCourses =>
                    prevCourses.filter(course => course.COURSE_CODE !== courseCode)
                );
            })
            .catch(error => {
                console.error('Error unenrolling from the course:', error);
            });
    };
    
    return (
        <>
            <Navbar />
            <div className="courses-container">
                <button onClick={() => navigate(-1)} className="avail-button">Available Courses</button>
                <button className="enroll-button">
                    Enrolled Courses
                </button>
                <div className="courses-grid">
                    {enrolledCourses.length > 0 ? (
                        enrolledCourses.map((course, index) => {
                            // Log assignment path for debugging
                            console.log(`Course Code: ${course.COURSE_CODE}, Assignment Path: ${course.ASSIGNMENT_PATH}`);

                            console.log(course);

                            return (
                                <div key={index} className="course-card">
                                    <h3>Course Code: {course.COURSE_CODE}</h3>
                                    <h2>{course.COURSE_NAME}</h2>
                                    <p>Assigned teacher: {course.TEACHER_NAME}</p>
                                    
                                        <div className="download">
                                            <button onClick={() => downloadFile(course.COURSE_CODE)}>
                                                Download Assignment
                                            </button>
                                        </div>
                                        <div className="unenrolll">
                                    <button
                                    className="unenrolll-button" 
                                    onClick={() => unenrollCourse(course.COURSE_CODE)}>
                                        Unenroll
                                    </button>
                                </div>
                                    
                                </div>
                            );
                        })
                    ) : (
                        <p>No courses enrolled yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default EnrolledCourses;
