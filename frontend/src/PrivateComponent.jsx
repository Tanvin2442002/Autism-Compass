import {react} from 'react';
import {Navigate,Outlet} from 'react-router-dom';


const PrivateComponent = () => {
    const userData = JSON.parse(localStorage.getItem("USER"));
    return ( userData ? <Outlet/> : <Navigate to="/login"/>
    );
};

export default PrivateComponent;