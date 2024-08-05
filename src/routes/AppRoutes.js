import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CustomerRoutes from "./CustomerRoutes";
import AdminRoutes from "./AdminRoutes";
import Navbar from "../components/Navbar";
import AdminNavbar from "../components/AdminNavbar";
import Login from "../pages/Login";

const AppRoutes = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/guest" element={<Navigate to="/customer/" />} />
                <Route path="/customer/*" element={<><Navbar/> <CustomerRoutes cart={cart} addToCart={addToCart}/></>} />
                <Route path="/admin/*" element={<><AdminNavbar/><AdminRoutes/></>} />
            </Routes>
        </Router>

    );
};

export default AppRoutes;
