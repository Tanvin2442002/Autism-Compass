import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Courses.css';

const StudentList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { students } = location.state || { students: [] };  

    return (
        <div className="modal-container">
            <div className="modal-contenta">
                <button className="close-button" onClick={() => navigate(-1)}>×</button>
                <h2 className="students-title">Enrolled Students</h2>
                {students.length > 0 ? (
                    <table className="students-table">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Student Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.C_ID}>
                                    <td>{student.C_ID}</td>
                                    <td>{student.STUDENT_NAME}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-students-message">No students enrolled in this course.</p>
                )}
                <button className="back-button" onClick={() => navigate(-1)}>Back to Courses</button>
            </div>
        </div>
    );
};

export default StudentList;
