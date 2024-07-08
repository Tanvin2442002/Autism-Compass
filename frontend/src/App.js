import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import ChildReg from "./LogInSignUpComponent/RegChild";
import DoctorReg from "./LogInSignUpComponent/RegDoctor";
import LogIn from "./LogInSignUpComponent/Login";
import ParentReg from "./LogInSignUpComponent/RegParent";
import TeacherReg from "./LogInSignUpComponent/RegTeacher";
import ResetPass from "./LogInSignUpComponent/ResetPass";
import ProductDetails from "./productComponent/productDetails";
import Profile from "./LogInSignUpComponent/Profile";
import Therapy from "./TherapyComponent/Therapy";
import TherapyDetail from "./TherapyComponent/TherapyDetails";
import TherapyOrganizations from "./TherapyComponent/TherapyORG";
import ProductList from "./productComponent/ProductList/productList";
import Disorder from "./ChildComponent/Disorder";


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
               <Route path='/profile' element={<Profile />} />
               <Route path='/therapy' element={<Therapy />} />
               <Route path='/therapy/detail' element={<TherapyDetail />} />
               <Route path='/therapy/org' element={<TherapyOrganizations />} />
               <Route path='/products' element={<ProductList />} />
               <Route path='/disorder' element={<Disorder />} />
            </Routes>
         </Router>
      </div>
   );
}

export default App;
