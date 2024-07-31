import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerRoutes from "./CustomerRoutes";
import AdminRoutes from "./AdminRoutes";
import Navbar from "../components/Navbar";
import AdminNavbar from "../components/AdminNavbar";

const AppRoutes = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<><Navbar/> <CustomerRoutes cart={cart} addToCart={addToCart}/></>} />
                <Route path="/admin/*" element={<><AdminNavbar /><AdminRoutes /></>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
