import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Disorder from "./ChildComponent/Disorder";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import LogIn from "./LogInSignUpComponent/Login";
import Profile from "./LogInSignUpComponent/Profile";
import ChildReg from "./LogInSignUpComponent/RegChild";
import DoctorReg from "./LogInSignUpComponent/RegDoctor";
import ParentReg from "./LogInSignUpComponent/RegParent";
import TeacherReg from "./LogInSignUpComponent/RegTeacher";
import ResetPass from "./LogInSignUpComponent/ResetPass";
import Cart from "./productComponent/Cart";
import ProductDetails from "./productComponent/productDetails";
import ProductList from "./productComponent/ProductList/productList";
import BookingTherapy from "./TherapyComponent/BookingTherapy";
import BookedTherapy from "./TherapyComponent/BookedTherapy";
import Therapy from "./TherapyComponent/Therapy";
import TherapyDetail from "./TherapyComponent/TherapyDetails";
import TherapyOrganizations from "./TherapyComponent/TherapyORG";
import ProductCart from "./productComponent/productCart";
import Order from "./productComponent/delivery/order";
import DoctorsList from "./DoctorComponent/DocList";
import DoctorProfile from "./DoctorComponent/DoctorProfile";
import ParentChildProfile from "./LogInSignUpComponent/ParentChildProfile";
import BookingDoc from "./DoctorComponent/BookingDoc";
import BookedList from "./DoctorComponent/BookedList";


function App() {

   return (
      <div className="main-app">
         <Router>
            <Routes>
               <Route path="/" element={<Landing/>} />
               <Route path="/login" element={<LogIn />} />
               <Route path="/signup/parent" element={<ParentReg />} />
               <Route path="/signup/child" element={<ChildReg />} />
               <Route path="/signup/doctor" element={<DoctorReg />} />
               <Route path="/signup/teacher" element={<TeacherReg />} />
               <Route path="/dashboard" element={<Dashboard />} />
               <Route path='/reset-password' element={<ResetPass />} />
               <Route path="/products/detail" element={<ProductDetails />} />
               <Route path='/products/detail/checkout' element={<Cart />} />
               <Route path='/profile' element={<Profile />} />
               <Route path='/therapy' element={<Therapy />} />
               <Route path='/therapy/detail' element={<TherapyDetail />} />
               <Route path='/therapy/org' element={<TherapyOrganizations />} />
               <Route path='/products' element={<ProductList />} />
               <Route path='/Delivery' element={<Order />} />
               <Route path='/disorder' element={<Disorder />} />
               <Route path='/therapy/booking' element={<BookingTherapy />} />
               <Route path='/therapy/booked' element={<BookedTherapy />} />
               <Route path='/HealthProfessionals' element={<DoctorsList />} />
               <Route path='/doctor/detail' element={<DoctorProfile />} />
               <Route path='/booking/doc' element={<BookingDoc />} />
               <Route path='/BookedList' element={<BookedList />} />
               <Route path='/parent-child' element={<ParentChildProfile />} />
            </Routes>
         </Router>
      </div>
   );
}

export default App;
