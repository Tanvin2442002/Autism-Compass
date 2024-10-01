import React, { useState } from 'react';
import './Courses.css';
import Navbar from '../Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EnrolledCourses = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const [enrolledCourses, setEnrolledCourses] = useState(location.state?.enrolledCourses || []);
   const [availableCourses, setAvailableCourses] = useState([]); // To store available courses after unenroll
   const userData = JSON.parse(localStorage.getItem('USER'));
   const C_ID = userData ? userData.ID : null;

   const [showModal, setShowModal] = useState(false); // State to control modal visibility
   const [courseToUnenroll, setCourseToUnenroll] = useState(null); // Course selected for unenrollment

   const viewFile = (course) => {
      if (!course.ASSIGNMENT_PATH) {
         alert("No assignment has been uploaded for this course.");
         return; // Exit function if no assignment exists
      }

      window.open(`http://localhost:5000/api/view-assignment/${course.COURSE_CODE}`, '_blank');
      console.log("view dl\n");
   };


   const downloadFile = (courseCode) => {
      axios({
         url: `http://localhost:5000/api/download-assignment/${courseCode}`, // Correct backend URL
         method: 'GET',
         responseType: 'blob', // Important to receive the file as a Blob
      })
         .then((response) => {

            if (response.status === 204) {
               alert('No assignment has been uploaded for this course.');
               return; // Stop further execution
            }


            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${courseCode}-assignment.pdf`); // File name for download
            document.body.appendChild(link);
            link.click();
            link.remove();
         })
         .catch((error) => {
            console.error('Error downloading file:', error);
         });
   };

   const confirmUnenroll = (courseCode) => {
      setCourseToUnenroll(courseCode); // Store the course code for the course to unenroll
      setShowModal(true); // Show the modal
   };

   const handleUnenrollConfirm = () => {
      if (courseToUnenroll) {
         axios.post('http://localhost:5000/api/unenroll', { COURSE_CODE: courseToUnenroll, C_ID })
            .then(response => {
               console.log('Unenrolled successfully:', response.data);

               // Update the state to move the course from enrolled to available courses
               setAvailableCourses(prevCourses => [
                  ...prevCourses,
                  enrolledCourses.find(course => course.COURSE_CODE === courseToUnenroll)
               ]);

               // Remove the course from the enrolled courses list
               setEnrolledCourses(prevCourses =>
                  prevCourses.filter(course => course.COURSE_CODE !== courseToUnenroll)
               );
            })
            .catch(error => {
               console.error('Error unenrolling from the course:', error);
            })
            .finally(() => {
               setShowModal(false); // Hide the modal after unenrolling
               setCourseToUnenroll(null); // Reset the course to unenroll
            });
      }
   };

   const handleUnenrollCancel = () => {
      setShowModal(false); // Close the modal without unenrolling
      setCourseToUnenroll(null); // Reset the selected course
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
                     console.log(`Course Code: ${course.COURSE_CODE}, Assignment Path: ${course.ASSIGNMENT_PATH}`);
                     return (
                        <div key={index} className="course-card">
                           <h3>Course Code: {course.COURSE_CODE}</h3>
                           <h2>{course.COURSE_NAME}</h2>
                           <p>Instructor: {course.TEACHER_NAME}</p>

                           <div className='jani-na'>
                              <div className="assignment-container-1">
                                 <button
                                    className='view-more-button'
                                    onClick={() => viewFile(course)}
                                 >
                                    View Assignment
                                 </button>
                                 <button
                                    className='view-more-button'
                                    onClick={() => downloadFile(course.COURSE_CODE)}
                                 >
                                    Download Assignment
                                 </button>
                              </div>
                              <div className="assignment-container-2">
                                 <button
                                    className='view-more-button'
                                    onClick={() => confirmUnenroll(course.COURSE_CODE)}
                                 >
                                    Unenroll
                                 </button>
                              </div>
                           </div>
                        </div>
                     );
                  })
               ) : (
                  <p>No courses enrolled yet.</p>
               )}
            </div>
         </div>

         {/* Confirmation Modal */}
         {showModal && (
            <div className="modal-overlay">
               <div className="modal-content">
                  <p>Are you sure you want to unenroll from this course?</p>
                  <div className="modal-buttons">
                     <button onClick={handleUnenrollConfirm} className="modal-yes">
                        Yes
                     </button>
                     <button onClick={handleUnenrollCancel} className="modal-no">
                        No
                     </button>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default EnrolledCourses;
