import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import './Courses.css';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/courses')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    }, []);

    const handleEnroll = (course) => {
        // Add the selected course to the enrolledCourses state
        setEnrolledCourses(prevEnrolled => [...prevEnrolled, course]);

        // Remove the selected course from the available courses
        setCourses(prevCourses => prevCourses.filter(c => c.COURSE_CODE !== course.COURSE_CODE));
    };
    const goToEnrolledCourses = () => {
        navigate('/enrolled-courses', { state: { enrolledCourses } });
    };

    return (
        <>
            <Navbar />
            <div className="courses-container">
                <h2 className="courses-title">Available Courses</h2>
                <div className="courses-grid">
                    {courses.map(course => (
                        <div key={course.course_code} className="course-card">
                            <h3 className="course-code">Course Code: {course.COURSE_CODE}</h3>
                            <h2 className="course-name">Course Name: {course.COURSE_NAME}</h2>
                            <p className="course-instructor">Instructor: {course.TEACHER_NAME}</p>
                            <button 
                                className="enroll-button" 
                                onClick={() => handleEnroll(course)}>
                                Enroll
                            </button>
                        </div>
                    ))}
                </div>
                <button 
                    onClick={goToEnrolledCourses} 
                    className="enroll-button">
                    List of Enrolled Courses
                </button>
            </div>
        </>
    );
};

export default Courses;
