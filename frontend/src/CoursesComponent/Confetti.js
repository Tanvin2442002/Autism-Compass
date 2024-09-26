import React, { useEffect, useState } from "react";
import ReactConfetti from 'react-confetti';
import './Courses.css';

const Confetti = ({ showConfetti, showMessage }) => {
    // const [windowDimension, setDimension] = useState({
    //     width: window.innerWidth,
    //     height: window.innerHeight
    // });

    // const detectSize = () => {
    //     setDimension({ width: window.innerWidth, height: window.innerHeight });
    // };

    // useEffect(() => {
    //     window.addEventListener('resize', detectSize);
    //     return () => {
    //         window.removeEventListener('resize', detectSize);
    //     };
    // }, []);

    // return (
    //     <>
    //         {showConfetti && (
    //             <ReactConfetti
    //                 width={windowDimension.width}
    //                 height={windowDimension.height}
    //                 tweenDuration={1000}
    //             />
    //         )}

    //         {showMessage && (
    //             <div className="popup-message">
    //                 <p>Successfully Enrolled!</p>
    //             </div>
    //         )}
    //     </>
    // );
};

export default Confetti;
