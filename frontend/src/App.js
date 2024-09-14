import React from "react";
import { Route, useLocation, BrowserRouter as Router, Routes } from "react-router-dom";
import Disorder from "./ChildComponent/Disorder";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import LogIn from "./LogInSignUpComponent/Login";
import Profile from "./LogInSignUpComponent/Profile";
import Registration from "./LogInSignUpComponent/Registration";
import ResetPass from "./LogInSignUpComponent/ResetPass";
import Cart from "./productComponent/Cart";
import ProductDetails from "./productComponent/productDetails";
import ProductList from "./productComponent/ProductList/productList";
import BookingTherapy from "./TherapyComponent/BookingTherapy";
import BookedTherapy from "./TherapyComponent/BookedTherapy";
import Therapy from "./TherapyComponent/Therapy";
import TherapyDetail from "./TherapyComponent/TherapyDetails";
import TherapyOrganizations from "./TherapyComponent/TherapyORG";
import Order from "./productComponent/delivery/order";
import DoctorsList from "./DoctorComponent/DocList";
import DoctorProfile from "./DoctorComponent/DoctorProfile";
import ParentChildProfile from "./LogInSignUpComponent/ParentChildProfile";
import BookingDoc from "./DoctorComponent/BookingDoc";
import BookedList from "./DoctorComponent/BookedList";
import Consultation from "./DoctorComponent/Consultation";
import Allorderlist from "./productComponent/delivery/Allorderlist";
import SuggestedList from "./DoctorComponent/Suggested";

import Courses from "./CoursesComponent/Courses";
import EnrolledCourses from "./CoursesComponent/EnrolledCourses";
import OfferCard from "./OfferCard";

import ChatBot from "./ChatBotComponent/ChatBot";

import { AnimatePresence } from "framer-motion";


import "./App.css";
function App() {


   const rem = JSON.parse(localStorage.getItem('REMEMBER_ME'));
   if (rem === "0") {
      console.log("4567890");
      window.onbeforeunload = function () {
         localStorage.clear();
      }
   }

   return (
      <div className="main-app">
         <AnimatePresence >
            <Router>
               <Routes >
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/signup" element={<Registration />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path='/reset-password' element={<ResetPass />} />
                  <Route path="/products/detail" element={<ProductDetails />} />
                  <Route path='/products/detail/checkout' element={<Cart />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/therapy' element={<Therapy />} />
                  <Route path='/therapy/detail' element={<TherapyDetail />} />
                  <Route path='/therapy/org' element={<TherapyOrganizations />} />
                  <Route path='/products' element={<ProductList />} />
                  <Route path='/products/delivery' element={<Order />} />
                  <Route path='/products/orders' element={<Allorderlist />} />
                  <Route path='/disorder' element={<Disorder />} />
                  <Route path='/therapy/booking' element={<BookingTherapy />} />
                  <Route path='/therapy/booked' element={<BookedTherapy />} />
                  <Route path='/HealthProfessionals' element={<DoctorsList />} />
                  <Route path='/doctor/detail' element={<DoctorProfile />} />
                  <Route path='/booking/doc' element={<BookingDoc />} />
                  <Route path='/doctor/booked' element={<BookedList />} />
                  <Route path='/parent-child' element={<ParentChildProfile />} />
                  <Route path='/consultation' element={<Consultation />} />
                  <Route path='/doctor/feedback' element={<SuggestedList />} />
                  <Route path='/chatbot' element={<ChatBot />} />

                  <Route path='/courses' element={<Courses />} />
                  <Route path='/enrolled-courses' element={<EnrolledCourses />} />
               </Routes>
            </Router>
         </AnimatePresence>
      </div >
   );
}

export default App;
