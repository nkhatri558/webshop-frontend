import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageProducts from "../pages/admin/ManageProducts";
import ManageOrders from "../pages/admin/ManageOrders";
import ManageInventory from "../pages/admin/ManageInventory";
import {Route, Routes} from "react-router-dom";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminDashboard/>} />
            <Route path="/manage-products" element={<ManageProducts/>} />
            <Route path="/manage-orders" element={<ManageOrders/>} />
            <Route path="/manage-inventory" element={<ManageInventory/>} />
        </Routes>
    );
};

export default AdminRoutes;