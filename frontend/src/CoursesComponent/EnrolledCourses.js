import React from 'react';
import { useLocation } from 'react-router-dom';  // Import useLocation

const EnrolledCourses = () => {
    const location = useLocation();  // Get the state passed via navigate
    const { enrolledCourses } = location.state || { enrolledCourses: [] };  // Fallback to an empty array if undefined

    return (
        <div>
            <h2>Enrolled Courses</h2>
            {enrolledCourses.length > 0 ? (
                <div>
                    {enrolledCourses.map((course, index) => (
                        <div key={index} className="course-card">
                            <p>Course Code: {course.COURSE_CODE}</p>
                            <h3>Course Name: {course.COURSE_NAME}</h3>
                            <p>Assigned teacher: {course.TEACHER_NAME}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No courses enrolled yet.</p>
            )}
        </div>
    );
};

export default EnrolledCourses;
