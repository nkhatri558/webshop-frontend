import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageProducts from "../pages/admin/ManageProducts";
import ManageOrders from "../pages/admin/ManageOrders";
import ManageInventory from "../pages/admin/ManageInventory";
import {Route, Routes} from "react-router-dom";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/admin/" element={<AdminDashboard/>} />
            <Route path="/admin/manage-products" element={<ManageProducts/>} />
            <Route path="/admin/manage-orders" element={<ManageOrders/>} />
            <Route path="/admin/manage-inventory" element={<ManageInventory/>} />
        </Routes>
    );
};

export default AdminRoutes;