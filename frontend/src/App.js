import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
import ChatBot from "./ChatBotComponent/ChatBot";
import { AnimatePresence } from "framer-motion";
import PrivateComponent from "./PrivateComponent";
import "./App.css";

function App() {
   const rem = JSON.parse(localStorage.getItem('REMEMBER_ME'));
   if (rem === "0") {
      window.onbeforeunload = function () {
         localStorage.clear();
      }
   }

   return (
      <div className="main-app">
         <AnimatePresence>
            <Router>
               <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/signup" element={<Registration />} />
                  <Route path="/dashboard" element={<PrivateComponent><Dashboard /></PrivateComponent>} />
                  <Route path='/reset-password' element={<PrivateComponent><ResetPass /></PrivateComponent>} />
                  <Route path="/products/detail" element={<PrivateComponent><ProductDetails /></PrivateComponent>} />
                  <Route path='/products/detail/checkout' element={<PrivateComponent><Cart /></PrivateComponent>} />
                  <Route path='/profile' element={<PrivateComponent><Profile /></PrivateComponent>} />
                  <Route path='/therapy' element={<PrivateComponent><Therapy /></PrivateComponent>} />
                  <Route path='/therapy/detail' element={<PrivateComponent><TherapyDetail /></PrivateComponent>} />
                  <Route path='/therapy/org' element={<PrivateComponent><TherapyOrganizations /></PrivateComponent>} />
                  <Route path='/products' element={<PrivateComponent><ProductList /></PrivateComponent>} />
                  <Route path='/products/delivery' element={<PrivateComponent><Order /></PrivateComponent>} />
                  <Route path='/products/orders' element={<PrivateComponent><Allorderlist /></PrivateComponent>} />
                  <Route path='/disorder' element={<PrivateComponent><Disorder /></PrivateComponent>} />
                  <Route path='/therapy/booking' element={<PrivateComponent><BookingTherapy /></PrivateComponent>} />
                  <Route path='/therapy/booked' element={<PrivateComponent><BookedTherapy /></PrivateComponent>} />
                  <Route path='/HealthProfessionals' element={<PrivateComponent><DoctorsList /></PrivateComponent>} />
                  <Route path='/doctor/detail' element={<PrivateComponent><DoctorProfile /></PrivateComponent>} />
                  <Route path='/booking/doc' element={<PrivateComponent><BookingDoc /></PrivateComponent>} />
                  <Route path='/doctor/booked' element={<PrivateComponent><BookedList /></PrivateComponent>} />
                  <Route path='/parent-child' element={<PrivateComponent><ParentChildProfile /></PrivateComponent>} />
                  <Route path='/consultation' element={<PrivateComponent><Consultation /></PrivateComponent>} />
                  <Route path='/doctor/feedback' element={<PrivateComponent><SuggestedList /></PrivateComponent>} />
                  <Route path='/chatbot' element={<PrivateComponent><ChatBot /></PrivateComponent>} />
               </Routes>
            </Router>
         </AnimatePresence>
      </div>
   );
}

export default App;