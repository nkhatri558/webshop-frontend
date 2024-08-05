// src/routes/CustomerRoutes.js
import React, {useContext, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from '../pages/Products';
import Orders from '../pages/Orders';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import PaymentForm from '../components/PaymentForm';
import Review from '../components/Review';
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageProducts from "../pages/admin/ManageProducts";
import ManageOrders from "../pages/admin/ManageOrders";
import ManageInventory from "../pages/admin/ManageInventory";

const CustomerRoutes = () => {
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    return (
        <Routes>
            <Route path="/" element={<Products cart={cart} setCart={setCart} cartCount={cartCount} setCartCount={setCartCount}/>}/>
            <Route path="//products" element={<Products cart={cart} setCart={setCart} cartCount={cartCount} setCartCount={setCartCount}/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>}/>
            <Route path="/checkout" element={<Checkout cart={cart}/>}/>
            <Route path="/payment" element={<PaymentForm/>}/>
            <Route path="/review" element={<Review cart={cart}/>}/>
            <Route path="/admin/" element={<AdminDashboard/>} />
            <Route path="/admin/manage-products" element={<ManageProducts/>} />
            <Route path="/admin/manage-orders" element={<ManageOrders/>} />
            <Route path="/admin/manage-inventory" element={<ManageInventory/>} />
        </Routes>
    );
};

export default CustomerRoutes;
