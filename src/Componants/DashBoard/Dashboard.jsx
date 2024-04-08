import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Login from "./pages/login/Login"
import Navbar from "./maincomponants/navbar/Navbar"
import AdminFooter from "./maincomponants/AdminFooter/AdminFooter";
import Menu from "./maincomponants/menu/Menu";
import "./styles/styles.css";
import User from "./pages/user/User";
import Products from "./pages/products/Products";
import { Route, Routes } from 'react-router-dom'
import Product from "./Product/Product";

export default function DashBoard() {
    return (
        <div className="main">
            <Navbar />
            <div className="admincontainer">
                <div className="menuContainer">
                    <Menu />
                </div>
                <div className="contentContainer">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="homepage" element={<Home />} />
                        <Route path="Users" element={<Users />} />
                        <Route path="Products" element={<Products />} />
                        <Route path="Users/:id" element={<User />} />
                        <Route path="Products/:id" element={<Product />} />
                    </Routes>
                </div>
            </div>
            <AdminFooter />
        </div>
    );
};

