import React from "react";
import { Link } from "react-router-dom";
import LandDelivery from './img/LandDelivery.svg';
import LandDoc from './img/LandDoc.svg';
import LandDocPrec from './img/LandDocPrec.svg';
import LandFam from './img/LandFam.svg';
import LandMother from './img/LandMother.svg';
import LandTeaching from './img/LandTeaching.svg';
import LandTreat from './img/LandTreat.svg';
import LandPuzzle from "./img/puzzlebg.png";
import "./Landing.css";
import Reveal from "./RevealRightToLeft";
import { motion, useScroll, useSpring } from 'framer-motion';

const Landing = () => {

   const { scrollYProgress } = useScroll();
   const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
   });

   return (
      <motion.div className="langingPage"
         // style={{ scaleX }}
      >
         <ul class="puzzle-circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
         </ul>
         <Reveal>
            <div className="page1">
               <div className="Nav">
                  <Link to="/login" className="login">LOG IN</Link>
                  <Link to="/signup" className="register">SIGN UP</Link>
               </div>
               <div className="rand1C">
                  <div className="innerRand">
                     <img className="im3" src={LandPuzzle} alt="im2" width={300} height={300} />
                     <h1>AUTISM COMPASS</h1>
                     {/* <img className="im2" src={im2} alt="im2" width={100} height={100} /> */}
                  </div>
               </div>
               <div className="downImg first downL">
                  <img src={LandDoc} alt="course" width={600} height={480} />
               </div>
               <div className="downImg second downR">
                  <img src={LandFam} alt="course" width={500} height={500} />
               </div>
            </div>
         </Reveal>
         <Reveal>
            <div className="page2">
               <div className="sideImg">
                  <img src={LandMother} className="left" alt="course" />
               </div>
               <div className="sideInfo">
                  <h1>Parent and Children</h1>
                  <p>
                     Empowering parents to take control of their child’s care, Autism Compass provides easy access to book doctor appointments, explore therapy options, and track updates all in one place. With the ability to view details about doctors, therapy locations, and even purchase specialized products for home delivery, parents have everything they need to ensure their child’s well-being right at their fingertips.
                  </p>
                  <button className="view-more-button">JOIN US AND EXPLORE MORE...</button>
               </div>
            </div>
         </Reveal>
         <Reveal>
            <div className="page3">
               <div className="sideInfo">
                  <h1>Doctor</h1>
                  <p>
                     Doctors can connect with families, offer tailored suggestions. By recommending therapies and providing timely feedback, doctors ensure each child’s unique needs are met, creating a streamlined experience for both medical professionals and parents working together.
                  </p>
                  <button className="view-more-button">JOIN US AND EXPLORE MORE...</button>
               </div>
               <div className="sideImg">
                  <img src={LandDocPrec} className="left" alt="course" />
               </div>
            </div>
         </Reveal>
         <Reveal>
            <div className="page4">
               <div className="sideImg">
                  <img src={LandTreat} className="left" alt="course" />
               </div>
               <div className="sideInfo">
                  <h1>Therapy</h1>
                  <p>
                     Autism Compass offers a comprehensive list of therapies tailored to various needs, with detailed descriptions and locations to help parents and children find the right support. Easily browse therapy options, view where sessions are available, and book appointments directly through the platform. This seamless system ensures that finding and scheduling therapies is convenient and accessible without needing direct contact with therapists.
                  </p>
                  <button className="view-more-button">JOIN US AND EXPLORE MORE...</button>
               </div>
            </div>
         </Reveal>
         <Reveal>
            <div className="page5">
               <div className="sideInfo">
                  <h1>Shops & Delivery</h1>
                  <p>Autism Compass offers a thoughtful selection of products, including toys and items designed to support children with autism. Users can easily browse, add products to their cart, and complete purchases smoothly. Track your delivery status directly on the platform and know exactly when your order will arrive. With convenient doorstep delivery, finding the right products for your child has never been more straightforward or stress-free.
                  </p>
                  <button className="view-more-button">JOIN US AND EXPLORE MORE...</button>
               </div>
               <div className="sideImg">
                  <img src={LandDelivery} className="left" alt="course" />
               </div>
            </div>
         </Reveal>
         <Reveal>
            <div className="page6">
               <div className="sideImg">
                  <img src={LandTeaching} className="left" alt="course" />
               </div>
               <div className="sideInfo">
                  <h1>Teacher</h1>
                  <p>
                     Teachers can offer specialized courses designed for children with autism, where parents and children can select classes, submit assignments, and interact with learning materials. Autism Compass fosters an accessible, supportive environment where education is tailored to individual learning styles and progress can be tracked with ease.
                  </p>
                  <button className="view-more-button">JOIN US AND EXPLORE MORE...</button>
               </div>
            </div>
         </Reveal>
      </motion.div>
   );
};

export default Landing;
